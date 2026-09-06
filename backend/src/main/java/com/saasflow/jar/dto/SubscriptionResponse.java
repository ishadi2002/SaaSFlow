package com.saasflow.jar.dto;

import com.saasflow.jar.entity.SubscriptionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SubscriptionResponse {

    private Long id;
    private Long planId;
    private String planName;
    private BigDecimal price;
    private String features;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private SubscriptionStatus status;
}