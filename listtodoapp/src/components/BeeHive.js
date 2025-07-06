import React from "react";
export default function BeeHive({ size = 60, style = {} }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style}>
      <ellipse cx="32" cy="54" rx="18" ry="6" fill="#fbc02d" />
      <ellipse cx="32" cy="44" rx="20" ry="10" fill="#ffd54f" />
      <ellipse cx="32" cy="32" rx="22" ry="12" fill="#ffe082" />
      <ellipse cx="32" cy="20" rx="18" ry="10" fill="#fffde7" />
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#fff9c4" />
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="#a1887f" />
    </svg>
  );
} 