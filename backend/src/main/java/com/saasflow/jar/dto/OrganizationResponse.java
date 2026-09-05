package com.saasflow.jar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class OrganizationResponse {

    private Long id;
    private String name;
    private String industry;
    private Long ownerId;
    private LocalDateTime createdAt;
}