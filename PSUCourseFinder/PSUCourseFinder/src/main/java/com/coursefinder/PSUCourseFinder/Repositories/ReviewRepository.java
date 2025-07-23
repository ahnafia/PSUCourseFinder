package com.coursefinder.PSUCourseFinder.Repositories;

import com.coursefinder.PSUCourseFinder.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    /**
     * Fetch all reviews for a given course code.
     */
    List<Review> findByCourse_CourseCode(String courseCode);

    /**
     * Fetch the top 3 reviews for a course ordered by highest sentiment.
     */
    List<Review> findTop3ByCourse_CourseCodeOrderBySentimentDesc(String courseCode);
}