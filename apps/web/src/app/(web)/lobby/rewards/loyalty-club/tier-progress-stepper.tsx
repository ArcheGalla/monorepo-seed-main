"use client";

import React, { FC, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { cn } from "@heroui/theme";

import { YourLevelCard } from "../your-level-card";

interface TierInfo {
  id: string;
  name: string;
  icon: string;
  points: number;
  period: string;
  color: string;
  bgColor: string;
  gradientClass: string;
  solidClass: string;
  borderClass: string;
  glowClass: string;
  features: {
    value: string;
    label: string;
    valueClass?: string;
    colSpan?: number;
  }[];
}

export const TierProgressStepper: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tiers: TierInfo[] = [
    {
      id: "red",
      name: "Red",
      icon: "lucide:hexagon",
      points: 0,
      period: "Automatic",
      color: "red-500",
      bgColor: "bg-red-500",
      gradientClass: "text-red-500",
      solidClass: "red-solid-text",
      borderClass: "red-border",
      glowClass: "tier-glow-red",
      features: [
        {
          value: "-",
          label: "Welcome Reward",
          valueClass: "text-amber font-semibold",
        },
        { value: "0%", label: "Weekly Coin Boost" },
        { value: "0%", label: "Weekly Reward" },
        {
          value: "No",
          label: "VIP Club Access",
          valueClass: "text-sm text-danger",
        },
        {
          value: "-",
          label: "GC Required to Play",
          colSpan: 2,
          valueClass: "text-amber font-semibold",
        },
      ],
    },
    {
      id: "blue",
      name: "Blue",
      icon: "lucide:hexagon",
      points: 1000,
      period: "Monthly",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
      gradientClass: "text-blue-500",
      solidClass: "blue-solid-text",
      borderClass: "blue-border",
      glowClass: "tier-glow-blue",
      features: [
        {
          value: "-",
          label: "Welcome Reward",
          valueClass: "text-amber font-semibold",
        },
        { value: "20%", label: "Weekly Coin Boost" },
        { value: "2%", label: "Weekly Reward" },
        {
          value: "No",
          label: "VIP Club Access",
          valueClass: "text-sm text-danger",
        },
        {
          value: "-",
          label: "GC Required to Play",
          colSpan: 2,
          valueClass: "text-amber font-semibold",
        },
      ],
    },
    {
      id: "silver",
      name: "Silver",
      icon: "lucide:medal",
      points: 5000,
      period: "Monthly",
      color: "text-white",
      bgColor: "bg-gray-500",
      gradientClass: "text-slate-400",
      solidClass: "silver-solid-text",
      borderClass: "silver-border",
      glowClass: "tier-glow-silver",
      features: [
        {
          value: "-",
          label: "Welcome Reward",
          valueClass: "text-amber font-semibold",
        },
        { value: "35%", label: "Weekly Coin Boost" },
        { value: "5%", label: "Weekly Reward" },
        {
          value: "No",
          label: "VIP Club Access",
          valueClass: "text-sm text-danger",
        },
        {
          value: "-",
          label: "GC Required to Play",
          colSpan: 2,
          valueClass: "text-amber font-semibold",
        },
      ],
    },
    {
      id: "gold",
      name: "Gold",
      icon: "lucide:trophy",
      points: 10000,
      period: "Monthly",
      color: "text-amber",
      bgColor: "bg-amber",
      gradientClass: "text-amber",
      solidClass: "gold-solid-text",
      borderClass: "gold-border",
      glowClass: "tier-glow-gold",
      features: [
        {
          value: "-",
          label: "Welcome Reward",
          valueClass: "text-amber font-semibold",
        },
        { value: "50%", label: "Weekly Coin Boost" },
        { value: "7%", label: "Weekly Reward" },
        {
          value: "No",
          label: "VIP Club Access",
          valueClass: "text-sm text-danger",
        },
        {
          value: "-",
          label: "GC Required to Play",
          colSpan: 2,
          valueClass: "text-amber font-semibold",
        },
      ],
    },
    {
      id: "platinum",
      name: "Platinum",
      icon: "lucide:crown",
      points: 250000,
      period: "Yearly",
      color: "text-blue-400",
      bgColor: "bg-blue-400",
      gradientClass: "text-blue-400",
      solidClass: "platinum-solid-text",
      borderClass: "platinum-border",
      glowClass: "tier-glow-platinum",
      features: [
        {
          value: "-",
          label: "Welcome Reward",
          valueClass: "text-amber font-semibold",
        },
        { value: "75%", label: "Weekly Coin Boost" },
        { value: "10%", label: "Weekly Reward" },
        {
          value: "Yes",
          label: "VIP Club Access",
          valueClass: "text-sm text-green-500",
        },
        {
          value: "-",
          label: "GC Required to Play",
          colSpan: 2,
          valueClass: "text-amber font-semibold",
        },
      ],
    },
  ];

  const userPoints = 3500;

  // Find current tier
  const currentTierIndex = tiers.findIndex((tier, index) => {
    const nextTier = tiers[index + 1];

    return nextTier
      ? userPoints >= tier.points && userPoints < nextTier.points
      : userPoints >= tier.points;
  });

  const currentTier = tiers[currentTierIndex];
  const nextTier =
    currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;

  // Calculate progress to next tier
  const progressPercentage = nextTier
    ? Math.min(
        100,
        Math.floor(
          ((userPoints - currentTier.points) /
            (nextTier.points - currentTier.points)) *
            100,
        ),
      )
    : 100;

  const currentLevel = "IRON";
  const nextLevel = "BRONZE";
  const currentProgress = 250000;
  const targetAmount = 500000;

  const progressPercentageNew = (currentProgress / targetAmount) * 100;

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "iron":
        return "lucide:hexagon";
      case "bronze":
        return "lucide-lab:hexagons-3";
      case "silver":
        return "lucide:hexagon-half";
      case "gold":
        return "lucide:hexagon-fill";
      default:
        return "lucide:hexagon";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "iron":
        return "text-gray-400";
      case "bronze":
        return "text-orange-400";
      case "silver":
        return "text-gray-300";
      case "gold":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const currentTierRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentTierRef.current) {
      currentTierRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  return (
    <div>
      <div className="max-w-md mx-auto bg-content1 rounded-xl p-4 w-full space-y-3 relative z-[3] mb-4 md:mb-8">
        <YourLevelCard
          classNames={{
            indiciator: "bg-neon2",
          }}
        />
      </div>

      <h2 className="text-2xl font-bold pb-1 text-center md:text-3xl">
        {" "}
        8 Tiers to Climb
      </h2>

      <p className="text-sm text-center mb-2 text-default-600 max-w-2xl mx-auto">
        Upgrade through the levels and reach the most prestigious Ruby, Diamond
        or Black Diamond status to earn Weekly Coin Boost Deals and other
        exciting loyalty rewards.
      </p>

      <p className="text-sm text-center text-default-600 max-w-2xl mx-auto">
        Reaching these levels means you can keep your status for a whole year
        and enjoy access to the number 1 VIP Club on the market.
      </p>

      {/* Tier progress cards */}
      <ScrollShadow
        className="pt-2 pb-8 overscroll-x-contain"
        hideScrollBar={false}
        orientation="horizontal"
        size={60}
      >
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pt-10  px-2 py-3 -ml-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4A3078 transparent",
          }}
        >
          {tiers.map((tier, index) => {
            const isCurrent = index === currentTierIndex;
            const isCompleted = index < currentTierIndex;

            return (
              <div
                key={tier.id}
                ref={isCurrent ? currentTierRef : null}
                className={`flex-shrink-0 w-72 relative ${isCurrent ? "tier-card active " + tier.glowClass : isCompleted ? "tier-card completed" : "tier-card upcoming"}`}
              >
                <div
                  className={cn(
                    "rounded-large absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-[11]",
                    { "brightness-50": isCompleted },
                  )}
                >
                  <div
                    className={cn(
                      `w-16 h-16 rounded-full ${tier.bgColor} flex items-center justify-center mb-1 border border-white/20`,
                    )}
                  >
                    <Icon className="text-3xl text-white" icon={tier.icon} />
                  </div>
                  <div
                    className={`text-white text-2xl font-bold mb-2 text-center`}
                  >
                    {tier.name}
                  </div>
                </div>

                {isCurrent && (
                  <div className="absolute bg-gradient-to-r from-[#ffcf0e] to-[#0793ff] rounded-xl blur-lg opacity-100 inset-2" />
                )}

                <Card
                  className={cn(
                    `gradient-border ${isCurrent ? "neon-border2" : ""} h-full bg-content1 overflow-visible`,
                  )}
                  shadow={isCurrent ? "md" : "sm"}
                >
                  <CardBody
                    className={cn(
                      "p-4 pt-[4.5rem] pb-2 flex flex-col items-center border border-divider rounded-large overflow-visible",
                    )}
                  >
                    <div className="grid grid-cols-2 w-full gap-1.5 my-2">
                      {tier.features.map((feature, index) => (
                        <div
                          key={`feat ${index}`}
                          className={cn(
                            "bg-content2 rounded-medium p-1.5 flex flex-col gap-0.5 items-center justify-center",
                            { "col-span-2": feature.colSpan === 2 },
                          )}
                        >
                          <div
                            className={cn(
                              "text-sm text-amber",
                              feature.valueClass,
                            )}
                          >
                            {feature.value}
                          </div>
                          <div className="text-center text-xs text-default-600">
                            {feature.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {isCompleted && (
                      <div className="absolute top-0 inset-0 bg-overlay/70 z-10 flex flex-col items-center justify-center rounded-xl">
                        <Icon
                          className="text-white text-2xl"
                          icon="lucide:check"
                        />
                        <span className="font-medium">UNLOCKED</span>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
};
