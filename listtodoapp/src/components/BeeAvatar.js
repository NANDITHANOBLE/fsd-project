import React from "react";

export function getBeeRole(age) {
  if (age <= 10) return { 
    role: "Baby Bee", 
    emoji: "🐝", 
    greeting: "Welcome, Baby Bee! Ready to learn?",
    color: "#ffb3d9"
  };
  if (age <= 17) return { 
    role: "Young Worker Bee", 
    emoji: "🧢🐝", 
    greeting: "Ready to learn, Young Worker Bee?",
    color: "#b3d9ff"
  };
  if (age <= 25) return { 
    role: "Builder Bee", 
    emoji: "🐝", 
    greeting: "Let's build something amazing, Builder Bee!",
    color: "#ffd699"
  };
  if (age <= 40) return { 
    role: "Forager Bee", 
    emoji: "🌻🐝", 
    greeting: "Time to explore and gather, Forager Bee!",
    color: "#b3ffb3"
  };
  return { 
    role: "Queen Bee", 
    emoji: "👑🐝", 
    greeting: "Lead the way, Queen Bee!",
    color: "#ffb3ff"
  };
}

export default function BeeAvatar({ age = 20, size = 36 }) {
  const { emoji, role, color } = getBeeRole(age);
  return (
    <span 
      title={role} 
      style={{ 
        fontSize: size, 
        marginRight: 8,
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
      }}
    >
      {emoji}
    </span>
  );
} 