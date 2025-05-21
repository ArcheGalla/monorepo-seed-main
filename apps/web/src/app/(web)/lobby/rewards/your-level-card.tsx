"use client";

import { cn } from "@heroui/theme";
import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { Progress } from "@heroui/progress";

interface YourLevelCardProps {
  classNames?: {
    indiciator?: string;
  };
}

export const YourLevelCard: FC<YourLevelCardProps> = ({ classNames }) => {
  const currentLevel = "IRON";
  const nextLevel = "BRONZE";
  const currentProgress = 250000;
  const targetAmount = 500000;

  const progressPercentage = (currentProgress / targetAmount) * 100;

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

  return (
    <>
      <div className="flex items-end justify-between mb-2">
        <div className="flex gap-2 flex-col items-start justify-end">
          <span className="text-xs text-gray-400">Your Level </span>

          <div className="flex items-center gap-2">
            <Icon
              className={`w-6 h-6 ${getLevelColor(currentLevel)}`}
              icon={getLevelIcon(currentLevel)}
            />
            <span className="text-white font-medium">{currentLevel}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-end justify-end">
          <span className="text-xs text-gray-400">
            Play GC {targetAmount.toLocaleString()} for
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{nextLevel}</span>
            <Icon
              className={`w-6 h-6 ${getLevelColor(nextLevel)}`}
              icon={getLevelIcon(nextLevel)}
            />
          </div>
        </div>
      </div>
      <Progress
        className="h-2  "
        classNames={{
          base: "rounded-full bg-gray-800 ",
          indicator: cn(
            "bg-gradient-to-r from-yellow-400 to-orange-500",
            classNames?.indiciator,
          ),
        }}
        value={progressPercentage}
      />
    </>
  );
};
