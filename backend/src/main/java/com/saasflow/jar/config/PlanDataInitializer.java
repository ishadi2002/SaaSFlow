package com.saasflow.jar.config;

import com.saasflow.jar.entity.Plan;
import com.saasflow.jar.repository.PlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PlanDataInitializer implements CommandLineRunner {

    private final PlanRepository planRepository;

    public PlanDataInitializer(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    @Override
    public void run(String... args) {

        createPlanIfNotExists(
                "FREE",
                new BigDecimal("0.00"),
                "Basic workspace access, limited features"
        );

        createPlanIfNotExists(
                "BASIC",
                new BigDecimal("9.99"),
                "Organization management, standard features"
        );

        createPlanIfNotExists(
                "PREMIUM",
                new BigDecimal("19.99"),
                "Full access, premium content, advanced features"
        );
    }

    private void createPlanIfNotExists(
            String name,
            BigDecimal price,
            String features
    ) {
        if (planRepository.findByName(name).isEmpty()) {

            Plan plan = Plan.builder()
                    .name(name)
                    .price(price)
                    .features(features)
                    .build();

            planRepository.save(plan);
        }
    }
}