package com.saasflow.jar.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubscribeRequest {

    @NotNull(message = "Plan ID is required")
    private Long planId;
}