"use client";

import React, { FC, useState } from "react";
import { cn } from "@heroui/theme";

import { OnboardingTooltip } from "./onboarding-tooltip";

import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

interface NavTooltipProps {
  show: boolean;
  onClose: () => void;
}

export const NavTooltip: FC<NavTooltipProps> = ({ show, onClose }) => {
  const { setFocusingOn } = useAppStore();
  const [step, setStep] = useState<"rewards" | "redeem">("redeem");
  const isRewards = step === "rewards";

  const handleStepChange = () => {
    if (step === "redeem") {
      setFocusingOn(FocusTargetEnum.Rewards);
      setStep("rewards");

      return;
    }

    onClose();
  };

  return (
    <>
      <OnboardingTooltip
        buttonText={isRewards ? "Exciting" : "Got It"}
        containerClassName={cn(
          "fixed md:absolute bottom-[5.5rem] md:bottom-auto md:left-52 md:top-[27.4rem] bg-white p-4 rounded-lg max-w-sm w-full pointer-events-auto z-[52] text-black",
          {
            "right-0 left-auto md:top-[31rem]": isRewards,
          },
        )}
        show={show}
        text={
          isRewards ? (
            <>
              Check out the{" "}
              <span className="uppercase font-semibold">Rewards</span> for daily{" "}
              <span className="uppercase font-semibold">Free</span> gifts!
            </>
          ) : (
            <>
              In the <span className="uppercase font-semibold">redeem</span>{" "}
              section you can redeem your winnings for prices.
            </>
          )
        }
        triangleClassName={cn(
          "absolute bottom-0 left-auto translate-y-full border-[20px] border-transparent border-t-white md:bottom-auto md:-translate-y-1/2 transform md:border-t-transparent md:border-r-white right-[26%] min-[415px]:right-[29%] md:top-[2.9rem] md:right-auto md:left-[-39px]",
          {
            "right-auto left-[25%] min-[415px]:left-[28%] min-[415px]:right-auto md:right-auto md:left-[-39px] md:top-[3rem]":
              !isRewards,
          },
        )}
        onClose={handleStepChange}
      />
    </>
  );
};
