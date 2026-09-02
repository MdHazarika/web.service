"use client";

export function Damselfly({ className = "" }: { className?: string }) {
  return (
    <div className={className} style={{ perspective: 380, width: 140, height: 90 }}>
      <div
        style={{
          width: 140,
          height: 90,
          position: "relative",
          filter: "drop-shadow(0 0 18px rgba(13,148,136,0.45))",
          transform: "rotateY(-55deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
          animation: "ds-fly 4.5s ease-in-out infinite",
        }}
      >
        <style>
          {`
            @keyframes ds-fly {
              0%, 100% { transform: translate(0, 0) rotateY(-55deg) rotateX(2deg); }
              25% { transform: translate(8px, -12px) rotateY(-55deg) rotateX(4deg); }
              50% { transform: translate(-6px, -5px) rotateY(-55deg) rotateX(0deg); }
              75% { transform: translate(5px, -14px) rotateY(-55deg) rotateX(3deg); }
            }
            @keyframes ds-flap-top {
              0% { transform: rotateZ(0deg); }
              50% { transform: rotateZ(-35deg); }
              100% { transform: rotateZ(0deg); }
            }
            @keyframes ds-flap-bottom {
              0% { transform: rotateZ(0deg); }
              50% { transform: rotateZ(35deg); }
              100% { transform: rotateZ(0deg); }
            }
            .ds-top { transform-origin: 58px 36px; transform-box: fill-box; animation: ds-flap-top 0.05s linear infinite; }
            .ds-bottom { transform-origin: 58px 50px; transform-box: fill-box; animation: ds-flap-bottom 0.05s linear infinite; }
          `}
        </style>

        <svg
          width="140"
          height="90"
          viewBox="0 0 140 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="ds-body" x1="10" y1="45" x2="120" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="50%" stopColor="#134e4a" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <radialGradient id="ds-glow" cx="70" cy="45" r="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="70" cy="45" rx="65" ry="40" fill="url(#ds-glow)" />

          {/* Far wings (behind body, thinner) */}
          <g opacity="0.35">
            <path
              d="M58 32 C30 6 0 12 4 36 C6 52 36 46 58 34"
              fill="rgba(94,234,212,0.12)"
              stroke="#0d9488"
              strokeWidth="0.8"
            />
            <path
              d="M58 54 C30 82 0 78 4 54 C6 38 36 42 58 52"
              fill="rgba(94,234,212,0.12)"
              stroke="#0d9488"
              strokeWidth="0.8"
            />
          </g>

          {/* Abdomen */}
          <rect x="30" y="43" width="80" height="4" rx="2" fill="url(#ds-body)" />
          <g stroke="rgba(94,234,212,0.35)" strokeWidth="0.6">
            <line x1="35" y1="43" x2="35" y2="47" />
            <line x1="42" y1="43" x2="42" y2="47" />
            <line x1="49" y1="43" x2="49" y2="47" />
            <line x1="56" y1="43" x2="56" y2="47" />
            <line x1="63" y1="43" x2="63" y2="47" />
            <line x1="70" y1="43" x2="70" y2="47" />
            <line x1="77" y1="43" x2="77" y2="47" />
            <line x1="84" y1="43" x2="84" y2="47" />
            <line x1="91" y1="43" x2="91" y2="47" />
            <line x1="98" y1="43" x2="98" y2="47" />
          </g>

          {/* Thorax */}
          <rect x="52" y="39" width="16" height="12" rx="4" fill="url(#ds-body)" />

          {/* Head & eyes */}
          <circle cx="22" cy="42" r="7" fill="#134e4a" />
          <ellipse cx="20" cy="39" rx="4" ry="5" fill="#5eead4" />
          <circle cx="20" cy="39" r="1.5" fill="#0f766e" />

          {/* Antennae */}
          <path d="M18 36 C12 24 8 16 4 10" stroke="#134e4a" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M22 34 C20 22 18 14 16 8" stroke="#134e4a" strokeWidth="0.8" strokeLinecap="round" fill="none" />

          {/* Legs */}
          <path d="M54 48 L48 56" stroke="#134e4a" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M66 48 L72 56" stroke="#134e4a" strokeWidth="0.8" strokeLinecap="round" />

          {/* Near top wings */}
          <g className="ds-top">
            <path
              d="M58 34 C30 2 0 8 6 36 C8 54 40 48 58 36"
              fill="rgba(94,234,212,0.14)"
              stroke="#0d9488"
              strokeWidth="1"
            />
            <path d="M58 34 C36 10 14 14 10 34" stroke="#0d9488" strokeWidth="0.7" fill="none" />
            <path d="M58 34 C40 18 22 22 16 38" stroke="#0d9488" strokeWidth="0.6" fill="none" />
            <path d="M58 34 C44 26 28 30 24 42" stroke="#0d9488" strokeWidth="0.5" fill="none" />
          </g>

          {/* Near bottom wings */}
          <g className="ds-bottom">
            <path
              d="M58 52 C30 86 0 82 6 54 C8 36 40 40 58 50"
              fill="rgba(94,234,212,0.14)"
              stroke="#0d9488"
              strokeWidth="1"
            />
            <path d="M58 52 C36 80 14 76 10 54" stroke="#0d9488" strokeWidth="0.7" fill="none" />
            <path d="M58 52 C40 72 22 68 16 50" stroke="#0d9488" strokeWidth="0.6" fill="none" />
            <path d="M58 52 C44 62 28 58 24 46" stroke="#0d9488" strokeWidth="0.5" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
