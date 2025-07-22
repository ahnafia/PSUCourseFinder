package com.coursefinder.PSUCourseFinder.Repositories;

import com.coursefinder.PSUCourseFinder.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    // Fetch all reviews for a course (if you ever need it):
    List<Review> findByCourse_CourseCode(String courseCode);
}
