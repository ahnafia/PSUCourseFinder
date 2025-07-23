package com.coursefinder.PSUCourseFinder.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRequest {
    private String needs;
    private Integer limit;           // optional; if null, service can apply a default
}
