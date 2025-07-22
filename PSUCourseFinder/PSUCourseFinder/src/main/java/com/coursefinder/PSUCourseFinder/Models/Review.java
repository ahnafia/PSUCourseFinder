package com.coursefinder.PSUCourseFinder.Models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Vector;


@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_code", nullable = false)
    private Course course;

    @Column(columnDefinition = "text", nullable = false)
    private String text;                  // raw review text

    @Column(nullable = false)
    private double sentiment;             // [0.0–1.0]

    @ElementCollection
    @CollectionTable(
            name = "review_keywords",
            joinColumns = @JoinColumn(name = "review_id")
    )

    @Column(name = "keyword")
    private List<String> keywords;        // extracted keywords

    @Column(name = "embedding", columnDefinition = "vector")
    private Vector embedding;             // sentence‑transformer embedding

    public Review(Long id, Course course, String text, double sentiment, List<String> keywords, Vector embedding) {
        this.id = id;
        this.course = course;
        this.text = text;
        this.sentiment = sentiment;
        this.keywords = keywords;
        this.embedding = embedding;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public double getSentiment() {
        return sentiment;
    }

    public void setSentiment(double sentiment) {
        this.sentiment = sentiment;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public Vector getEmbedding() {
        return embedding;
    }

    public void setEmbedding(Vector embedding) {
        this.embedding = embedding;
    }
}
