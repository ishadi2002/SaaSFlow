package com.saasflow.jar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class PlanResponse {

    private Long id;
    private String name;
    private BigDecimal price;
    private String features;
}