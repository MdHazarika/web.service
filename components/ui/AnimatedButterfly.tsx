"use client";

import { motion } from "framer-motion";

export function AnimatedButterfly({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, 24, -18, 12, 0],
        y: [0, -32, -16, -40, 0],
        rotate: [0, 6, -4, 3, 0],
      }}
      transition={{
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 0.8, ease: "easeOut" },
        x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ filter: "drop-shadow(0 0 20px rgba(13,148,136,0.45))" }}
    >
      <svg
        width="88"
        height="88"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <style>
          {`
            @keyframes flap-left {
              0%, 100% { transform: scaleX(1); }
              50% { transform: scaleX(0.15); }
            }
            @keyframes flap-right {
              0%, 100% { transform: scaleX(1); }
              50% { transform: scaleX(0.15); }
            }
            .butterfly-wing {
              transform-origin: 60px 60px;
              transform-box: fill-box;
            }
            .wing-left {
              animation: flap-left 0.7s ease-in-out infinite;
            }
            .wing-right {
              animation: flap-right 0.7s ease-in-out infinite reverse;
            }
          `}
        </style>

        <defs>
          <linearGradient
            id="wingGradient"
            x1="0"
            y1="0"
            x2="120"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="45%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <radialGradient
            id="glow"
            cx="60"
            cy="60"
            r="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="60" r="45" fill="url(#glow)" />

        <g className="butterfly-wing wing-left">
          <path
            d="M60 58 C48 28 18 10 6 26 C-4 38 4 62 30 74 C14 84 12 104 26 112 C44 120 66 92 60 58Z"
            fill="url(#wingGradient)"
            opacity="0.95"
          />
          <path
            d="M58 60 C50 42 30 30 20 40 C12 50 22 64 36 70 C26 78 28 92 38 96 C48 100 60 80 58 60Z"
            fill="#99f6e4"
            opacity="0.35"
          />
        </g>

        <g className="butterfly-wing wing-right">
          <path
            d="M60 58 C72 28 102 10 114 26 C124 38 116 62 90 74 C106 84 108 104 94 112 C76 120 54 92 60 58Z"
            fill="url(#wingGradient)"
            opacity="0.95"
          />
          <path
            d="M62 60 C70 42 90 30 100 40 C108 50 98 64 84 70 C94 78 92 92 82 96 C72 100 60 80 62 60Z"
            fill="#99f6e4"
            opacity="0.35"
          />
        </g>

        <ellipse cx="60" cy="60" rx="4.5" ry="22" fill="#134e4a" />
        <circle cx="60" cy="40" r="5.5" fill="#134e4a" />

        <path
          d="M58 37 C52 26 46 18 40 14"
          stroke="#134e4a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M62 37 C68 26 74 18 80 14"
          stroke="#134e4a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
