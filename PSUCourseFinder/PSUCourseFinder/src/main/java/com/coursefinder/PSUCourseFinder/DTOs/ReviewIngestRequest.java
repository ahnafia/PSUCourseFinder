package com.coursefinder.PSUCourseFinder.DTOs;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewIngestRequest {
    private List<ReviewDto> reviews;
}
