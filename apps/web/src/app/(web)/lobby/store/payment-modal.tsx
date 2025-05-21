"use client";

import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { AnimatePresence } from "framer-motion";

import { CoinPackage } from "./packages";

import { CurrencyEnum } from "@/types/currency";
import { useUserStore } from "@/store/useUserStore";
import { useAppStore } from "@/store/useAppStore";
import { useCoinAnimation } from "@/modules/hooks/use-coin-animation";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  coinPackage: CoinPackage | null;
}

export const PaymentModal: FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  coinPackage,
}) => {
  const { wallet, setWallet } = useUserStore();
  const { setIsAnimatingWallet } = useAppStore();

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";

    return num.toLocaleString();
  };

  const handleSubmit = () => {
    if (!coinPackage) return;

    handleCollectCoins();

    setTimeout(() => {
      setWallet({
        gc: wallet.gc + coinPackage?.goldCoins,
        sc: wallet.sc + coinPackage?.sweepstakesCoins,
      });
    }, 1500);

    setIsAnimatingWallet(true);

    setTimeout(() => {
      onClose();
      setIsAnimatingWallet(false);
      setIsAnimating(false);
    }, 4000);
  };

  const handleClose = () => {
    onClose();
    setIsAnimatingWallet(false);
    setIsAnimating(false);
  };

  // Coin animation
  const { isAnimating, setIsAnimating, handleCollectCoins, renderCoins } =
    useCoinAnimation({
      coinSize: '"w-8 h-8',
    });

  if (!coinPackage) return null;

  const { goldCoins, sweepstakesCoins, price } = coinPackage;

  return (
    <>
      <Modal
        className="overflow-visible"
        classNames={{
          backdrop: "bg-overlay/80",
          closeButton: "h-10 w-10 flex items-center justify-center",
        }}
        isDismissable={!isAnimating}
        isOpen={isOpen}
        size="md"
        onClose={handleClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 border-b border-divider">
            Order Summary
          </ModalHeader>
          <ModalBody className="py-4">
            <AnimatePresence>
              {isAnimating && (
                <>
                  {renderCoins(CurrencyEnum.SC, "left-[55%]")}
                  {renderCoins(CurrencyEnum.GC, "left-[40%]", 1)}
                </>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="bg-content3 bg-opacity-40 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center ">
                    <span className="font-medium text-amber">Gold Coins:</span>
                    <span className="font-medium">
                      {formatNumber(goldCoins)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-divider">
                    <span className="font-medium text-green-500">
                      FREE Sweep Coins:
                    </span>
                    <span className="font-medium">{sweepstakesCoins}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 mt-2">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                      {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Payment Method</h4>

                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full px-4 bg-white border-divider flex items-center justify-center [&>svg]:max-w-20"
                    radius="sm"
                    onPress={handleSubmit}
                  >
                    <Icon
                      className="text-black shrink-0"
                      height="50"
                      icon="lineicons:apple-pay"
                      width="100"
                    />
                  </Button>
                  <Button
                    className="w-full py-1 px-4 bg-yellow-500 border-divider flex items-center justify-center  !gap-0"
                    radius="sm"
                    onPress={handleSubmit}
                  >
                    <Icon
                      className="text-blue-600"
                      height="40"
                      icon="ic:baseline-paypal"
                      width="40"
                    />
                    <span className="font-semibold  text-lg text-blue-600">
                      PayPal
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
