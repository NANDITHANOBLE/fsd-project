import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Flower({ size = 40, style = {} }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} style={style}>
      <circle cx="32" cy="32" r="10" fill="#ffd54f" />
      <ellipse cx="32" cy="16" rx="8" ry="12" fill="#f06292" />
      <ellipse cx="32" cy="48" rx="8" ry="12" fill="#f06292" />
      <ellipse cx="16" cy="32" rx="12" ry="8" fill="#f06292" />
      <ellipse cx="48" cy="32" rx="12" ry="8" fill="#f06292" />
      <ellipse cx="22" cy="22" rx="6" ry="10" fill="#ba68c8" />
      <ellipse cx="42" cy="22" rx="6" ry="10" fill="#ba68c8" />
      <ellipse cx="22" cy="42" rx="6" ry="10" fill="#ba68c8" />
      <ellipse cx="42" cy="42" rx="6" ry="10" fill="#ba68c8" />
    </svg>
  );
}

export function AnimatedFlower({ size = 48, style = {} }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={style}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <circle cx="32" cy="32" r="10" fill="#ffd54f" />
      <motion.ellipse
        cx="32" cy="16"
        animate={{ rx: open ? 12 : 6, ry: open ? 18 : 8 }}
        fill="#f06292"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="32" cy="48"
        animate={{ rx: open ? 12 : 6, ry: open ? 18 : 8 }}
        fill="#f06292"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="16" cy="32"
        animate={{ rx: open ? 18 : 8, ry: open ? 12 : 6 }}
        fill="#f06292"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="48" cy="32"
        animate={{ rx: open ? 18 : 8, ry: open ? 12 : 6 }}
        fill="#f06292"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="22" cy="22"
        animate={{ rx: open ? 10 : 4, ry: open ? 14 : 6 }}
        fill="#ba68c8"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="42" cy="22"
        animate={{ rx: open ? 10 : 4, ry: open ? 14 : 6 }}
        fill="#ba68c8"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="22" cy="42"
        animate={{ rx: open ? 10 : 4, ry: open ? 14 : 6 }}
        fill="#ba68c8"
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <motion.ellipse
        cx="42" cy="42"
        animate={{ rx: open ? 10 : 4, ry: open ? 14 : 6 }}
        fill="#ba68c8"
        transition={{ type: 'spring', stiffness: 120 }}
      />
    </motion.svg>
  );
} 