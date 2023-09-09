package com.project.examportalbackend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse {
    private String message;

    public ApiResponse(String message) {
        this.message = message;
    }
}
