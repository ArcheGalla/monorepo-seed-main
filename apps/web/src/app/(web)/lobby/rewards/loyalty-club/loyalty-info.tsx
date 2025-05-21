import React, { FC } from "react";
import { Icon } from "@iconify/react";

export const LoyaltyInfo: FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2 text-center md:text-3xl">
        About Our Loyalty Program
      </h2>
      <p className="text-sm text-center text-default-600  mb-6 max-w-2xl mx-auto">
        Our VegasBonanza Loyalty Program is designed to reward our most
        dedicated players with exclusive perks, bonuses, and VIP treatment. As
        you play more, your status increases, unlocking increasingly valuable
        rewards.
      </p>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 xs:gap-4 mb-6">
        {[
          {
            icon: "lucide:award",
            title: "Earn VP",
            description:
              "Earn Vegas Points through GC package purchases and bonuses",
          },
          {
            icon: "lucide:trending-up",
            title: "Level Up",
            description:
              "Advance through tiers from Red to Diamond for better rewards",
          },
          {
            icon: "lucide:gift",
            title: "Claim Rewards",
            description: "Exchange your points for GC, SC, and exclusive perks",
          },
          {
            icon: "lucide:medal",
            title: "VIP Treatment",
            description:
              "Higher tiers receive personal account managers and custom offers",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-content1 p-5 rounded-xl  flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-content3 flex items-center justify-center mb-3">
              <Icon className="text-2xl text-amber" icon={item.icon} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-white">
              {item.title}
            </h3>
            <p className="text-sm text-default-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
