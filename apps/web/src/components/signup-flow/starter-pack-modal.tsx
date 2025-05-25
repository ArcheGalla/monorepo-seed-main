import React, { FC } from "react";
import { Modal, ModalContent, ModalBody, ModalFooter } from "@heroui/modal";
import { cn } from "@heroui/theme";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import sc1 from "@/assets/sc1.webp";
import { formatNumber, formatPrice } from "@/utils/helper/value-format";

const offerPack = {
  oldPrice: 1599,
  newPrice: 999,
  gcCoinAmount: 50000,
  scCoinAmount: 19,
};

interface StarterPackModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

export const StarterPackModal: FC<StarterPackModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  return (
    <Modal
      className="lg:items-center"
      classNames={{
        body: "px-2 py-0",
        wrapper: "lg:items-center",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isOpen={isOpen}
      size="md"
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody className="w-full">
              <h2 className="text-2xl font-bold text-center max-w-[261px] mt-12 mx-auto">
                Triple Your Coins -{" "}
                <span className="bg-gradient-to-r from-[#ff0e87] to-[#0ec7ff] bg-clip-text text-transparent">
                  Get 200% Extra Coins
                </span>
              </h2>

              <div className="absolute rotate-[-42deg] bg-green-600 pt-16 px-10 min-w-[200px] text-center font-bold text-lg -left-20 -top-10 pb-2 leading-5">
                MEGA
                <br /> OFFER
              </div>

              <img
                alt={`reward`}
                className={cn(" mx-auto w-[10rem] -mb-1", {})}
                src={sc1.src}
              />
              <div className="flex flex-col w-fit  items-left text-2xl space-y-0 pt-4 mx-auto">
                <div className="font-medium flex gap-1">
                  <span className="text-amber">GC</span>
                  <span>{formatNumber(offerPack.gcCoinAmount)}</span>
                </div>
                <div className="font-medium flex gap-1 -ml-[1.3rem]">
                  <span className="text-green-500">+ SC </span>
                  <span>{offerPack.scCoinAmount} FOR FREE</span>
                </div>
              </div>

              <div className="px-2 py-1 z-[1] bg-content2 rounded-full border-2 border-divider text-sm rotate-[-15deg] w-fit mt-2">
                <div>{formatPrice(offerPack.oldPrice)}</div>
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 rotate-[-20deg] bg-red-500" />
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center flex-col p-4 relative">
              <Button
                className="w-full font-normal text-base bg-btnPrimary"
                color="secondary"
                radius="sm"
                size="lg"
                variant="solid"
                onPress={() => {
                  onClose();
                }}
              >
                Buy Now {formatPrice(offerPack.newPrice)}
              </Button>
              <p className="text-sm text-default-600 text-center">
                18+. No purchase necessary. Void where prohibited.{" "}
                <Link className="text-sm underline text-white">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="text-sm underline text-white">
                  Sweepstakes rules
                </Link>{" "}
                apply.
              </p>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
