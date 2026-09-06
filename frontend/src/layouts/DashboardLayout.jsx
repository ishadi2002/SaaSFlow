import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  CreditCard,
  LogOut,
} from "lucide-react";

import "../styles/dashboard-layout.css";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const email =
    localStorage.getItem("email") ||
    "SaaSFlow User";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            S
          </div>

          <span>SaaSFlow</span>
        </div>

        <nav className="sidebar-navigation">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/organizations"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <Building2 size={20} />
            <span>Organizations</span>
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <CreditCard size={20} />
            <span>Subscriptions</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <ShieldCheck size={20} />
            <span>Admin</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {email
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <div className="sidebar-user-email">
                {email}
              </div>

              <div className="sidebar-user-status">
                Workspace member
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={logout}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <div className="topbar-eyebrow">
              WORKSPACE
            </div>

            <div className="topbar-title">
              SaaSFlow Control Center
            </div>
          </div>

          <div className="topbar-user">
            <div className="topbar-avatar">
              {email
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <div className="topbar-email">
                {email}
              </div>

              <div className="topbar-status">
                Active session
              </div>
            </div>
          </div>
        </header>

        <section className="dashboard-content">
          {children}
        </section>
      </main>
    </div>
  );
}