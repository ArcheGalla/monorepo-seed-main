import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

interface PackageData {
  goldCoins: number;
  sweepCoins: number;
  price: number;
  scPrice: number;
  signUpBonusGC: number;
  signUpBonusSC: number;
  popular?: boolean;
}

const packages: PackageData[] = [
  // { goldCoins: 0, sweepCoins: 0, price: 0, scPrice: 0, signUpBonusGC: 50000, signUpBonusSC: 2.5 },
  {
    goldCoins: 45000,
    sweepCoins: 1,
    price: 1.99,
    scPrice: 1.99,
    signUpBonusGC: 95000,
    signUpBonusSC: 3.5,
  },
  {
    goldCoins: 120000,
    sweepCoins: 5,
    price: 4.99,
    scPrice: 0.998,
    signUpBonusGC: 215000,
    signUpBonusSC: 7.5,
  },
  {
    goldCoins: 250000,
    sweepCoins: 12,
    price: 9.99,
    scPrice: 0.8325,
    signUpBonusGC: 465000,
    signUpBonusSC: 14.5,
  },
  {
    goldCoins: 600000,
    sweepCoins: 23,
    price: 19.99,
    scPrice: 0.8691304348,
    signUpBonusGC: 1065000,
    signUpBonusSC: 25.5,
    popular: true,
  },
  {
    goldCoins: 1200000,
    sweepCoins: 55,
    price: 49.99,
    scPrice: 0.9089090909,
    signUpBonusGC: 2265000,
    signUpBonusSC: 57.5,
  },
  {
    goldCoins: 2500000,
    sweepCoins: 107,
    price: 99.99,
    scPrice: 0.9344859813,
    signUpBonusGC: 4765000,
    signUpBonusSC: 109.5,
  },
];

interface PackagesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const PackagesModal: React.FC<PackagesModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
}) => {
  return (
    <Modal
      className="lg:items-start md:max-w-2xl"
      classNames={{
        wrapper: "lg:items-start",
      }}
      isOpen={isOpen}
      scrollBehavior="outside"
      size="sm"
      // size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center justify-center w-full mx-auto">
          <h2
            // className="text-2xl font-bold text-center"
            className="text-2xl font-bold text-center bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent flex gap-2"
          >
            <img alt="Coin" className="w-8 h-8" src={gcCoin.src} />
            Buy Gold Coin Package
          </h2>
        </ModalHeader>

        <ModalBody className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center  py-4">
            {/* <ScrollShadow
            hideScrollBar
            // className="flex  lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8 max-w-screen-2xl:grid-cols-7"
            className="flex py-2 px-1 md:grid md:grid-cols-2 gap-4 justify-center items-center md:py-4"
            orientation="horizontal"
          > */}
            {packages.map((pack, index) => (
              <Card
                key={`card ${index}`}
                className={`overflow-visible w-full bg-plumDark min-w-[278px] ${pack?.popular ? "neon-border" : "border-midnight border-2"}`}
                // className={`overflow-visible w-full bg-plumDark min-w-[278px] ${pack?.popular ? "neon-border" : "border-midnight border-2"}`}
                // shadow="lg"
              >
                <CardBody className="p-6 overflow-visible">
                  {pack?.popular && (
                    <div className="bg-magenta card-glow text-white text-center text-xs font-bold py-1 px-3 rounded-full absolute -top-2.5 left-1/2 transform -translate-x-1/2">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold">${pack.price}</h3>
                  </div>

                  <div className="mb-6 flex flex-col gap-3 items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <img
                          alt="GC Coin"
                          className="w-8 h-8"
                          src={gcCoin.src}
                        />
                        <span className="font-bold text-lg">
                          {formatNumber(pack.goldCoins)} Gold Coins
                        </span>
                      </div>
                      {/* <div className="flex items-center gap-1 text-sm text-primary-500 pl-2">
                        <Icon icon="lucide:plus" className="text-sm" />
                        <span>{formatNumber(pack.signUpBonusGC)} Bonus Gold Coins</span>
                      </div> */}
                    </div>

                    <div className="flex items-center justify-center gap-2 border-green-500 emerald-card-glow bg-green-900/80 p-2 pr-4 border-2 rounded-full w-fit mx-auto">
                      <Icon
                        className="text-xl text-green-500"
                        icon="lucide:plus"
                      />
                      <div className="flex items-center gap-2.5">
                        <img
                          alt="SC Coin"
                          className="w-6 h-6"
                          src={scCoin.src}
                        />
                        <div className="space-y-0.5">
                          <h3 className="text-lg font-bold text-white">
                            {pack.sweepCoins} Sweepstakes
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 hidden">
                      <div className="flex items-center gap-2">
                        <img
                          alt="SC Coin"
                          className="w-8 h-8"
                          src={scCoin.src}
                        />
                        <span className="font-bold text-lg">
                          {pack.sweepCoins} Sweepstakes
                        </span>
                      </div>
                      {/* <div className="flex items-center gap-1 pl-2 text-sm text-primary-500">
                        <Icon icon="lucide:plus" className="text-sm" />
                        <span>{pack.signUpBonusSC.toFixed(1)} Bonus Sweepstakes</span>
                      </div> */}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-auto font-bold bg-magenta card-glow"
                    size="lg"
                    variant="solid"
                  >
                    BUY NOW
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
