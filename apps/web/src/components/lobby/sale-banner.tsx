"use client";

import React from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import { StarterPackModal } from "../signup-flow/starter-pack-modal";

import sale from "@/assets/sale.png";

export const SaleBanner = () => {
  const [timeLeft, setTimeLeft] = React.useState<string>("");
  const starterPackDisclosure = useDisclosure();

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
    <>
      <StarterPackModal
        isOpen={starterPackDisclosure.isOpen}
        onClose={starterPackDisclosure.onClose}
        onOpenChange={starterPackDisclosure.onOpenChange}
      />
      <Button
        className="flex flex-col items-center justify-center relative p-0 h-auto min-h-0 min-w-0 bg-transparent overflow-visible hover:scale-110"
        onPress={starterPackDisclosure.onOpenChange}
      >
        <div className="h-8 w-8 bg-magenta/30 absolute card-glow z-[1]" />
        <img alt="Sale" className="w-16 h-16 z-[2]" src={sale.src} />
        <div className="absolute -bottom-4  lg:-bottom-5 bg-black/80 rounded-full px-3 py-1">
          <span className="text-sm text-white font-semibold">{timeLeft}</span>
        </div>
      </Button>
    </>
  );
};
