package com.coursefinder.PSUCourseFinder.Controllers;
import com.coursefinder.PSUCourseFinder.DTOs.*;
import com.coursefinder.PSUCourseFinder.Services.CourseService;
import com.coursefinder.PSUCourseFinder.Services.RecommendationService;
import com.coursefinder.PSUCourseFinder.Services.ReviewService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final ReviewService reviewService;
    private final CourseService courseService;
    private final RecommendationService recommendationService;

    @Autowired
    public CourseController(ReviewService reviewService,
                            CourseService courseService,
                            RecommendationService recommendationService) {
        this.reviewService = reviewService;
        this.courseService = courseService;
        this.recommendationService = recommendationService;
    }

    /**
     * Ingest raw reviews, run NLP, store results & update course aggregates.
     */
    @PostMapping("/reviews")
    public ResponseEntity<Map<String, Integer>> ingestReviews(@RequestBody ReviewIngestRequest request) {
        int ingested = reviewService.ingestReviews(request.getReviews());
        return ResponseEntity.ok(Collections.singletonMap("ingested", ingested));
    }

    /**
     * List courses with aggregated sentiment, keywords, & review count.
     */
    @GetMapping("/courses")
    public ResponseEntity<List<CourseSummaryDto>> listCourses(
            @RequestParam(required = false) String dept,
            @RequestParam(required = false) Double minSentiment,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int offset) {

        List<CourseSummaryDto> courses = courseService.listCourses(dept, minSentiment, keyword, limit, offset);
        return ResponseEntity.ok(courses);
    }

    /**
     * Get detailed info for a single course, including top review snippets.
     */
    @GetMapping("/courses/{courseCode}")
    public ResponseEntity<CourseDetailDto> getCourseDetail(@PathVariable String courseCode) {
        CourseDetailDto detail = courseService.getCourseDetail(courseCode);
        return ResponseEntity.ok(detail);
    }

    /**
     * Recommend courses based on a free‑text "needs" description.
     */
    @PostMapping("/recommendations")
    public ResponseEntity<List<RecommendationDto>> recommendCourses(@RequestBody RecommendationRequest request) {
        List<RecommendationDto> recs = recommendationService.recommend(request.getNeeds(), request.getLimit());
        return ResponseEntity.ok(recs);
    }
}
