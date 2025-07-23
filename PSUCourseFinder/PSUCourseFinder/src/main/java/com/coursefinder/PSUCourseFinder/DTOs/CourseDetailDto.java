package com.coursefinder.PSUCourseFinder.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDetailDto {
    private String courseCode;
    private String title;
    private String description;       // optional
    private double avgSentiment;
    private List<String> topKeywords;
    private long reviewCount;
    private List<SnippetDto> topSnippets;
}
