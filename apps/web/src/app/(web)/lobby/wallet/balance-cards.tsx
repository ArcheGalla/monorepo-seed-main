"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Card } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { cn } from "@heroui/theme";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

const balances = [
  {
    title: "My Gold Coins (GC)",
    balance: "1,500,000 GC",
    disclaimer: "Gold Coins are for entertainment only and hold no cash value.",
    disclaimer2: (
      <div className="text-white text-xs">
        <p className="font-bold mb-1">
          Gold Coin purchases are for entertainment only and hold no cash value.
        </p>
        <p className="opacity-80">
          All purchases are final and non-refundable. Please play responsibly.
        </p>
      </div>
    ),
    icon: (
      <>
        <img alt="GC Coin" className="w-7 h-7" src={gcCoin.src} />
      </>
    ),
    bgColor: "bg-gradient-to-r from-plumDark via-plum to-plumDark",
    borderColor: "border-amber",
    textColor: "text-amber",
    buttonColor: "bg-amber",
    // buttonText: "Buy More",
    buttonText: "Add Coins",
  },
  {
    title: "My Sweepstakes Coins (SC)",
    balance: "25 SC",
    disclaimer: (
      <>
        <p>Sweepstakes Coins can be redeemed for prizes where legal.</p>
      </>
    ),
    disclaimer2: (
      <div className="text-white text-xs">
        <p className="font-bold mb-1">
          No purchase is necessary to receive or use SC Coins.{" "}
        </p>
        <p className=" opacity-80">
          Redemption is subject to eligibility and verification. SC Coins have
          no direct cash value but may be redeemed for prizes in accordance with
          our Sweepstakes Rules.
        </p>
      </div>
    ),
    icon: (
      <>
        <img alt="SC Coin" className="w-7 h-7" src={scCoin.src} />
      </>
    ),
    bgColor: "bg-gradient-to-r from-plumDark via-plum to-plumDark",
    borderColor: "border-success",
    textColor: "text-success",
    buttonColor: "bg-success",
    buttonText: "Play Now",
  },
  {
    title: "My VIP Bonus (VB)",
    balance: "5,000 VB",
    disclaimer: "VIP Bonus Coins are promotional and non-transferable.",
    disclaimer2: (
      <div className="text-white text-xs">
        <p className="font-bold mb-1">
          VB Points are earned through gameplay and promotions.
        </p>
        <p className="opacity-80">
          They can be used to unlock bonuses, rewards, and exclusive in-game
          features — but they are not redeemable for cash or prizes.
        </p>
      </div>
    ),
    icon: (
      <span className="min-h-7 min-w-7">
        <Icon className="text-magenta" icon="lucide:crown" width={28} />
      </span>
    ),
    bgColor: "bg-gradient-to-r from-plumDark via-plum to-plumDark",
    borderColor: "border-magenta",
    textColor: "text-magenta",
    buttonColor: "bg-magenta",
    buttonText: "Redeem",
  },
];

interface BalanceCardProps {
  title: string;
  balance: string;
  disclaimer: React.ReactNode;
  disclaimer2: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
  bgColor: string;
  textColor?: string;
  borderColor: string;
  buttonColor: string;
  buttonText: string;
  onOpen: () => void;
}

const BalanceCard = ({
  title,
  balance,
  disclaimer,
  disclaimer2,
  icon,
  color,
  bgColor,
  textColor,
  borderColor,
  buttonColor,
  buttonText,
  onOpen,
}: BalanceCardProps) => {
  return (
    <Card className={`border ${borderColor} ${bgColor} ${textColor}`}>
      <div className="flex items-stretch h-full">
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className={cn("text-lg font-semibold")}>{title}</h3>
            {disclaimer2 && (
              <Tooltip
                className={cn("max-w-[300px]", `${buttonColor}`)}
                color="primary"
                content={disclaimer2}
                placement="right"
              >
                <div className="text-vegas-platinum/70 hover:text-vegas-platinum transition-colors mt-1">
                  <Icon icon="lucide:info" width={16} />
                </div>
              </Tooltip>
            )}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`${color} flex items-center justify-center`}>
              <div className="h-full flex items-center">{icon}</div>
            </div>
            <p className={cn("text-2xl font-bold")}>{balance}</p>
          </div>

          <p className="text-sm text-white mt-2">{disclaimer}</p>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Button
          className={cn("min-h-12 w-full text-base font-semibold", buttonColor)}
          onPress={onOpen}
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

export const BalanceCards = () => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {balances.map((balance, index) => (
          <BalanceCard
            key={balance.title}
            {...balance}
            onOpen={() => {
              if (index === 0) {
              }
              if (index === 1) {
                router.push("/lobby");
              }
              if (index === 2) {
              }
            }}
          />
        ))}
      </div>
    </>
  );
};
