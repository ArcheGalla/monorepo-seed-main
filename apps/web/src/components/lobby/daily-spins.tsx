"use client";

import React from "react";
import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";

interface SpinsTrackerProps {
  maxSpins?: number;
  currentSpins?: number;
}

export const DailySpins = ({
  maxSpins = 8,
  currentSpins = 2,
}: SpinsTrackerProps) => {
  const [timeLeft, setTimeLeft] = React.useState<string>("");

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-md mx-auto w-full">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="flex items-center gap-1">
          <Icon className="text-yellow-500 w-6 h-6" icon="lucide:coins" />
          <span className="text-sm font-semibold">
            {currentSpins}/{maxSpins} SPINS
          </span>
          <Tooltip
            className="bg-content2"
            content={
              <p className="">
                Your{" "}
                <span className="font-bold  bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
                  free spin wheels
                </span>{" "}
                for today. <br />
                Use them all an claim your daily login bonus.
              </p>
            }
          >
            <span className="cursor-help">
              <Icon className="text-default-500 w-4 h-4" icon="lucide:info" />
            </span>
          </Tooltip>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 rounded-full px-3 py-1">
          <span className="text-sm text-white font-semibold">{timeLeft}</span>
        </div>
      </div>
      <Progress
        className="h-8"
        classNames={{
          base: "rounded-full",
          indicator: "bg-gradient-to-r from-amber to-yellow-400",
          track: "h-8 bg-black/90",
        }}
        value={(currentSpins / maxSpins) * 100}
      />
      {/* <Button className="min-w-0 p-0 absolute right-12 -bottom-3 transform translate-x-full bg-magenta/10 card-glow rounded-full h-14 w-14 flex items-center justify-center pulse2 transition-transform hover:scale-110 hover:!opacity-100"> */}
      <Button className="min-w-0 p-0 absolute right-12 -bottom-2 transform translate-x-full bg-btnPrimary/90 card-glow rounded-full h-14 w-14 flex items-center justify-center pulse2 transition-transform hover:scale-110 hover:!opacity-100">
        {/* <Icon className="text-white w-12 h-12" icon="hugeicons:ferris-wheel" /> */}
        {/* <Icon className="text-white w-14 h-14" icon="majesticons:ferris-wheel-line" /> */}
        <Icon
          className="text-white min-w-10 h-14"
          icon="majesticons:ferris-wheel-line"
        />
        {/*  */}
        {/* <img alt="" className="w-14 h-14 rounded-full" src={day2.src} /> */}
      </Button>
    </div>
  );
};
