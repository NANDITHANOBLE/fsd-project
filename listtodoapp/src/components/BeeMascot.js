import React from "react";
import { motion } from "framer-motion";

export default function BeeMascot({ style = {}, size = 80 }) {
  return (
    <svg 
      viewBox="0 0 64 64" 
      width={size} 
      height={size} 
      style={{ 
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        ...style 
      }}
    >
      {/* Bee body */}
      <ellipse cx="32" cy="32" rx="30" ry="18" fill="#ffe066" stroke="#f39c12" strokeWidth="1" />
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="#ffd166" />
      <ellipse cx="32" cy="32" rx="10" ry="6" fill="#fff" />
      
      {/* Bee stripes */}
      <ellipse cx="22" cy="32" rx="2" ry="6" fill="#222" />
      <ellipse cx="42" cy="32" rx="2" ry="6" fill="#222" />
      <ellipse cx="32" cy="32" rx="2" ry="6" fill="#222" />
      
      {/* Wings */}
      <ellipse cx="32" cy="20" rx="8" ry="4" fill="#b2f7ef" opacity="0.7" />
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="#b2f7ef" opacity="0.7" />
      
      {/* Eyes */}
      <circle cx="20" cy="28" r="2" fill="#222" />
      <circle cx="44" cy="28" r="2" fill="#222" />
      
      {/* Stinger */}
      <ellipse cx="32" cy="52" rx="4" ry="2" fill="#222" />
    </svg>
  );
}

export function FlyingBee({ size = 60, style = {} }) {
  return (
    <motion.div
      style={{ position: 'fixed', zIndex: 100, ...style }}
      initial={{ x: -100, y: 60 }}
      animate={{
        x: [ -100, 200, 600, 900, 1200, 1500, 1800, -100 ],
        y: [ 60, 40, 80, 30, 100, 60, 80, 60 ]
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <BeeMascot size={size} />
    </motion.div>
  );
} 