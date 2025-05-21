import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { cn } from "@heroui/theme";

interface LevelBadgeProps {
  level: number;
  multiplier: number;
}
const tier = {
  id: "blue",
  // name: "Blue Chips",
  name: "Blue",
  icon: "lucide:hexagon",
  points: 1000,
  period: "Monthly",
  color: "blue-500",
  bgColor: "bg-blue-500",
  // gradientClass: "blue-gradient-text",
  gradientClass: "text-blue-500",
  solidClass: "blue-solid-text",
  borderClass: "blue-border",
  glowClass: "tier-glow-blue",
  benefits: ["20% Weekly Boost", "Bronze Spin", "2% Loss Back"],
};

const nextTier = {
  id: "silver",
  name: "Silver",
  icon: "lucide:medal",
  gradientClass: "silver-gradient-text",
  bgColor: "bg-white/30",
  color: "text-slate-400",
  points: 10000,
};

export const LevelBadge = ({ level, multiplier }: LevelBadgeProps) => {
  // Current tier details
  const currentTier = "Blue";
  const currentVB = 3500;
  const targetVB = 10000;
  const remainingPoints = targetVB - currentVB;
  const progress = Math.floor((currentVB / targetVB) * 100);

  return (
    <Card className="border border-magenta/30 bg-gradient-to-r from-plumDark via-plum to-plumDark text-white">
      <CardBody>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-shrink-0 p-3 pb-0">
            <div className="w-20 h-20 rounded-full bg-magenta card-glow flex items-center justify-center text-white font-bold text-xl">
              <Icon className="w-10 h-10" icon="lucide:award" />
            </div>
          </div>

          <div className="flex-grow">
            <div className="py-3 pr-1 flex flex-col lg:flex-row justify-between">
              <div className="flex gap-1 items-center">
                <h3 className="text-lg font-semibold">My Current Tier:</h3>
                <div className="flex gap-1 items-center">
                  <span className="text-lg font-semibold text-blue-500">
                    {currentTier}
                  </span>
                  <div
                    className={cn(
                      `w-6 h-6 rounded-full flex items-center justify-center border-2 border-white/20`,
                      tier.bgColor,
                    )}
                  >
                    <Icon className="w-4 h-4 text-white" icon={tier?.icon} />
                  </div>
                </div>
              </div>
              <div className="text-sm text-amber font-medium">
                Current VB: {currentVB.toLocaleString()} /{" "}
                {targetVB.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3  gap-3 lg:gap-4 mb-4">
              <div className="bg-plumDark border border-magenta/30 py-2 px-3 justify-between lg:flex-col flex gap-2 rounded-lg">
                {/* <div className="text-xs text-gray-300">Daily Bonus</div> */}
                <div className="text-base text-gray-300 w-3/5 ssm:w-auto sm:text-sm">
                  My current daily login bonus
                </div>
                <div className="text-lg font-bold text-amber">
                  {(20000).toLocaleString()} GC
                </div>
              </div>
              <div className="bg-plumDark border border-magenta/30 flex gap-2  justify-between lg:flex-col  py-2 px-3 rounded-lg">
                <div className="text-base text-gray-300 w-3/5 sm:w-auto sm:text-sm">
                  My current weekly login bonus
                </div>
                <div className="text-lg font-bold text-amber">
                  {(75000).toLocaleString()} GC
                </div>
              </div>
              <div className="bg-plumDark border border-magenta/30 justify-between lg:flex-col   flex gap-2 py-2 px-3 rounded-lg">
                <div className="text-base text-gray-300  w-3/4 s sm:w-auto sm:text-sm">
                  My current loosing cash back bonus
                </div>
                <div className="text-lg font-bold text-amber">5%</div>
              </div>
            </div>

            <div className="space-y-2 px-3 pb-3">
              <div className="flex justify-between text-sm">
                <span>
                  {remainingPoints.toLocaleString()} more points until you reach{" "}
                  {nextTier.name} status
                </span>
                <span className="font-medium flex items-center gap-1">
                  {/* {nextTier.name} */}
                  <div
                    className={cn(
                      `w-6 h-6 rounded-full flex items-center justify-center border-2 border-white/20`,
                      nextTier.bgColor,
                    )}
                  >
                    <Icon
                      className="w-4 h-4 text-white"
                      icon={nextTier?.icon}
                    />
                  </div>
                </span>
              </div>
              <Progress
                aria-label={`Progress to ${nextTier.name}`}
                className="h-2"
                color="warning"
                value={progress}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
