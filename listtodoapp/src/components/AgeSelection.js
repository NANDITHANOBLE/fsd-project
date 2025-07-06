import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BeeMascot, { FlyingBee } from "./BeeMascot";
import { AnimatedFlower } from "./Flower";

export default function AgeSelection() {
  const [age, setAge] = useState(18);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!age || age < 5 || age > 120) {
      setError("Please enter a valid age (5-120)");
      return;
    }
    localStorage.setItem("userAge", age);
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", width: "100vw", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 50%, #fdcb6e 100%)", overflowX: "hidden" }}>
      {/* Moving bees */}
      <FlyingBee size={54} style={{ top: 60, left: 0 }} />
      <FlyingBee size={40} style={{ top: 180, right: 0, left: 'unset', opacity: 0.8, transform: 'scaleX(-1)' }} direction="rtl" />
      <FlyingBee size={32} style={{ top: 320, left: 0, opacity: 0.7, transform: 'rotate(-20deg)' }} />
      <FlyingBee size={36} style={{ bottom: 40, left: 200, opacity: 0.85, transform: 'rotate(15deg)' }} />
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
      <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 24, boxShadow: "0 4px 24px #ffd60044", padding: "2.5rem 2rem", minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{
          marginBottom: 16,
          fontWeight: 800,
          fontSize: 32,
          background: 'linear-gradient(90deg, #ff9800 10%, #ffd600 50%, #ff6f00 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'bounceBee 1.8s infinite',
          textAlign: 'center',
          letterSpacing: 1.5,
        }}>🐝 Select Your Age</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <input
            type="number"
            min={5}
            max={120}
            value={age}
            onChange={e => setAge(Number(e.target.value))}
            style={{
              fontSize: 32,
              padding: '0.7rem 1.2rem',
              borderRadius: 16,
              border: '2.5px solid #ffd600',
              textAlign: 'center',
              width: 120,
              marginBottom: 8,
              fontWeight: 700,
              color: '#d84315',
              boxShadow: '0 2px 12px #ffd60055',
              transition: 'transform 0.18s, box-shadow 0.18s',
              outline: 'none',
            }}
            onFocus={e => e.target.style.transform = 'scale(1.12)'}
            onBlur={e => e.target.style.transform = 'scale(1)'}
          />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #ffd600 0%, #ff9800 100%)', color: '#222', border: 'none', borderRadius: 12, padding: '0.7rem 2.2rem', fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px #ffd60044' }}>
            Continue
          </button>
        </form>
        {error && <div style={{ color: '#e74c3c', marginTop: 10 }}>{error}</div>}
      </div>
      <style>{`
        @keyframes bounceBee {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-8px) scale(1.05); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-4px) scale(1.03); }
          80% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 