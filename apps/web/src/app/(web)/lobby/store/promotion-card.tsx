"use client";

import React, { FC } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

import { CoinPackage } from "./packages";

import sc1 from "@/assets/sc1.webp";

interface PromotionData {
  id: number;
  price: number;
  goldCoins: number;
  sweepstakesCoins: number;
}

interface PromotionCardProps {
  promotion: PromotionData;
  onBuyNow: (pack: CoinPackage) => void;
}

export const PromotionCard: FC<PromotionCardProps> = ({
  promotion,
  onBuyNow,
}) => {
  return (
    <div className="w-full flex-shrink-0 py-1 snap-center max-w-[220px]">
      <Card
        disableRipple
        className="h-full overflow-visible bg-content2 bg-opacity-70 p-0"
        radius="lg"
        shadow="md"
      >
        <CardBody className="p-0 overflow-visible">
          <div className="relative p-3 flex flex-col h-full justify-between">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <img
                  alt="SC Coin"
                  className="w-24 h-20 absolute left-1/2 -translate-x-1/2 -top-10 flex items-center justify-center"
                  src={sc1.src}
                />
              </div>

              <div className="flex items-center justify-center gap-1 mt-10">
                <p className="font-medium text-sm text-center ">
                  <span className="text-amber mr-1">GC</span>
                  {Number(promotion.goldCoins).toLocaleString()}
                </p>
                <div className="  flex text-sm items-center gap-0.5 w-fit  rounded-md">
                  <span className="text-green-500 text-sm">+</span>
                  <span className="flex text-sm gap-1 font-medium text-green-500">
                    FREE SC{" "}
                    <span className="text-white">
                      {promotion.sweepstakesCoins}
                    </span>{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-auto relative">
              <Button
                className="text-white font-normal text-sm shadow-md bg-btnPrimary w-full h-10 rounded-small flex gap-1"
                size="md"
                onPress={() => onBuyNow(promotion)}
              >
                <span className="text-xs line-through text-rose-950 font-normal -mb-0.5">
                  $15.99
                </span>
                <span>${promotion.price}</span>
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
