import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand-logo">
            <div className="brand-logo-icon">S</div>
            <span>SaaSFlow</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/organizations"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Building2 size={19} />
            <span>Organizations</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <ShieldCheck size={19} />
            <span>Admin</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p>{user?.email || "User"}</p>
              <span>Workspace member</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div>
            <p className="topbar-eyebrow">Workspace</p>
            <h2>SaaSFlow Control Center</h2>
          </div>

          <div className="topbar-profile">
            <div className="topbar-avatar">
              {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p>{user?.email || "User"}</p>
              <span>Active session</span>
            </div>
          </div>
        </header>

        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;