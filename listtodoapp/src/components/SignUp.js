import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import "./SignUp.css";
import BeeMascot, { FlyingBee } from "./BeeMascot";
import { AnimatedFlower } from "./Flower";

const GOOGLE_AUTH_URL = "http://localhost:5000/auth/google";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed.");
      } else {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 50%, #fdcb6e 100%)", overflowX: "hidden" }}>
      {/* Moving bees */}
      <FlyingBee size={54} style={{ top: 60, left: 0 }} />
      <FlyingBee size={40} style={{ top: 180, right: 0, left: 'unset', opacity: 0.8, transform: 'scaleX(-1)' }} direction="rtl" />
      <FlyingBee size={32} style={{ top: 320, left: 0, opacity: 0.7, transform: 'rotate(-20deg)' }} />
      {/* Decorative bee and flowers, matching dashboard */}
      <div style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 1 }}>
        <AnimatedFlower size={48} />
      </div>
      <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1 }}>
        <AnimatedFlower size={54} />
      </div>
      <div style={{ position: 'fixed', right: 40, top: 40, zIndex: 1 }}>
        <AnimatedFlower size={40} />
      </div>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <BeeMascot size={60} />
      </div>
      {/* More flowers for extra playfulness */}
      <div style={{ position: 'fixed', left: 60, top: 80, zIndex: 1 }}>
        <AnimatedFlower size={36} />
      </div>
      <div style={{ position: 'fixed', right: 80, top: 120, zIndex: 1 }}>
        <AnimatedFlower size={32} />
      </div>
      <div style={{ position: 'fixed', left: 120, bottom: 80, zIndex: 1 }}>
        <AnimatedFlower size={28} />
      </div>
      <div style={{ position: 'fixed', right: 120, bottom: 120, zIndex: 1 }}>
        <AnimatedFlower size={38} />
      </div>
      <div className="signup-card" style={{
        background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 50%, #fdcb6e 100%)',
        borderRadius: 24,
        boxShadow: '0 4px 24px #ffd60044',
        border: '2px solid #ffe066',
      }}>
        <h2 className="signup-title" style={{
          fontWeight: 800,
          fontSize: 32,
          background: 'linear-gradient(90deg, #ff9800 10%, #ffd600 50%, #ff6f00 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          letterSpacing: 1.5,
          marginBottom: 24,
        }}>TASKIFY</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="signup-btn" style={{
            background: 'linear-gradient(90deg, #ffd600 0%, #ff9800 100%)',
            color: '#222',
            fontWeight: 700,
            border: 'none',
            borderRadius: 12,
            padding: '0.7rem 2.2rem',
            fontSize: 18,
            boxShadow: '0 2px 8px #ffd60044',
            marginTop: 12,
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.2s',
          }}>
            Sign Up
          </button>
        </form>

        <p className="or-text">Or sign up with</p>

        <div className="social-login">
          <button
            className="google-btn"
            onClick={() => {
              window.location.href = "http://localhost:5000/auth/google";
            }}
          >
            <FaGoogle style={{ marginRight: "8px" }} />
            Sign up with Google
          </button>
        </div>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
