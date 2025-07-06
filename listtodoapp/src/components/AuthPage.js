import React, { useState } from "react";
import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import BeeMascot from "./BeeMascot";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";

const GOOGLE_AUTH_URL = "http://localhost:5000/auth/google";

const AuthPage = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", loginData);
    // Add your API call here
  };

  // Handle Sign Up Submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", signupData);
    // Add your API call here
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className={`container-bee${signUpMode ? " sign-up-mode" : ""}`}>
      <div className="forms-container-bee">
        <div className="signin-signup-bee">
          {/* Bee Mascot */}
          <motion.div
            className="bee-mascot-container"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
          >
            <BeeMascot size={100} />
            <h3 className="bee-welcome">Welcome to Taskify! 🐝</h3>
            <p className="bee-subtitle">Your personal productivity companion</p>
          </motion.div>

          {/* --- Sign In Form --- */}
          <motion.form 
            className="sign-in-form-bee" 
            onSubmit={handleLoginSubmit}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="title-bee">Sign in</h2>
            <div className="input-field-bee">
              <FaUser />
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="input-field-bee">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <motion.input 
              type="submit" 
              value="Login" 
              className="btn-bee solid-bee"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <button
              className="link-btn-bee"
              type="button"
              onClick={() => alert("Redirect to password recovery")}
            >
              Forgot Password?
            </button>
            <p className="social-text-bee" style={{ color: "aliceblue" }}>
              Or sign in with Google 🐝
            </p>
            <div className="social-media-bee">
              <motion.a 
                href={GOOGLE_AUTH_URL} 
                className="social-icon-bee" 
                title="Sign in with Google"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGoogle />
              </motion.a>
            </div>
          </motion.form>

          {/* --- Sign Up Form --- */}
          <motion.form 
            className="sign-up-form-bee" 
            onSubmit={handleSignupSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="title-bee">Sign up</h2>
            <div className="input-field-bee">
              <FaUser />
              <input
                type="text"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                required
              />
            </div>
            <div className="input-field-bee">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>
            <div className="input-field-bee">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
            </div>
            <motion.input 
              type="submit" 
              className="btn-bee" 
              value="Sign up"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <p className="social-text-bee" style={{ color: "aliceblue" }}>
              Or sign up with Google 🐝
            </p>
            <div className="social-media-bee">
              <motion.a 
                href={GOOGLE_AUTH_URL} 
                className="social-icon-bee" 
                title="Sign up with Google"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGoogle />
              </motion.a>
            </div>
          </motion.form>
        </div>
      </div>

      {/* --- Panels for switching --- */}
      <div className="panels-container-bee">
        <div className="panel-bee left-panel-bee">
          <div className="content-bee">
            <h3>New here? 🐝</h3>
            <p>Sign up to start organizing your tasks better!</p>
            <motion.button
              className="btn-bee transparent-bee"
              id="sign-up-btn"
              onClick={handleSignUpClick}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up
            </motion.button>
          </div>
          <div className="bee-illustration">
            <BeeMascot size={120} />
          </div>
        </div>
        <div className="panel-bee right-panel-bee">
          <div className="content-bee">
            <h3>One of us? 🐝</h3>
            <p>Log in to access your personalized task manager!</p>
            <motion.button
              className="btn-bee transparent-bee"
              id="sign-in-btn"
              onClick={() => setSignUpMode(false)}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </div>
          <div className="bee-illustration">
            <BeeMascot size={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
