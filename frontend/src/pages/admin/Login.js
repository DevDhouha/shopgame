
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin/login.css";

export default function Login() {
  const { login, admin } = useAuth();
  const navigate         = useNavigate();

  const [form, setForm]     = useState({ username: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in → redirect
  React.useEffect(() => {
    if (admin) navigate("/admin/dashboard");
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.username, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__grid" />

      <div className="login-page__box">
        <div className="login-page__logo">
          <img src="/images/logo.png" alt="ShopGame Logo" width={200} height={100} />
        </div>
    
        {error && (
          <div className="login-page__error">{error}</div>
        )}

        <form className="login-page__form" onSubmit={handleSubmit}>
          <div className="login-page__field">
            <label className="login-page__label">Username</label>
            <input
              className="login-page__input"
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="login-page__field">
            <label className="login-page__label">Password</label>
            <input
              className="login-page__input"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="login-page__btn"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        <a href="/" className="login-page__back">
          ← Back to ShopGame
        </a>
      </div>
    </div>
  );
}
