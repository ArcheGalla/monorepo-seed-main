"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/modal";
import React, { useEffect } from "react";

import animal1 from "@/assets/VB_Web_Bonus150_Panda.webp";
// import animal1 from "@/assets/VB_Web_Bonus150_Tiger.webp";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage";

export const OfferModal = () => {
  const offerModal = useDisclosure();

  // Show popup after 15 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const hasSeenModal = localStorage.getItem(
        LOCAL_STORAGE_KEYS.HasSeenMainPageOfferModal,
      );

      if (hasSeenModal) return;
      offerModal.onOpen();
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.HasSeenMainPageOfferModal,
        "true",
      );
    }, 15000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <Modal
      className="overflow-visible sm:max-w-[24rem]"
      classNames={{
        body: "py-3",
        backdrop: "bg-overlay/80",
        closeButton: "h-10 w-10 flex items-center justify-center",
      }}
      isOpen={offerModal.isOpen}
      size="md"
      onOpenChange={offerModal.onOpenChange}
    >
      <ModalContent>
        {() => (
          <ModalBody className="p-4">
            <div className="flex flex-col items-center gap-3">
              <Image
                removeWrapper
                alt="fox"
                className="w-[200px] h-[200px] object-cover -mt-16"
                src={animal1.src}
              />

              <div className="text-center">
                <h2 className="text-2xl font-bold">Join Now to Get </h2>
                <p className="text-2xl font-bold text-[#4eff32]">
                  150% Bonus Coins
                </p>
                <p className="my-4 text-default-600">
                  Big Vegas Style Wins Waiting for You
                </p>
              </div>

              <div className="w-full space-y-3">
                <Button
                  className="w-full bg-btnPrimary text-white font-medium h-12 text-base"
                  radius="sm"
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
