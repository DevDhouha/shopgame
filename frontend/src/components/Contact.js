import React, { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "../styles/contact.css";
import { sendContact } from "../api";
const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    from_name:  "",
    from_email: "",
    message:    "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SERVICE_ID:", SERVICE_ID);
  console.log("TEMPLATE_ID:", TEMPLATE_ID);
  console.log("PUBLIC_KEY:", PUBLIC_KEY);
    setLoading(true);

    try {
           await sendContact({
        name:    form.from_name,
        email:   form.from_email,
        message: form.message,
      }); 
     await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          message:    form.message,
          to_email:   "bahlouldhouha86@gmail.com",
        },
        PUBLIC_KEY
      );
      // ── Success Alert ──
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thanks for reaching out. We will get back to you soon.",
        confirmButtonText: "OK",
        confirmButtonColor: "#e63946",
        background: "#1a1a26",
        color: "#f1f1f1",
        iconColor: "#e63946",
      });

      setForm({ from_name: "", from_email: "", message: "" });

    } catch (error) {
      console.error("EmailJS error:", error);

      // ── Error Alert ──
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#e63946",
        background: "#1a1a26",
        color: "#f1f1f1",
        iconColor: "#e63946",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">CONTACT <span>US</span></h2>

      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            placeholder="Your name"
            value={form.from_name}
            onChange={e => setForm({ ...form, from_name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.from_email}
            onChange={e => setForm({ ...form, from_email: e.target.value })}
            required
          />
          <textarea
            rows={5}
            placeholder="Your message..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit" disabled={loading} className="btn--submit"
            onMouseOver={e => e.currentTarget.style.background = "var(--accent2)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--accent)"}
          >
            {loading ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>


      </div>
    </section>
  );
}