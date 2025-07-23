package com.coursefinder.PSUCourseFinder.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private String courseCode;
    private String text;
}
