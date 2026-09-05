import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-blur auth-blur-one"></div>
      <div className="auth-background-blur auth-blur-two"></div>

      <div className="auth-shell">
        <section className="auth-brand-panel">
          <div>
            <div className="brand-logo">
              <div className="brand-logo-icon">S</div>
              <span>SaaSFlow</span>
            </div>

            <div className="auth-brand-content">
              <span className="eyebrow">
                <ShieldCheck size={16} />
                Secure business workspace
              </span>

              <h1>
                Run your business
                <span> smarter.</span>
              </h1>

              <p>
                Manage organizations, users and secure workflows from one
                modern platform designed for growing teams.
              </p>
            </div>
          </div>

          <div className="auth-feature-card">
            <div>
              <span className="feature-number">01</span>
              <p>JWT secured authentication</p>
            </div>

            <div>
              <span className="feature-number">02</span>
              <p>Role-based access control</p>
            </div>

            <div>
              <span className="feature-number">03</span>
              <p>Organization management</p>
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <span className="auth-mobile-logo">SaaSFlow</span>

              <h2>Welcome back</h2>
              <p>Sign in to continue to your workspace.</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <div className="input-wrapper">
                  <Mail size={19} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="password">Password</label>
                  <button type="button" className="text-button">
                    Forgot password?
                  </button>
                </div>

                <div className="input-wrapper">
                  <Lock size={19} />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                className="primary-auth-button"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? "Signing in..." : "Sign in"}</span>

                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <div className="auth-bottom-text">
              <span>New to SaaSFlow?</span>
              <Link to="/register">Create an account</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;