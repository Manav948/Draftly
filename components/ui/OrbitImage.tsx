import Image from "next/image";

export default function OrbitLogos() {
  return (
    <div className="orbit-wrapper">
      {/* Center */}
      <div className="center-glow" />

      {/* Orbits */}
      <Orbit size="xl" speed={25} reverse>
        <OrbitItem src="/globe.svg" />
      </Orbit>

      <Orbit size="lg" speed={18}>
        <OrbitItem src="/google.svg" />
      </Orbit>

      <Orbit size="md" speed={14}>
        <OrbitItem src="/react.svg" />
      </Orbit>

      <Orbit size="sm" speed={10}>
        <OrbitItem src="/vscode.png" />
      </Orbit>

      <style jsx global>{`
        .orbit-wrapper {
          position: relative;
          width: min(90vw, 420px);
          height: min(90vw, 420px);
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Center Glow */
        .center-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #3b82f6, transparent 70%);
          filter: blur(40px);
          z-index: 0;
        }

        /* Orbit Base */
        .orbit {
          position: absolute;
          inset: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(2px);
        }

        /* Sizes */
        .orbit-sm { width: 160px; height: 160px; }
        .orbit-md { width: 230px; height: 230px; }
        .orbit-lg { width: 310px; height: 310px; }
        .orbit-xl { width: 390px; height: 390px; }

        /* Orbit Item */
        .orbit-item {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          animation: counter-rotate linear infinite;
        }

        .orbit-item img {
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
          transition: transform 0.3s ease;
        }

        .orbit-item:hover img {
          transform: scale(1.2);
        }

        /* Spin */
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        /* Counter rotation (fix upside-down logos) */
        @keyframes counter-rotate {
          from {
            transform: translateX(-50%) rotate(0deg);
          }
          to {
            transform: translateX(-50%) rotate(-360deg);
          }
        }

        /* Hover Pause */
        .orbit-wrapper:hover .orbit {
          animation-play-state: paused;
        }

      `}</style>
    </div>
  );
}

function Orbit({
  children,
  size,
  speed,
  reverse = false,
}: {
  children: React.ReactNode;
  size: string;
  speed: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={`orbit orbit-${size}`}
      style={{
        animation: `${reverse ? "spin-reverse" : "spin"} ${speed}s linear infinite`,
      }}
    >
      {children}
    </div>
  );
}

function OrbitItem({ src }: { src: string }) {
  return (
    <div
      className="orbit-item"
      style={{
        animationDuration: "inherit",
      }}
    >
      <Image src={src} alt="logo" width={40} height={40} />
    </div>
  );
}