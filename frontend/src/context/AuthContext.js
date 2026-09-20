
import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe, loginAdmin, logoutAdmin } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin]     = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Check token on app start ──────────────────────
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      getMe()
        .then(res => setAdmin(res.data.admin))
        .catch(() => localStorage.removeItem("adminToken"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ── Login ─────────────────────────────────────────
  const login = async (username, password) => {
    const res = await loginAdmin({ username, password });
    localStorage.setItem("adminToken", res.data.token);
    setAdmin(res.data.admin);
    return res.data;
  };

  // ── Logout ────────────────────────────────────────
  const logout = async () => {
    await logoutAdmin();
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
