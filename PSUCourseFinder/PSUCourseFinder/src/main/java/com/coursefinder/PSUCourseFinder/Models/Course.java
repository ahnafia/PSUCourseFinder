package com.coursefinder.PSUCourseFinder.Models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Vector;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @Column(name = "course_code", nullable = false, length = 16)
    private String courseCode;            // e.g. “CMPSC121”

    @Column(nullable = false)
    private String title;                 // e.g. “Intro to Programming”

    @Column(columnDefinition = "text")
    private String description;           // optional course blurb

    @Column(name = "avg_sentiment", nullable = false)
    private double avgSentiment;          // [0.0–1.0]

    @Column(name = "review_count", nullable = false)
    private long reviewCount;             // total ingested reviews

    @ElementCollection
    @CollectionTable(
            name = "course_keywords",
            joinColumns = @JoinColumn(name = "course_code")
    )
    @Column(name = "keyword")
    private List<String> topKeywords;     // e.g. ["labs","projects","instructor"]

    // pgvector column for your sentence‑transformer embedding
    @Column(name = "embedding", columnDefinition = "vector")
    private Vector embedding;

    public Course(String courseCode, String title, String description, double avgSentiment, long reviewCount, List<String> topKeywords, Vector embedding) {
        this.courseCode = courseCode;
        this.title = title;
        this.description = description;
        this.avgSentiment = avgSentiment;
        this.reviewCount = reviewCount;
        this.topKeywords = topKeywords;
        this.embedding = embedding;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAvgSentiment() {
        return avgSentiment;
    }

    public void setAvgSentiment(double avgSentiment) {
        this.avgSentiment = avgSentiment;
    }

    public long getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public List<String> getTopKeywords() {
        return topKeywords;
    }

    public void setTopKeywords(List<String> topKeywords) {
        this.topKeywords = topKeywords;
    }

    public Vector getEmbedding() {
        return embedding;
    }

    public void setEmbedding(Vector embedding) {
        this.embedding = embedding;
    }
}

