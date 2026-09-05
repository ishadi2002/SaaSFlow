import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
      await register(
        formData.name,
        formData.email,
        formData.password
      );

      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors);
        setError(messages.join(" • "));
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to create account. Please try again."
        );
      }
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
                Build your secure workspace
              </span>

              <h1>
                Start managing
                <span> smarter.</span>
              </h1>

              <p>
                Create your SaaSFlow account and manage your organization
                from one secure, modern business workspace.
              </p>
            </div>
          </div>

          <div className="auth-feature-card">
            <div>
              <span className="feature-number">01</span>
              <p>Secure account creation</p>
            </div>

            <div>
              <span className="feature-number">02</span>
              <p>JWT authentication</p>
            </div>

            <div>
              <span className="feature-number">03</span>
              <p>Business management</p>
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <span className="auth-mobile-logo">SaaSFlow</span>

              <h2>Create account</h2>
              <p>Set up your workspace in a few seconds.</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>

                <div className="input-wrapper">
                  <User size={19} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

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
                <label htmlFor="password">Password</label>

                <div className="input-wrapper">
                  <Lock size={19} />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button
                className="primary-auth-button"
                type="submit"
                disabled={loading}
              >
                <span>
                  {loading ? "Creating account..." : "Create account"}
                </span>

                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <div className="auth-bottom-text">
              <span>Already have an account?</span>
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;