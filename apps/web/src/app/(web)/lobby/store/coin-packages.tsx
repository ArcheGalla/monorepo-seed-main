"use client";

import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "@heroui/tooltip";
import { useDisclosure } from "@heroui/modal";

import { PaymentModal } from "./payment-modal";
import { CoinPackage, coinPackages } from "./packages";
import { CoinPackageCard } from "./coin-package-card";

export const CoinPackages: FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(
    null,
  );
  const paymentModal = useDisclosure();

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

      <div className="mb-4 flex flex-row justify-between max-w-[930px]">
        <h2 className="text-lg font-medium flex items-center gap-2">
          Gold Coin Packages{" "}
        </h2>

        <div className="flex gap-3 mt-2 lg:mt-0 flex-col text-default-600">
          <Tooltip
            className="max-w-[300px]"
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos consequuntur aliquam praesentium porro sed nesciunt."
          >
            <span className="flex text-sm gap-1 items-center text-inherit hover:underline">
              What are SCs? <Icon className="" icon="material-symbols:info" />
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col space-y-6 max-w-[932px]">
        {coinPackages.map((pkg) => (
          <CoinPackageCard
            key={pkg.id}
            coinPackage={pkg}
            onBuyNow={handleBuyNow}
          />
        ))}
      </div>
    </>
  );
};
