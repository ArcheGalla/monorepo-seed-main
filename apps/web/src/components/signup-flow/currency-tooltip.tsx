import React, { FC, useState } from "react";
import { cn } from "@heroui/theme";
import { Link } from "@heroui/link";

import { OnboardingTooltip } from "./onboarding-tooltip";

import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";
import { CurrencyEnum } from "@/types/currency";
import { useUserStore } from "@/store/useUserStore";

interface CurrencyTooltipProps {
  show: boolean;
  onClose: () => void;
}

export const CurrencyTooltip: FC<CurrencyTooltipProps> = ({
  show,
  onClose,
}) => {
  const { setSelectedCurrency } = useUserStore();
  const [step, setStep] = useState<CurrencyEnum>(CurrencyEnum.GC);
  const isGoldCoins = step === CurrencyEnum.GC;

  const handleStepChange = () => {
    if (step === CurrencyEnum.GC) {
      setSelectedCurrency(CurrencyEnum.SC);
      setStep(CurrencyEnum.SC);

      return;
    }

    onClose();
  };

  return (
    <>
      <OnboardingTooltip
        buttonText={isGoldCoins ? "Great" : "Awesome"}
        containerClassName={cn(
          "absolute top-20 md:left-[-0.5%] md:top-[10.4rem] bg-white p-4 rounded-lg max-w-sm w-full pointer-events-auto z-[52] text-black",
        )}
        show={show}
        text={
          isGoldCoins ? (
            <>
              Play with{" "}
              <span className="inline-flex items-end gap-1">
                <img alt="GC Coin" className="w-6 h-6" src={gcCoin.src} />
                <span className="font-bold text-black -mb-[0.4rem] uppercase">
                  {" "}
                  Gold Coins&nbsp;
                </span>{" "}
              </span>
              for fun in any game & earn Loyalty Points to win rewards.{" "}
            </>
          ) : (
            <>
              Play with{" "}
              <span className="inline-flex items-end gap-1">
                <img alt="SC Coin" className="w-6 h-6" src={scCoin.src} />
                <span className="font-bold text-black -mb-[0.4rem] uppercase">
                  {" "}
                  Sweep Coins&nbsp;
                </span>{" "}
              </span>
              & redeem your winnings for a prize.{" "}
              <Link className="underline text-btnPrimary font-semibold">
                Sweepstakes Rules
              </Link>
            </>
          )
        }
        triangleClassName={cn(
          "absolute top-0 left-[22%] md:left-[15%] transform -translate-x-1/2 -translate-y-full border-[20px] border-transparent border-b-white",
          {
            "left-[28%] md:left-[22%]": !isGoldCoins,
          },
        )}
        onClose={handleStepChange}
      />
    </>
  );
};
