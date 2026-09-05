import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  LockKeyhole,
  LoaderCircle,
  ServerCog,
} from "lucide-react";

import api from "../api/axios";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/dashboard");

        setAuthorized(true);
        setMessage(
          response.data?.message || "Admin access granted."
        );
      } catch (err) {
        console.error("Admin access error:", err);

        setAuthorized(false);

        if (err.response?.status === 403) {
          setError(
            "You do not have permission to access the admin dashboard."
          );
        } else if (err.response?.status === 401) {
          setError(
            "Your session is invalid or expired. Please log in again."
          );
        } else {
          setError(
            err.response?.data?.message ||
              "Unable to verify admin access."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading-state">
          <LoaderCircle
            className="spin-icon"
            size={30}
          />

          <h3>Verifying admin access</h3>

          <p>
            SaaSFlow is checking your role and permissions.
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="admin-page">
        <div className="admin-access-denied-card">
          <div className="admin-denied-icon">
            <ShieldAlert size={32} />
          </div>

          <span className="admin-eyebrow">
            Restricted area
          </span>

          <h1>Access denied</h1>

          <p>
            {error}
          </p>

          <div className="admin-security-note">
            <LockKeyhole size={18} />

            <span>
              This page is protected by backend role-based
              access control.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <span className="admin-eyebrow">
            Administration
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage and monitor protected SaaSFlow
            administration features.
          </p>
        </div>

        <div className="admin-status-badge">
          <ShieldCheck size={17} />
          Admin verified
        </div>
      </div>

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ShieldCheck size={22} />
          </div>

          <span>Access Level</span>

          <strong>ADMIN</strong>

          <p>
            Full protected administrative access
          </p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <LockKeyhole size={22} />
          </div>

          <span>Security</span>

          <strong>Protected</strong>

          <p>
            Role-based authorization is active
          </p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <ServerCog size={22} />
          </div>

          <span>Backend Status</span>

          <strong>Connected</strong>

          <p>
            Admin API verification succeeded
          </p>
        </div>

      </div>

      <div className="admin-main-panel">

        <div className="admin-panel-header">
          <div>
            <span className="admin-eyebrow">
              Secure endpoint
            </span>

            <h2>Administrator access confirmed</h2>
          </div>

          <ShieldCheck size={24} />
        </div>

        <div className="admin-success-message">
          {message}
        </div>

        <div className="admin-info-grid">

          <div className="admin-info-card">
            <h3>Role verification</h3>

            <p>
              Your JWT token was successfully verified by
              the Spring Boot backend.
            </p>
          </div>

          <div className="admin-info-card">
            <h3>RBAC protection</h3>

            <p>
              The protected endpoint only allows users with
              the ADMIN role.
            </p>
          </div>

          <div className="admin-info-card">
            <h3>Secure workspace</h3>

            <p>
              Unauthorized users receive an access denied
              response from the backend.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;