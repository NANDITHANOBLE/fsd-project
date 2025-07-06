import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ChooseAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  const handleContinue = () => {
    // You can set a token or mark the user as logged in here if needed
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f7fa"
      }}
    >
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "40px 32px",
        minWidth: "320px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: 24 }}>Choose an account</h2>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f1f3f4",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px"
        }}>
          <span style={{
            background: "#4f8cff",
            color: "#fff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginRight: "16px"
          }}>
            {email ? email[0].toUpperCase() : "?"}
          </span>
          <span style={{ fontSize: "1.1rem" }}>{email}</span>
        </div>
        <button
          style={{
            padding: "12px 32px",
            borderRadius: "24px",
            border: "none",
            background: "#4f8cff",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer"
          }}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default ChooseAccount;