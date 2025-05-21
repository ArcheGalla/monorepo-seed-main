"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/theme";
import { AnimatePresence } from "framer-motion";

import { OnboardingTooltip } from "./onboarding-tooltip";

import gc1 from "@/assets/gc1.webp";
import sc1 from "@/assets/sc1.webp";
import sc2 from "@/assets/sc2.webp";
import { CurrencyEnum } from "@/types/currency";
import { useCoinAnimation } from "@/modules/hooks/use-coin-animation";
import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

interface DailyBonusModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClaim: () => void;
  isClaimed?: boolean;
}

export const DailyBonusModal: FC<DailyBonusModalProps> = ({
  isOpen,
  onOpenChange,
  onClaim,
  isClaimed,
}) => {
  const days = [
    {
      day: 1,
      rewards: ["5,000", "0.5"],
      active: true,
      claimed: false,
      type: "both",
    },
    {
      day: 2,
      rewards: ["5,000", "0.5"],
      active: false,
      claimed: false,
      type: "both",
    },
    {
      day: 3,
      rewards: ["15,000", "0.5"],
      active: false,
      claimed: false,
      type: "both",
    },
    {
      day: 4,
      rewards: ["20,000", "0.8"],
      active: false,
      claimed: false,
      type: "both",
    },
    {
      day: 5,
      rewards: ["25,000", "0.5"],
      active: false,
      claimed: false,
      type: "both",
    },
    {
      day: 6,
      rewards: ["30,000", "0.5"],
      active: false,
      claimed: false,
      type: "both",
    },
    {
      day: 7,
      rewards: ["50,000", "0.5"],
      active: false,
      claimed: false,
      type: "special",
    },
  ];

  const [claimedDay, setClaimedDay] = useState(isClaimed);

  const handleClaim = () => {
    setClaimedDay(true);
    onClaim();
    handleCollectCoins();
  };

  // Timer
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!claimedDay) return;

    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();

      midnight.setHours(24, 0, 0, 0);

      const diffInSeconds = Math.floor(
        (midnight.getTime() - now.getTime()) / 1000,
      );

      const hours = String(Math.floor(diffInSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((diffInSeconds % 3600) / 60)).padStart(
        2,
        "0",
      );
      const seconds = String(diffInSeconds % 60).padStart(2, "0");

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [claimedDay]);

  // Coin animation
  const { isAnimating, setIsAnimating, handleCollectCoins, renderCoins } =
    useCoinAnimation({
      heightDivider: 1.25,
      mobileHeight: 450,
      gcWidthDivider: 2.8,
      gcMobileWidth: 8,
      scMobileWidth: 12,
      scWidthDivider: 2.85,
      coinSize: '"w-8 h-8',
    });

  const isNewUser = true;
  const [showBonusTooltip, setShowBonusTooltip] = useState(
    isNewUser && !isClaimed,
  );
  const { focusingOn } = useAppStore();

  return (
    <Modal
      className="overflow-visible"
      classNames={{
        body: "py-4 px-2 pb-0",
        footer: "pt-0 px-2",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isDismissable={!isAnimating}
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="pt-7 pb-0 flex flex-col gap-1 items-center justify-center">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-center relative">
                  Daily Bonus
                </h2>
              </div>
            </ModalHeader>

            <ModalBody className="pb-4">
              {showBonusTooltip && (
                <OnboardingTooltip
                  backdropClassName="bg-opacity-50"
                  buttonText="Claim Now"
                  containerClassName="left-0 top-[13.5rem] p-4"
                  show={showBonusTooltip}
                  text={
                    <>
                      Click to claim your{" "}
                      <span className="font-semibold">1st Daily Reward</span>!
                    </>
                  }
                  triangleClassName="border-b-white -translate-x-1/2 -translate-y-full top-2 left-[4.5rem] min-[440px]:left-20"
                  onClose={() => {
                    setShowBonusTooltip(false);
                    handleClaim();
                  }}
                />
              )}

              {/* Days Grid */}
              <div className="py-2 px-1 lg:p-0 grid grid-cols-3 gap-3 overscroll-x-contain gap-y-5">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "min-w-[110px] w-full bg-content2 rounded-lg p-4 text-center relative px-2 py-4",
                      {
                        "neon-border ": day.active && !claimedDay,
                        "border-transparent": day.active && claimedDay,
                        "min-w-fit w-full lg:min-w-[120px]": index === 6,
                        "col-span-3 w-full": index === 6,
                        "relative z-[51]":
                          index === 0 && focusingOn === FocusTargetEnum.Day1,
                      },
                    )}
                  >
                    {/* Claimed */}
                    {day.active && claimedDay && (
                      <div className="absolute top-0 inset-0 bg-overlay/70 z-10 flex flex-col items-center justify-center rounded-lg">
                        <Icon
                          className="text-white text-2xl"
                          icon="lucide:check"
                        />
                        <span className="font-medium">CLAIMED</span>
                      </div>
                    )}

                    {/* Coin animation start */}
                    {day.active && claimedDay && (
                      <>
                        <AnimatePresence>
                          {isAnimating && (
                            <>
                              {renderCoins(CurrencyEnum.SC, "left-[55%]")}
                              {renderCoins(CurrencyEnum.GC, "left-[40%]", 1)}
                            </>
                          )}
                        </AnimatePresence>
                      </>
                    )}

                    {/* Coin animation end */}
                    <div
                      className={cn(
                        `text-xs font-medium mb-2 bg-content2 rounded-md absolute -top-2 left-1/2 -translate-x-1/2 z-[11] px-3 whitespace-nowrap`,
                        {
                          "neon-border": day.active && !claimedDay,
                          "bg-overlay text-default-500 border-transparent border-2":
                            day.active && claimedDay,
                        },
                      )}
                    >
                      DAY {day.day}
                    </div>

                    <div
                      className={cn("h-24 flex items-center justify-center", {
                        "h-20": day.type === "wheel",
                      })}
                    >
                      {day.type === "both" && (
                        <div className="flex flex-col items-center h-full justify-between">
                          <img
                            alt="Day 4"
                            className="w-16 h-16 rounded-full"
                            src={sc1.src}
                          />
                          <span className="font-medium text-platinum min-w-max relative flex flex-col mt-3">
                            {day.rewards.map((reward, index) => (
                              <React.Fragment key={`reward ${index}`}>
                                <span
                                  className={cn(
                                    "flex items-center gap-1 text-sm text-white",
                                    {
                                      "leading-[0.5rem]": index == 0,
                                    },
                                  )}
                                >
                                  <span
                                    className={cn("", {
                                      "text-amber": index === 0,
                                      "text-green-500": index === 1,
                                    })}
                                  >
                                    {index === 0 ? "GC " : "SC "}
                                  </span>

                                  {reward}
                                </span>
                              </React.Fragment>
                            ))}
                          </span>
                        </div>
                      )}

                      {day.type === "special" && (
                        <div className="flex flex-col items-center h-full justify-between w-full -mt-2">
                          <div className="flex items-center gap-1">
                            {[
                              {
                                label: "GC",
                                color: "text-amber",
                                imgSrc: gc1.src,
                                reward: day.rewards[0],
                              },
                              {
                                label: "SC",
                                color: "text-green-500",
                                imgSrc: sc2.src,
                                reward: day.rewards[1],
                              },
                            ].map((item, index) => (
                              <React.Fragment key={item.label}>
                                <div className="flex flex-col items-center">
                                  <img
                                    alt={`Day ${day.day} ${item.label}`}
                                    className={cn("w-[5rem] -mb-1 h-[4.5rem]", {
                                      "w-[6.5rem] -mb-2 mt-1": index === 1,
                                    })}
                                    src={item.imgSrc}
                                  />
                                  <span
                                    className={cn(
                                      "font-medium flex items-center gap-1 mt-3 text-sm text-white",
                                      {
                                        "leading-[0.5rem]": index === 0,
                                      },
                                    )}
                                  >
                                    <span className={item.color}>
                                      {item.label}
                                    </span>
                                    {item.reward}
                                  </span>
                                </div>
                                {index === 0 && (
                                  <span className="text-platinum text-2xl font-bold pl-2">
                                    +
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-center">
              <Button
                className="w-full lg:max-w-xs font-normal text-base bg-btnPrimary text-white "
                color="secondary"
                isDisabled={claimedDay}
                radius="sm"
                size="lg"
                startContent={
                  <Icon className="shrink-0 text-2xl" icon="lucide:gift" />
                }
                variant="solid"
                onPress={handleClaim}
              >
                {claimedDay ? (
                  <>
                    Next Bonus In:{" "}
                    <span className="tabular-nums -ml-2">{timeLeft}</span>
                  </>
                ) : (
                  "Claim Now"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
