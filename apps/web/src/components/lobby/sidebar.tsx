"use client";

import React from "react";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";

import { LevelProgress } from "./level-progress";
import { Navigation } from "./navigation";
import { CurrencyCard } from "./currency-card";
import { NotificationButtons } from "./notification-buttons";

import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

export const Sidebar = () => {
  const { isAnimatingWallet, focusingOn } = useAppStore();

  return (
    <div className="sidebar-gradient border-r border-magenta/20 h-full">
      <div
        className={cn("w-72 top-0 sticky z-10", {
          "z-auto relative":
            focusingOn === FocusTargetEnum.Currency ||
            isAnimatingWallet ||
            focusingOn === FocusTargetEnum.Rewards ||
            focusingOn === FocusTargetEnum.Redeem,
        })}
      >
        <div className="overflow-hidden relative pb-32 flex flex-col">
          <div className="flex gap-1 items-center">
            <div className="p-3 pb-0 min-h-[74px]">
              <Image
                alt="VegasBonanza Logo"
                className="object-cover w-[90px] h-[45px] ml-4 rounded-none"
                src="/logo6.svg"
              />
            </div>
            <div className="ml-auto flex items-end mr-4 mt-2">
              <NotificationButtons />
            </div>
          </div>
          <div className="p-4 pt-3 flex flex-col gap-4">
            <CurrencyCard />
            <LevelProgress />
            <div
              className={cn(
                "bg-gradient-to-r from-magenta to-blue-600 h-[450px] w-[300px] absolute blur-lg left-0 top-[100px] z-[2]",
                {
                  "z-[-1]":
                    focusingOn === FocusTargetEnum.Currency ||
                    isAnimatingWallet,
                },
              )}
            />
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};
