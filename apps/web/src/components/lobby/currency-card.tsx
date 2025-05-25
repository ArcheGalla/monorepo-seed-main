"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Link } from "@heroui/link";
import { cn } from "@heroui/theme";

import { CurrencySwitcher } from "./currency-switcher";
import { PackagesModal } from "./packages-modal";

import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

export const CurrencyCard = ({}) => {
  const packageskDisclosure = useDisclosure();
  const { focusingOn, isAnimatingWallet, setIsAnimatingWallet } = useAppStore();

  const [showCurrencyAnimation, setShowCurrencyAnimation] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isAnimatingWallet) {
      timeoutId = setTimeout(() => {
        setShowCurrencyAnimation(true);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setShowCurrencyAnimation(false);
        setIsAnimatingWallet(false);
      }
    };
  }, [isAnimatingWallet]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showCurrencyAnimation) {
      timeoutId = setTimeout(() => {
        setShowCurrencyAnimation(false);
      }, 2400);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setShowCurrencyAnimation(false);
      }
    };
  }, [showCurrencyAnimation]);

  return (
    <>
      <PackagesModal
        isOpen={packageskDisclosure.isOpen}
        onClose={packageskDisclosure.onClose}
        onOpenChange={packageskDisclosure.onOpenChange}
      />
      <div
        className={cn(
          "max-w-md mx-auto bg-[#191428] rounded-xl p-4 w-full space-y-3 relative z-[3]",
          {
            "z-auto":
              focusingOn === FocusTargetEnum.Currency || isAnimatingWallet,
          },
        )}
      >
        <div
          className={cn("", {
            "z-[51] relative":
              focusingOn === FocusTargetEnum.Currency || isAnimatingWallet,
            "scale-pulse": showCurrencyAnimation,
          })}
        >
          <CurrencySwitcher isSideMenu />
        </div>

        <div className={cn("flex flex-wrap gap-3", {})}>
          <Button
            as={Link}
            className="bg-btnPrimary flex-1"
            href="/lobby/store"
            radius="sm"
          >
            Buy
          </Button>
          <Button as={Link} className="flex-1" href="/lobby/redeem" radius="sm">
            Redeem
          </Button>
        </div>
      </div>
    </>
  );
};
