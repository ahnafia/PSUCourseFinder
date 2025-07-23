package com.coursefinder.PSUCourseFinder.DTOs;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationDto {
    private String courseCode;
    private String title;
    private double matchScore;
    private List<SnippetDto> highlights;
}
