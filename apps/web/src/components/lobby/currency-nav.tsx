"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@heroui/theme";
import { usePathname } from "next/navigation";

import { SignupFlow } from "../signup-flow";

import { NotificationButtons } from "./notification-buttons";
import { CurrencySwitcher } from "./currency-switcher";

import { Logo } from "@/components/atoms/logo";
import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

export const CurrencyNav = () => {
  const pathname = usePathname();
  const isLobbyPage = pathname === "/lobby";

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
      }, 1500);
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
      {isLobbyPage && <SignupFlow resetKey={0} step={2} />}
      <div
        className={cn(
          "flex w-full min-h-[55px] py-1.5 sticky top-0 bg-black border-b border-divider z-[49] justify-start gap-4 items-center px-2 sm:pr-6 md:hidden",
          {
            "z-[51]":
              focusingOn === FocusTargetEnum.Currency || isAnimatingWallet,
          },
        )}
      >
        <div className="w-10 hidden xs:block shrink-0">
          <Logo
            imageClassName="object-cover w-[90px] h-[20px] ml-1 rounded-none"
            src="/vb.svg"
          />
        </div>

        <div
          className={cn("flex flex-col", {
            "scale-pulse": showCurrencyAnimation,
          })}
        >
          <CurrencySwitcher />
        </div>

        <div className="min-w-10 shrink-0 flex items-center  ml-auto pr-1">
          <NotificationButtons />
        </div>
      </div>
    </>
  );
};
