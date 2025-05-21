"use client";

import { Card, CardBody } from "@heroui/card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { FC } from "react";

const tiers = [
  {
    title: "VIP Host",
    benefits: [
      "24/7 personal service",
      "Personalized rewards tailored to you",
      "A surprise Welcome Package when you join",
      "Monthly Newsletter",
    ],
  },
  {
    title: "VIP Exclusive Promotions",
    benefits: [
      "Exclusive Coin Boost Deals, promotions and offers",
      "Special surprises for your special occasions",
      "Wall of Fame weekly tournaments",
    ],
  },
  {
    title: "VIP Gifts & Events",
    benefits: [
      "Personalized gifts based on your preferences",
      "Red carpet invitations to VIP events",
      "Unique discounts and gift vouchers",
    ],
  },
];

export const VipClubSection: FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-center md:text-3xl">
        The VIP Club
      </h2>
      <p className="text-sm text-center text-default-600  mb-6">
        Unlock bigger and better benefits with our VIP casino experience.
      </p>
      <ScrollShadow
        className="pb-4 overscroll-x-contain mx-auto"
        hideScrollBar={false}
        orientation="horizontal"
        size={60}
      >
        <div
          className="flex space-x-2 xs:space-x-4 overflow-x-auto pt-2 px-2 py-3 -ml-2 min-[1100px]:justify-center"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4A3078 transparent",
          }}
        >
          {tiers.map((tier, index) => {
            return (
              <div key={`tier ${index}`} className={`flex-shrink-0 w-60`}>
                <Card className="h-full bg-content1 overflow-visible">
                  <CardBody className="p-4 pb-2 flex flex-col items-center border border-divider rounded-large overflow-visible">
                    <h4 className="text-white mb-1">{tier.title}</h4>
                    <div className="flex items-start gap-1 flex-col">
                      {tier.benefits.map((benefit, index) => (
                        <div
                          key={`benefit ${index}`}
                          className="flex items-start gap-2"
                        >
                          <Icon
                            className="text-amber shrink-0"
                            height="26"
                            icon="proicons:checkmark"
                            width="26"
                          />
                          <p className="text-sm text-default-600">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
};
