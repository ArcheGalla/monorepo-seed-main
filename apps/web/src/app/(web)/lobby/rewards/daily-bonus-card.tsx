"use client";

import React, { FC } from "react";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import gift from "@/assets/gift.png";
import { DailyBonusModal } from "@/components/signup-flow/daily-bonus-modal";

export const DailyBonusCard: FC = () => {
  const dailyBonusDisclosure = useDisclosure();

  const handleDailyBonusClaimed = () => {
    dailyBonusDisclosure.onClose();
  };

  return (
    <>
      <DailyBonusModal
        isClaimed
        isOpen={dailyBonusDisclosure.isOpen}
        onClaim={handleDailyBonusClaimed}
        onOpenChange={dailyBonusDisclosure.onOpenChange}
      />

      <div className="p-3 bg-content1 border border-divider rounded-medium flex flex-col gap-3">
        <h2>Daily Bonus</h2>

        <img
          alt="gifts"
          className="h-20 w-fit mx-auto"
          src={gift.src}
          title="gifts"
        />
        <Button
          as={Link}
          className="bg-btnPrimary h-12 text-base font-normal"
          radius="sm"
          onPress={dailyBonusDisclosure.onOpen}
        >
          Next Bonus In 09:04:00
        </Button>
      </div>
    </>
  );
};
