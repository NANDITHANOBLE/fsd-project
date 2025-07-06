import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import BeeMascot, { FlyingBee } from "./BeeMascot";
import { AnimatedFlower } from "./Flower";

const GOOGLE_AUTH_URL = "http://localhost:5000/auth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed.");
      } else {
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
      <motion.div
        className="login-box"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        style={{
          background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 50%, #fdcb6e 100%)',
          borderRadius: 24,
          boxShadow: '0 4px 24px #ffd60044',
          border: '2px solid #ffe066',
        }}
      >
        <h1 className="taskify-logo" style={{
          fontWeight: 800,
          fontSize: 36,
          background: 'linear-gradient(90deg, #ff9800 10%, #ffd600 50%, #ff6f00 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          letterSpacing: 1.5,
          marginBottom: 24,
        }}>TASKIFY</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="login-btn"
            style={{
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
            }}
          >
            Login
          </motion.button>
        </form>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

        <div className="or-divider">
          <span>or</span>
        </div>

        <div className="social-login" style={{ marginTop: '16px' }}>
          <button
            className="google-btn"
            onClick={() => { window.location.href = GOOGLE_AUTH_URL; }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              color: '#444',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px 20px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <FaGoogle size={18} style={{ marginRight: "8px" }} />
            Login with Google
          </button>
        </div>

        <p className="login-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
