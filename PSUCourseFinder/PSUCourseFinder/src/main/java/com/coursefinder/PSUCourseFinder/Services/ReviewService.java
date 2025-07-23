package com.coursefinder.PSUCourseFinder.Services;

import com.coursefinder.PSUCourseFinder.DTOs.ReviewDto;
import com.coursefinder.PSUCourseFinder.Models.Course;
import com.coursefinder.PSUCourseFinder.Repositories.CourseRepository;
import com.coursefinder.PSUCourseFinder.Repositories.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepo;
    private final CourseRepository courseRepo;
    private final WebClient nlpClient;

    public ReviewService(ReviewRepository reviewRepo,
                         CourseRepository courseRepo,
                         WebClient nlpClient) {
        this.reviewRepo = reviewRepo;
        this.courseRepo = courseRepo;
        this.nlpClient = nlpClient;
    }

    /**
     * Ingests raw reviews, runs NLP, stores them, and updates course aggregates.
     * @param reviews list of { courseCode, text }
     * @return number of reviews ingested
     */
    @Transactional
    public int ingestReviews(List<ReviewDto> reviews) {
        int count = 0;
        for (ReviewDto dto : reviews) {
            // 1) Call NLP microservice
            NlpResponse nlp = nlpClient.post()
                    .uri("/api/nlp/analyze")
                    .bodyValue(Map.of("text", dto.getText()))
                    .retrieve()
                    .bodyToMono(NlpResponse.class)
                    .block();

            // 2) Load or create Course
            Course course = courseRepo.findById(dto.getCourseCode())
                    .orElseGet(() -> {
                        Course c = new Course();
                        c.setCourseCode(dto.getCourseCode());
                        c.setTitle(dto.getCourseCode()); // placeholder until metadata is set
                        c.setAvgSentiment(0.0);
                        c.setReviewCount(0L);
                        c.setTopKeywords(new ArrayList<>());
                        return c;
                    });

            // 3) Persist Review
            Review review = new Review();
            review.setCourse(course);
            review.setText(dto.getText());
            review.setSentiment(nlp.getSentiment());
            review.setKeywords(nlp.getKeywords());
            review.setEmbedding(Vector.of(nlp.getEmbedding()));
            reviewRepo.save(review);

            // 4) Recompute and save course aggregates
            recomputeCourseAggregates(course);
            courseRepo.save(course);

            count++;
        }
        return count;
    }

    private void recomputeCourseAggregates(Course course) {
        List<Review> all = reviewRepo.findByCourse_CourseCode(course.getCourseCode());

        // average sentiment
        double avg = all.stream()
                .mapToDouble(Review::getSentiment)
                .average()
                .orElse(0.0);
        course.setAvgSentiment(avg);

        // review count
        course.setReviewCount((long) all.size());

        // top 5 keywords by frequency
        Map<String, Long> freq = all.stream()
                .flatMap(r -> r.getKeywords().stream())
                .collect(Collectors.groupingBy(k -> k, Collectors.counting()));
        List<String> top5 = freq.entrySet().stream()
                .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
        course.setTopKeywords(top5);
    }
}