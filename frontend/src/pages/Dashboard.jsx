import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  Activity,
  Server,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import api from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/organizations");

        setOrganizations(response.data);
        setApiConnected(true);
      } catch (err) {
        console.error("Dashboard load error:", err);

        setApiConnected(false);

        setError(
          err.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const organizationCount = organizations.length;

  const latestOrganization =
    organizations.length > 0
      ? organizations[organizations.length - 1]
      : null;

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading-state">
          <LoaderCircle
            className="spin-icon"
            size={30}
          />

          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-hero">
        <div>
          <span className="page-eyebrow">
            Workspace overview
          </span>

          <h1>Welcome to SaaSFlow</h1>

          <p>
            Monitor your workspace, organizations and
            security from one place.
          </p>
        </div>

        <button
          type="button"
          className="dashboard-primary-action"
          onClick={() => navigate("/organizations")}
        >
          Manage organizations

          <ArrowRight size={17} />
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="organizations-error">
          {error}
        </div>
      )}

      {/* STAT CARDS */}
      <div className="dashboard-stats-grid">

        {/* ORGANIZATIONS */}
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Building2 size={21} />
            </div>
          </div>

          <p className="stat-label">
            Organizations
          </p>

          <h3 className="stat-value">
            {organizationCount}
          </h3>
        </div>

        {/* SECURITY */}
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <ShieldCheck size={21} />
            </div>
          </div>

          <p className="stat-label">
            Security Status
          </p>

          <h3 className="stat-value">
            Secure
          </h3>
        </div>

        {/* AUTH */}
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Activity size={21} />
            </div>
          </div>

          <p className="stat-label">
            Authentication
          </p>

          <h3 className="stat-value">
            Active
          </h3>
        </div>

        {/* API */}
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Server size={21} />
            </div>
          </div>

          <p className="stat-label">
            API Status
          </p>

          <h3 className="stat-value">
            {apiConnected ? "Connected" : "Offline"}
          </h3>
        </div>

      </div>

      {/* LOWER SECTION */}
      <div className="dashboard-grid">

        {/* RECENT ACTIVITY */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h3>Recent activity</h3>

              <span>
                Latest workspace information
              </span>
            </div>
          </div>

          <div className="activity-list">

            {latestOrganization ? (
              <div className="activity-item">

                <div className="activity-dot" />

                <div>
                  <p>
                    Organization available:{" "}
                    {latestOrganization.name}
                  </p>

                  <span>
                    {latestOrganization.industry ||
                      "General industry"}
                  </span>
                </div>

              </div>
            ) : (
              <div className="activity-item">

                <div className="activity-dot" />

                <div>
                  <p>
                    No organizations created yet
                  </p>

                  <span>
                    Create your first organization
                    to get started.
                  </span>
                </div>

              </div>
            )}

            <div className="activity-item">

              <div className="activity-dot" />

              <div>
                <p>Authentication active</p>

                <span>
                  JWT protected session is running.
                </span>
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-dot" />

              <div>
                <p>Workspace security enabled</p>

                <span>
                  Role-based access control is active.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h3>Quick actions</h3>

              <span>
                Common workspace tasks
              </span>
            </div>
          </div>

          <div className="quick-actions">

            <div
              className="quick-action-card"
              onClick={() =>
                navigate("/organizations")
              }
            >
              <h4>
                Manage organizations
              </h4>

              <p>
                Create, edit and delete your
                workspace organizations.
              </p>
            </div>

            <div
              className="quick-action-card"
              onClick={() =>
                navigate("/admin")
              }
            >
              <h4>
                Admin dashboard
              </h4>

              <p>
                Verify administrative access and
                RBAC protection.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;