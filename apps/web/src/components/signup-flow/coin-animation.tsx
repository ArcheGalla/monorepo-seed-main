import React from "react";

import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

interface CoinAnimationProps {
  onComplete: () => void;
}

export const CoinAnimation: React.FC<CoinAnimationProps> = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = React.useState(true);

  React.useEffect(() => {
    if (showAnimation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showAnimation]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      <div className="relative">
        {/* Gold Coins Animation */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={`cc-${index}`}
            className="absolute coin-animation"
            style={{
              left: `${Math.random() * 300 - 150}px`,
              top: `${Math.random() * 300 - 150}px`,
              animationDelay: `${Math.random() * 0.5}s`,
              zIndex: 10,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center">
              <img
                alt="Coin"
                className="max-w-16 max-h-16 aspect-square shrink-0"
                src={gcCoin.src}
              />
            </div>
          </div>
        ))}

        {/* Sweepstakes Animation */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`sc-${index}`}
            className="absolute coin-animation"
            style={{
              left: `${Math.random() * 300 - 150}px`,
              top: `${Math.random() * 300 - 150}px`,
              animationDelay: `${Math.random() * 0.5}s`,
              zIndex: 10,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <img
                alt="Coin"
                className="max-w-16 max-h-16 aspect-square shrink-0"
                src={scCoin.src}
              />
            </div>
          </div>
        ))}

        <div className="text-center text-4xl font-bold text-white relative z-10 bg-plumDark p-6 rounded-large neon-border card-glow">
          <div className="mb-2 flex flex-col min-[500px]:flex-row min-[500px]:gap-2 justify-center">
            <span className="text-amber">+100,000</span>
            <span>Gold Coins</span>
          </div>
          <div className="flex flex-col min-[500px]:flex-row min-[500px]:gap-2 justify-center">
            <span className="text-green-500">+2</span>
            <span>Sweepstakes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
