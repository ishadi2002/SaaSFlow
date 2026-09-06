package com.saasflow.jar.repository;

import com.saasflow.jar.entity.Subscription;
import com.saasflow.jar.entity.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findFirstByUserIdAndStatusOrderByStartDateDesc(
            Long userId,
            SubscriptionStatus status
    );
}