package com.coursefinder.PSUCourseFinder.Services;

import com.coursefinder.PSUCourseFinder.DTOs.CourseDetailDto;
import com.coursefinder.PSUCourseFinder.DTOs.CourseSummaryDto;
import com.coursefinder.PSUCourseFinder.DTOs.SnippetDto;
import com.coursefinder.PSUCourseFinder.Models.Course;
import com.coursefinder.PSUCourseFinder.Models.Review;
import com.coursefinder.PSUCourseFinder.Repositories.CourseRepository;
import com.coursefinder.PSUCourseFinder.Repositories.ReviewRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private final CourseRepository courseRepo;
    private final ReviewRepository reviewRepo;

    public CourseService(CourseRepository courseRepo,
                         ReviewRepository reviewRepo) {
        this.courseRepo = courseRepo;
        this.reviewRepo = reviewRepo;
    }

    public List<CourseSummaryDto> listCourses(String dept, Double minSentiment, String keyword, int limit, int offset) {
        Pageable page = PageRequest.of(offset / limit, limit);
        Page<Course> p = (dept != null)
                ? courseRepo.findByCourseCodeStartingWith(dept, page)
                : (keyword != null)
                ? courseRepo.findByKeyword(keyword, page)
                : courseRepo.findAll(page);

        return p.stream()
                .filter(c -> minSentiment == null || c.getAvgSentiment() >= minSentiment)
                .map(c -> new CourseSummaryDto(
                        c.getCourseCode(),
                        c.getTitle(),
                        c.getAvgSentiment(),
                        c.getTopKeywords(),
                        c.getReviewCount()))
                .collect(Collectors.toList());
    }

    public CourseDetailDto getCourseDetail(String courseCode) {
        Course c = courseRepo.findById(courseCode)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Review> top = reviewRepo
                .findTop3ByCourse_CourseCodeOrderBySentimentDesc(courseCode);

        List<SnippetDto> snippets = top.stream()
                .map(r -> new SnippetDto(r.getText(),
                        r.getKeywords().isEmpty() ? "" : r.getKeywords().get(0)))
                .collect(Collectors.toList());

        return new CourseDetailDto(
                c.getCourseCode(),
                c.getTitle(),
                c.getDescription(),
                c.getAvgSentiment(),
                c.getTopKeywords(),
                c.getReviewCount(),
                snippets
        );
    }
}
