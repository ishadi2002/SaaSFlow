package com.saasflow.jar.controller;

import com.saasflow.jar.dto.PlanResponse;
import com.saasflow.jar.dto.SubscribeRequest;
import com.saasflow.jar.dto.SubscriptionResponse;
import com.saasflow.jar.service.SubscriptionService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(
            SubscriptionService subscriptionService
    ) {
        this.subscriptionService = subscriptionService;
    }

    // View all available plans
    @GetMapping("/plans")
    public ResponseEntity<List<PlanResponse>> getPlans() {
        return ResponseEntity.ok(
                subscriptionService.getPlans()
        );
    }

    // Subscribe to a plan
    @PostMapping("/subscribe")
    public ResponseEntity<SubscriptionResponse> subscribe(
            @Valid @RequestBody SubscribeRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                subscriptionService.subscribe(
                        authentication.getName(),
                        request
                )
        );
    }

    // View current subscription
    @GetMapping("/subscription")
    public ResponseEntity<SubscriptionResponse> currentSubscription(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                subscriptionService.getCurrentSubscription(
                        authentication.getName()
                )
        );
    }

    // Upgrade or downgrade plan
    @PutMapping("/upgrade-plan")
    public ResponseEntity<SubscriptionResponse> changePlan(
            @Valid @RequestBody SubscribeRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                subscriptionService.changePlan(
                        authentication.getName(),
                        request
                )
        );
    }

    // Cancel current subscription
    @PostMapping("/cancel-subscription")
    public ResponseEntity<Map<String, String>> cancelSubscription(
            Authentication authentication
    ) {
        subscriptionService.cancelSubscription(
                authentication.getName()
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Subscription cancelled successfully"
                )
        );
    }

    // Premium-only protected API
    @GetMapping("/premium-content")
    public ResponseEntity<?> premiumContent(
            Authentication authentication
    ) {
        boolean allowed =
                subscriptionService.hasPremiumAccess(
                        authentication.getName()
                );

        if (!allowed) {
            return ResponseEntity
                    .status(403)
                    .body(
                            Map.of(
                                    "message",
                                    "Premium subscription required"
                            )
                    );
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Welcome to SaaSFlow Premium!",
                        "access",
                        "PREMIUM"
                )
        );
    }
}