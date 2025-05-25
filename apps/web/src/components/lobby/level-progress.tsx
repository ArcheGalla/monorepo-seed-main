"use client";

import React from "react";
import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@heroui/modal";

import { PackagesModal } from "./packages-modal";

interface LevelProgressProps {
  currentLevel?: string;
  nextLevel?: string;
  currentProgress?: number;
  targetAmount?: number;
}

export const LevelProgress = ({
  currentLevel = "IRON",
  nextLevel = "BRONZE",
  currentProgress = 250000,
  targetAmount = 500000,
}: LevelProgressProps) => {
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

  const packageskDisclosure = useDisclosure();

  return (
    <>
      <PackagesModal
        isOpen={packageskDisclosure.isOpen}
        onClose={packageskDisclosure.onClose}
        onOpenChange={packageskDisclosure.onOpenChange}
      />
      <div className="max-w-md mx-auto bg-[#191428] rounded-xl p-4 w-full space-y-3 relative z-[3]">
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
            indicator: "bg-gradient-to-r from-yellow-400 to-orange-500",
          }}
          value={progressPercentage}
        />
      </div>
    </>
  );
};
