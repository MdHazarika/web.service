"use client";

export function ButterflyLarge({ className = "" }: { className?: string }) {
  return (
    <div className={className} style={{ perspective: 420, width: 180, height: 120 }}>
      <div
        style={{
          width: 180,
          height: 120,
          position: "relative",
          filter: "drop-shadow(0 0 24px rgba(13,148,136,0.5))",
          transform: "rotateY(-50deg) rotateX(8deg)",
          transformStyle: "preserve-3d",
          animation: "bf-fly 10s ease-in-out infinite",
        }}
      >
        <style>
          {`
            @keyframes bf-fly {
              0%, 100% { transform: translate(0, 0) rotateY(-50deg) rotateX(8deg); }
              25% { transform: translate(14px, -18px) rotateY(-50deg) rotateX(12deg); }
              50% { transform: translate(-10px, -8px) rotateY(-50deg) rotateX(5deg); }
              75% { transform: translate(8px, -22px) rotateY(-50deg) rotateX(10deg); }
            }
            @keyframes bf-flap-fore {
              0%, 100% { transform: rotateZ(0deg); }
              50% { transform: rotateZ(-28deg); }
            }
            @keyframes bf-flap-hind {
              0%, 100% { transform: rotateZ(0deg); }
              50% { transform: rotateZ(18deg); }
            }
            .bf-fore { transform-origin: 70px 52px; transform-box: fill-box; animation: bf-flap-fore 1.4s ease-in-out infinite; }
            .bf-hind { transform-origin: 70px 58px; transform-box: fill-box; animation: bf-flap-hind 1.4s ease-in-out infinite 0.1s; }
          `}
        </style>

        <svg
          width="180"
          height="120"
          viewBox="0 0 180 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="bf-wing" x1="0" y1="0" x2="180" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="45%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id="bf-body" x1="20" y1="60" x2="140" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#134e4a" />
              <stop offset="50%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#134e4a" />
            </linearGradient>
            <radialGradient id="bf-glow" cx="90" cy="60" r="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="90" cy="60" rx="70" ry="46" fill="url(#bf-glow)" />

          {/* Far wing (slightly behind) */}
          <g opacity="0.45">
            <path
              d="M72 54 C60 18 100 -2 150 12 C170 22 160 50 120 54 C100 56 80 58 72 54Z"
              fill="url(#bf-wing)"
              stroke="#0f766e"
              strokeWidth="1"
            />
            <path
              d="M72 60 C80 90 120 108 150 86 C160 76 140 62 110 60"
              fill="url(#bf-wing)"
              stroke="#0f766e"
              strokeWidth="1"
            />
          </g>

          {/* Body */}
          <rect x="25" y="57" width="120" height="6" rx="3" fill="url(#bf-body)" />
          <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.8">
            <line x1="35" y1="57" x2="35" y2="63" />
            <line x1="45" y1="57" x2="45" y2="63" />
            <line x1="55" y1="57" x2="55" y2="63" />
            <line x1="65" y1="57" x2="65" y2="63" />
            <line x1="75" y1="57" x2="75" y2="63" />
            <line x1="85" y1="57" x2="85" y2="63" />
            <line x1="95" y1="57" x2="95" y2="63" />
            <line x1="105" y1="57" x2="105" y2="63" />
            <line x1="115" y1="57" x2="115" y2="63" />
          </g>

          {/* Head */}
          <circle cx="25" cy="60" r="8" fill="#134e4a" />
          <circle cx="21" cy="57" r="3" fill="#5eead4" />

          {/* Antennae */}
          <path
            d="M22 55 C16 36 10 28 4 22"
            stroke="#134e4a"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M26 52 C24 36 22 28 18 20"
            stroke="#134e4a"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="4" cy="22" r="2" fill="#134e4a" />
          <circle cx="18" cy="20" r="1.5" fill="#134e4a" />

          {/* Forewing (near, upper) */}
          <g className="bf-fore">
            <path
              d="M70 52 C58 8 95 -8 148 8 C172 18 160 54 115 56 C95 57 78 56 70 52Z"
              fill="url(#bf-wing)"
              stroke="#0f766e"
              strokeWidth="1.2"
              opacity="0.95"
            />
            <path
              d="M70 52 C62 22 95 4 140 16 C158 24 148 48 112 52 C95 54 78 52 70 52"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="120" cy="22" r="4" fill="white" opacity="0.85" />
            <circle cx="100" cy="38" r="3" fill="white" opacity="0.7" />
          </g>

          {/* Hindwing (near, lower) */}
          <g className="bf-hind">
            <path
              d="M70 60 C80 95 120 116 155 94 C170 82 150 64 112 62 C95 61 78 62 70 60Z"
              fill="url(#bf-wing)"
              stroke="#0f766e"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <path
              d="M70 60 C80 86 115 102 145 86"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="125" cy="88" r="3" fill="white" opacity="0.7" />
          </g>
        </svg>
      </div>
    </div>
  );
}
