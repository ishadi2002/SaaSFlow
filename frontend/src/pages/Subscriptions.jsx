import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/subscriptions.css";

export default function Subscriptions() {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const plansResponse = await api.get("/plans");
      setPlans(plansResponse.data);

      try {
        const subscriptionResponse = await api.get("/subscription");
        setCurrentSubscription(subscriptionResponse.data);
      } catch (err) {
        setCurrentSubscription(null);
      }
    } catch (err) {
      setError("Unable to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const subscribeToPlan = async (planId) => {
    setMessage("");
    setError("");

    try {
      const response = await api.post("/subscribe", {
        planId,
      });

      setCurrentSubscription(response.data);
      setMessage("Subscription activated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to subscribe to this plan."
      );
    }
  };

  const changePlan = async (planId) => {
    setMessage("");
    setError("");

    try {
      const response = await api.put("/upgrade-plan", {
        planId,
      });

      setCurrentSubscription(response.data);
      setMessage("Subscription plan updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to change subscription plan."
      );
    }
  };

  const cancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      await api.post("/cancel-subscription");

      setCurrentSubscription(null);
      setMessage("Subscription cancelled successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to cancel subscription."
      );
    }
  };

  const accessPremiumContent = async () => {
    setMessage("");
    setError("");

    try {
      const response = await api.get("/premium-content");

      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Premium access required."
      );
    }
  };

  if (loading) {
    return (
      <div className="subscription-page">
        <div className="subscription-loading">
          Loading subscription plans...
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      <div className="subscription-header">
        <div>
          <p className="subscription-eyebrow">
            SUBSCRIPTION MANAGEMENT
          </p>

          <h1>Choose your plan</h1>

          <p className="subscription-subtitle">
            Select the SaaSFlow plan that best fits your workspace.
          </p>
        </div>
      </div>

      {message && (
        <div className="subscription-message success">
          {message}
        </div>
      )}

      {error && (
        <div className="subscription-message error">
          {error}
        </div>
      )}

      {currentSubscription && (
        <div className="current-plan-card">
          <div>
            <span className="current-plan-label">
              CURRENT PLAN
            </span>

            <h2>{currentSubscription.planName}</h2>

            <p>
              Your subscription is currently{" "}
              <strong>{currentSubscription.status}</strong>.
            </p>
          </div>

          <div className="current-plan-actions">
            {currentSubscription.planName === "PREMIUM" && (
              <button
                className="premium-access-button"
                onClick={accessPremiumContent}
              >
                Open Premium Content
              </button>
            )}

            <button
              className="cancel-subscription-button"
              onClick={cancelSubscription}
            >
              Cancel subscription
            </button>
          </div>
        </div>
      )}

      <div className="plans-grid">
        {plans.map((plan) => {
          const isCurrent =
            currentSubscription?.planId === plan.id;

          const isPremium =
            plan.name === "PREMIUM";

          return (
            <div
              className={`plan-card ${
                isPremium ? "premium-plan" : ""
              }`}
              key={plan.id}
            >
              {isPremium && (
                <div className="popular-badge">
                  MOST POPULAR
                </div>
              )}

              <div className="plan-name">
                {plan.name}
              </div>

              <div className="plan-price">
                <span>$</span>
                {Number(plan.price).toFixed(2)}
              </div>

              <div className="plan-period">
                per month
              </div>

              <p className="plan-features">
                {plan.features}
              </p>

              {isCurrent ? (
                <button
                  className="plan-button current"
                  disabled
                >
                  Current plan
                </button>
              ) : currentSubscription ? (
                <button
                  className="plan-button"
                  onClick={() =>
                    changePlan(plan.id)
                  }
                >
                  Switch to {plan.name}
                </button>
              ) : (
                <button
                  className="plan-button"
                  onClick={() =>
                    subscribeToPlan(plan.id)
                  }
                >
                  Choose {plan.name}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="subscription-info">
        <h3>Plan-based access control</h3>

        <p>
          Free and Basic users have standard workspace access.
          Premium users can access protected premium-only content.
        </p>
      </div>
    </div>
  );
}