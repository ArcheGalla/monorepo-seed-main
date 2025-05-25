"use client";

import React, { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { AnimatePresence } from "framer-motion";
import { cn } from "@heroui/theme";

import gc1 from "@/assets/gc1.webp";
import sc1 from "@/assets/sc2.webp";
import { CurrencyEnum } from "@/types/currency";
import { useCoinAnimation } from "@/modules/hooks/use-coin-animation";

interface WelcomeBonusModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClaimBonus: () => void;
}

export const WelcomeBonusModal: FC<WelcomeBonusModalProps> = ({
  isOpen,
  onOpenChange,
  onClaimBonus,
}) => {
  const { isAnimating, handleCollectCoins, renderCoins } = useCoinAnimation({});

  return (
    <Modal
      hideCloseButton
      className="overflow-visible "
      classNames={{
        backdrop: "bg-overlay/80",
        body: "!pt-0 pb-3",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isDismissable={!isAnimating}
      isOpen={isOpen}
      size="sm"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center pt-7">
              <h2 className="text-2xl font-bold text-center relative">
                Claim Your Welcome Bonus
              </h2>
            </ModalHeader>

            <ModalBody className="p-4 pb-3">
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-1">
                  {[
                    {
                      label: "GOLD COINS",
                      color: "text-amber",
                      imgSrc: gc1.src,
                      reward: 100000,
                    },
                    {
                      label: "SWEEP COINS",
                      color: "text-green-500",
                      imgSrc: sc1.src,
                      reward: 2,
                    },
                  ].map((item, index) => (
                    <React.Fragment key={item.label}>
                      <div className="flex flex-col items-center">
                        <img
                          alt={`reward ${index}`}
                          className={cn("w-[5rem] -mb-1 h-[4.5rem]", {
                            "w-[6.5rem] -mb-2 mt-1": index === 1,
                          })}
                          src={item.imgSrc}
                        />
                        <span
                          className={cn(
                            "font-medium flex items-center gap-1 mt-3 text-sm text-white ",
                          )}
                        >
                          <span className={item.color}>{item.label}</span>
                          {index === 0
                            ? Number(item.reward).toLocaleString()
                            : item.reward}
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

                <AnimatePresence>
                  {isAnimating && (
                    <>
                      {renderCoins(CurrencyEnum.SC, "left-[55%]")}
                      {renderCoins(CurrencyEnum.GC, "left-[40%]", 1)}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-center p-4">
              <Button
                className="w-full font-normal text-base bg-btnPrimary"
                color="secondary"
                radius="sm"
                size="lg"
                variant="solid"
                onPress={() => {
                  onClaimBonus();
                  handleCollectCoins();
                }}
              >
                Collect Gift
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
