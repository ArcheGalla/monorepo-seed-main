"use client";

import React, { FC, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useDisclosure } from "@heroui/modal";

import { PaymentModal } from "./payment-modal";
import { CoinPackage } from "./packages";
import { PromotionCard } from "./promotion-card";

const promotions = [
  {
    id: 1,
    price: 9.99,
    goldCoins: 50000,
    sweepstakesCoins: 25,
  },
  {
    id: 2,
    price: 39.99,
    goldCoins: 99000,
    sweepstakesCoins: 49,
  },
  {
    id: 3,
    price: 99.99,
    goldCoins: 149000,
    sweepstakesCoins: 109,
  },
];

export const Promotions: FC = () => {
  // Reference to the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll functions for the navigation arrows
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const paymentModal = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(
    null,
  );

  const handleBuyNow = (pack: CoinPackage) => {
    setSelectedPackage(pack);
    paymentModal.onOpen();
  };

  const handleModalClose = () => {
    paymentModal.onClose();
    setSelectedPackage(null);
  };

  return (
    <>
      <PaymentModal
        coinPackage={selectedPackage}
        isOpen={paymentModal.isOpen}
        onClose={handleModalClose}
      />
      <div className="w-full">
        <div className="mb-2">
          <h2 className="text-lg font-medium flex items-center gap-2">
            Special Promotions
          </h2>
        </div>

        <div className="relative mx-auto">
          {/* Left arrow */}
          <Button
            isIconOnly
            className="hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20 xl:hidden w-8 h-8 min-w-0 "
            radius="full"
            size="lg"
            onPress={scrollLeft}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-left" />
          </Button>
          {/* Right arrow */}
          <Button
            isIconOnly
            className="hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20 xl:hidden  w-8 h-8 min-w-0"
            radius="full"
            size="lg"
            onPress={scrollRight}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-right" />
          </Button>

          <ScrollShadow
            ref={scrollContainerRef}
            hideScrollBar
            className="flex py-6 gap-4 snap-x px-0 overscroll-x-contain"
            orientation="horizontal"
          >
            {promotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                promotion={promo}
                onBuyNow={handleBuyNow}
              />
            ))}
          </ScrollShadow>
        </div>
      </div>
    </>
  );
};
