package com.coursefinder.PSUCourseFinder.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseSummaryDto {
    private String courseCode;
    private String title;
    private double avgSentiment;
    private List<String> topKeywords;
    private long reviewCount;
}
