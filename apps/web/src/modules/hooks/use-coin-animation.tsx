import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

import { CurrencyEnum } from "@/types/currency";
import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

interface UseCoinAnimationProps {
  heightDivider?: number;
  mobileHeight?: number;
  gcWidthDivider?: number;
  gcMobileWidth?: number;
  scMobileWidth?: number;
  scWidthDivider?: number;
  coinSize?: string;
}

export const useCoinAnimation = ({
  heightDivider = 1.6,
  mobileHeight = 160,
  gcWidthDivider = 2.2,
  gcMobileWidth = -100,
  scMobileWidth = -120,
  scWidthDivider = 2.22,
  coinSize = "w-10 h-10",
}: UseCoinAnimationProps = {}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 1024,
    height: 800,
  });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const heightValue = useMemo(
    () =>
      -dimensions.height +
      (isMobile ? mobileHeight : dimensions.height / heightDivider),
    [dimensions, heightDivider],
  );

  const coinVariantGC = useMemo(
    () => ({
      scale: [0, 1, 1, 1, 1, 0],
      y: [0, heightValue],
      x: [0, isMobile ? gcMobileWidth : -dimensions.width / gcWidthDivider],
    }),
    [heightValue, dimensions, gcWidthDivider],
  );

  const coinVariantSC = useMemo(
    () => ({
      scale: [0, 1, 1, 1, 1, 0],
      y: [0, heightValue],
      x: [0, isMobile ? scMobileWidth : -dimensions.width / scWidthDivider],
    }),
    [heightValue, dimensions, scWidthDivider],
  );

  const handleCollectCoins = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    const coinCount = 10;
    let collected = 0;

    const animateNextCoin = () => {
      if (collected < coinCount) {
        setTimeout(() => {
          collected++;
          animateNextCoin();
        }, 200);
      }
    };

    animateNextCoin();
  }, [isAnimating]);

  const renderCoins = useCallback(
    (type: CurrencyEnum, offset: string, baseDelay = 0) =>
      Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={`${type}-coin-${index}`}
          animate={type === CurrencyEnum.GC ? coinVariantGC : coinVariantSC}
          className={`absolute ${offset} top-1/2 -translate-x-1/2 -translate-y-1/2 z-[55]`}
          initial={{ scale: 0, y: 0, x: 0 }}
          transition={{ duration: 1, delay: baseDelay + index * 0.1 }}
        >
          <img
            alt="Coin"
            className={coinSize}
            src={type === CurrencyEnum.GC ? gcCoin.src : scCoin.src}
          />
        </motion.div>
      )),
    [coinVariantGC, coinVariantSC, coinSize],
  );

  return {
    isAnimating,
    setIsAnimating,
    handleCollectCoins,
    renderCoins,
  };
};
