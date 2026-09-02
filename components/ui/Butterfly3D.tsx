"use client";

import { useEffect, useRef, useState } from "react";

export function Butterfly3D({
  className = "",
  landed = false,
}: {
  className?: string;
  landed?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={ref}
      className={["relative", className].join(" ")}
      style={{
        width: 24,
        height: 18,
        perspective: 120,
        transformStyle: "preserve-3d",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.8s ease-out",
        pointerEvents: "none",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 4,
          height: 16,
          borderRadius: 999,
          background: "linear-gradient(180deg, #134e4a, #0f766e)",
          zIndex: 2,
        }}
      />

      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 2,
          height: 10,
          borderRadius: 999,
          background: "#134e4a",
          transform: "rotate(-20deg) translateY(-8px)",
          transformOrigin: "bottom center",
        }}
      />
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 2,
          height: 10,
          borderRadius: 999,
          background: "#134e4a",
          transform: "rotate(20deg) translateY(-8px)",
          transformOrigin: "bottom center",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: 12,
          height: 16,
          marginLeft: -10,
          borderRadius: "60% 20% 60% 40%",
          background:
            "linear-gradient(135deg, #5eead4 0%, #0d9488 55%, #0f766e 100%)",
          boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.25), 0 4px 12px rgba(13,148,136,0.35)",
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
          animation: landed
            ? "flap-left 1.2s ease-in-out infinite"
            : "flap-fly 0.55s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: 12,
          height: 16,
          marginLeft: -2,
          borderRadius: "20% 60% 40% 60%",
          background:
            "linear-gradient(225deg, #5eead4 0%, #0d9488 55%, #0f766e 100%)",
          boxShadow: "inset 2px -2px 4px rgba(0,0,0,0.25), 0 4px 12px rgba(13,148,136,0.35)",
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
          animation: landed
            ? "flap-right 1.2s ease-in-out infinite"
            : "flap-fly 0.55s ease-in-out infinite reverse",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 12,
          marginLeft: -9,
          marginTop: 8,
          borderRadius: "50% 30% 50% 40%",
          background:
            "linear-gradient(135deg, rgba(94,234,212,0.8), rgba(13,148,136,0.9))",
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
          animation: landed
            ? "flap-left 1.2s ease-in-out infinite 0.1s"
            : "flap-fly 0.55s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 12,
          marginLeft: 1,
          marginTop: 8,
          borderRadius: "30% 50% 40% 50%",
          background:
            "linear-gradient(225deg, rgba(94,234,212,0.8), rgba(13,148,136,0.9))",
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
          animation: landed
            ? "flap-right 1.2s ease-in-out infinite 0.1s"
            : "flap-fly 0.55s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
