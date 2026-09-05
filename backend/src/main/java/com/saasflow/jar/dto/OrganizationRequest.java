package com.saasflow.jar.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrganizationRequest {

    @NotBlank(message = "Organization name is required")
    private String name;

    private String industry;
}