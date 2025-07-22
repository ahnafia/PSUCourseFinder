package com.coursefinder.PSUCourseFinder.Repositories;

import com.coursefinder.PSUCourseFinder.Models.Course;
import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Vector;

public interface CourseRepository extends JpaRepository<Course, String> {

    // Spring Data will handle basic CRUD & pagination.
    // You can add:
    Page<Course> findByCourseCodeStartingWith(String dept, Pageable page);

    // If you want keyword filtering:
    @Query("SELECT c FROM Course c JOIN c.topKeywords k WHERE k = :kw")
    Page<Course> findByKeyword(@Param("kw") String keyword, Pageable page);

    // Vector search (via pgvector-starter):
    List<Course> findTopByEmbeddingNearest(Vector queryEmbedding, Pageable page);
}
