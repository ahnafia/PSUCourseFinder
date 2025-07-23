package com.coursefinder.PSUCourseFinder.Repositories;

import com.coursefinder.PSUCourseFinder.Models.Course;
import com.pgvector.Vector;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, String> {

    /**
     * Find courses whose courseCode starts with the given department prefix.
     */
    Page<Course> findByCourseCodeStartingWith(String dept, Pageable pageable);

    /**
     * Find courses that have the given keyword in their topKeywords list.
     */
    @Query("SELECT c FROM Course c JOIN c.topKeywords k WHERE k = :keyword")
    Page<Course> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    /**
     * Perform a vector similarity search on the embedding column.
     * Requires pgvector-spring-boot-starter.
     */
    List<Course> findTopByEmbeddingNearest(Vector embedding, Pageable pageable);
}