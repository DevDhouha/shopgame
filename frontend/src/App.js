import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
// ── Public pages ──────────────────────────────────
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import About    from "./components/About";
import Games    from "./components/Games";
import Contact  from "./components/Contact";
import Footer from "./components/Footer";
// ── Admin pages ───────────────────────────────────
import Login     from "./pages/admin/Login";
import DashboardPage from "./pages/admin/Dashboard";
import GamesPage      from "./pages/admin/GamesPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import PlatformsPage  from "./pages/admin/PlatformsPage";
import ReviewsPage    from "./pages/admin/ReviewsPage";
import ContactsPage   from "./pages/admin/ContactsPage";
function PublicSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Games />
      <Contact />
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public ── */}
          <Route path="/" element={<PublicSite />} />

          {/* ── Admin Auth ── */}
          <Route path="/admin/login" element={<Login />} />

          {/* ── Admin Protected ── (dashboard coming in Phase C) */}
          <Route
            path="/admin/*"
            element={
             
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              
            }
          />
           <Route path="/admin/games" element={
            <ProtectedRoute><GamesPage /></ProtectedRoute>
          }/>
          <Route path="/admin/categories" element={
            <ProtectedRoute><CategoriesPage /></ProtectedRoute>
          }/>
          <Route path="/admin/platforms" element={
            <ProtectedRoute><PlatformsPage /></ProtectedRoute>
          }/>
          <Route path="/admin/reviews" element={
            <ProtectedRoute><ReviewsPage /></ProtectedRoute>
          }/>
          <Route path="/admin/contacts" element={
            <ProtectedRoute><ContactsPage /></ProtectedRoute>
          }/>
              {/* ── Fallback ── */}
          <Route path="/admin/*" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;