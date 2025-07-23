package com.coursefinder.PSUCourseFinder.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SnippetDto {
    private String text;
    private String keyword;
}
