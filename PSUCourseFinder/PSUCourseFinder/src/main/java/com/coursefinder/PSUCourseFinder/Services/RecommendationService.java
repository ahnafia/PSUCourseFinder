package com.coursefinder.PSUCourseFinder.Services;

import com.coursefinder.PSUCourseFinder.DTOs.RecommendationDto;
import com.coursefinder.PSUCourseFinder.Repositories.CourseRepository;
import com.coursefinder.PSUCourseFinder.Repositories.ReviewRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    private final CourseRepository courseRepo;
    private final ReviewRepository reviewRepo;
    private final WebClient nlpClient; // points at Flask NLP service

    public RecommendationService(CourseRepository courseRepo,
                                 ReviewRepository reviewRepo,
                                 WebClient nlpClient) {
        this.courseRepo = courseRepo;
        this.reviewRepo = reviewRepo;
        this.nlpClient = nlpClient;
    }

    public List<RecommendationDto> recommend(String needs, Integer limit) {
        int size = (limit != null ? limit : 5);

        // 1) call external NLP service
        NlpResponse nlp = nlpClient.post()
                .uri("/analyze")
                .bodyValue(Map.of("text", needs))
                .retrieve()
                .bodyToMono(NlpResponse.class)
                .block();

        Vector queryVec = Vector.of(nlp.getEmbedding());
        Pageable page = PageRequest.of(0, size);

        // 2) vector-search top courses
        List<Course> found = courseRepo.findTopByEmbeddingNearest(queryVec, page);

        // 3) build RecommendationDto list
        return found.stream().map(c -> {
            double dist = c.getEmbedding().cosineDistance(queryVec);
            double score = 1.0 - dist;

            List<Review> topReviews = reviewRepo
                    .findTop3ByCourse_CourseCodeOrderBySentimentDesc(c.getCourseCode());
            List<SnippetDto> highlights = topReviews.stream()
                    .limit(2)
                    .map(r -> new SnippetDto(
                            r.getText(),
                            r.getKeywords().isEmpty() ? "" : r.getKeywords().get(0)))
                    .collect(Collectors.toList());

            return new RecommendationDto(
                    c.getCourseCode(),
                    c.getTitle(),
                    score,
                    highlights
            );
        }).collect(Collectors.toList());
    }
}