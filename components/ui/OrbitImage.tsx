import Image from "next/image";

export default function OrbitLogos() {
  return (
    <div className="orbit-wrapper">
      {/* Orbit 1 */}
      <div className="orbit orbit-xl spin-slow">
        <OrbitItem src="/globe.svg" />
      </div>

      <div className="orbit orbit-lg spin-reverse">
        <OrbitItem src="/google.svg" />
      </div>

      <div className="orbit orbit-md spin-medium">
        <OrbitItem src="/react.svg"  />
      </div>

      <div className="orbit orbit-sm spin-fast">
        <OrbitItem src="/vscode.png"  />
      </div>

      <style jsx global>{`
        .orbit-wrapper {
          position: relative;
          width: 420px;
          height: 420px;
          margin: auto;
        }

        .orbit {
          position: absolute;
          inset: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .orbit-item {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Orbit Sizes */
        .orbit-sm {
          width: 160px;
          height: 160px;
        }

        .orbit-md {
          width: 230px;
          height: 230px;
        }

        .orbit-lg {
          width: 310px;
          height: 310px;
        }

        .orbit-xl {
          width: 390px;
          height: 390px;
        }

        /* Animations */
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

        .spin-slow {
          animation: spin 20s linear infinite;
        }

        .spin-medium {
          animation: spin 14s linear infinite;
        }

        .spin-fast {
          animation: spin 10s linear infinite;
        }

        .spin-reverse {
          animation: spin-reverse 18s linear infinite;
        }
      `}</style>
    </div>
  );
}

function OrbitItem({ src }: { src: string }) {
  return (
    <div className="orbit-item">
      <Image src={src} alt="logo" width={36} height={36} />
    </div>
  );
}
