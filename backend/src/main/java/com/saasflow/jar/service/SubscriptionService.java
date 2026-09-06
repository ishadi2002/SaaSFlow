package com.saasflow.jar.service;

import com.saasflow.jar.dto.PlanResponse;
import com.saasflow.jar.dto.SubscribeRequest;
import com.saasflow.jar.dto.SubscriptionResponse;
import com.saasflow.jar.entity.Plan;
import com.saasflow.jar.entity.Subscription;
import com.saasflow.jar.entity.SubscriptionStatus;
import com.saasflow.jar.entity.User;
import com.saasflow.jar.repository.PlanRepository;
import com.saasflow.jar.repository.SubscriptionRepository;
import com.saasflow.jar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubscriptionService {

    private final PlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionService(
            PlanRepository planRepository,
            SubscriptionRepository subscriptionRepository,
            UserRepository userRepository
    ) {
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    public List<PlanResponse> getPlans() {
        return planRepository.findAll()
                .stream()
                .map(plan -> new PlanResponse(
                        plan.getId(),
                        plan.getName(),
                        plan.getPrice(),
                        plan.getFeatures()
                ))
                .toList();
    }

    public SubscriptionResponse subscribe(
            String email,
            SubscribeRequest request
    ) {
        User user = getUser(email);

        Plan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() ->
                        new RuntimeException("Plan not found")
                );

        subscriptionRepository
                .findFirstByUserIdAndStatusOrderByStartDateDesc(
                        user.getId(),
                        SubscriptionStatus.ACTIVE
                )
                .ifPresent(existing -> {
                    existing.setStatus(SubscriptionStatus.CANCELLED);
                    existing.setEndDate(LocalDateTime.now());
                    subscriptionRepository.save(existing);
                });

        Subscription subscription = Subscription.builder()
                .userId(user.getId())
                .planId(plan.getId())
                .startDate(LocalDateTime.now())
                .status(SubscriptionStatus.ACTIVE)
                .build();

        subscriptionRepository.save(subscription);

        return toResponse(subscription, plan);
    }

    public SubscriptionResponse getCurrentSubscription(String email) {
        User user = getUser(email);

        Subscription subscription = subscriptionRepository
                .findFirstByUserIdAndStatusOrderByStartDateDesc(
                        user.getId(),
                        SubscriptionStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new RuntimeException("No active subscription found")
                );

        Plan plan = planRepository.findById(subscription.getPlanId())
                .orElseThrow(() ->
                        new RuntimeException("Plan not found")
                );

        return toResponse(subscription, plan);
    }

    public SubscriptionResponse changePlan(
            String email,
            SubscribeRequest request
    ) {
        return subscribe(email, request);
    }

    public void cancelSubscription(String email) {
        User user = getUser(email);

        Subscription subscription = subscriptionRepository
                .findFirstByUserIdAndStatusOrderByStartDateDesc(
                        user.getId(),
                        SubscriptionStatus.ACTIVE
                )
                .orElseThrow(() ->
                        new RuntimeException("No active subscription found")
                );

        subscription.setStatus(SubscriptionStatus.CANCELLED);
        subscription.setEndDate(LocalDateTime.now());

        subscriptionRepository.save(subscription);
    }

    public boolean hasPremiumAccess(String email) {
        User user = getUser(email);

        return subscriptionRepository
                .findFirstByUserIdAndStatusOrderByStartDateDesc(
                        user.getId(),
                        SubscriptionStatus.ACTIVE
                )
                .map(subscription ->
                        planRepository.findById(subscription.getPlanId())
                                .map(plan ->
                                        plan.getName()
                                                .equalsIgnoreCase("PREMIUM")
                                )
                                .orElse(false)
                )
                .orElse(false);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    private SubscriptionResponse toResponse(
            Subscription subscription,
            Plan plan
    ) {
        return new SubscriptionResponse(
                subscription.getId(),
                plan.getId(),
                plan.getName(),
                plan.getPrice(),
                plan.getFeatures(),
                subscription.getStartDate(),
                subscription.getEndDate(),
                subscription.getStatus()
        );
    }
}