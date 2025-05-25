import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { LoyaltyInfo } from "./loyalty-info";
import { TierProgressStepper } from "./tier-progress-stepper";
import { FaqRewards } from "./faq-rewards";
import { VipClubSection } from "./vip-club-section";

export default function LoyaltyClubPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4 w-full mb-10 pt-4 md:pt-14">
        <div className="text-center mb-4">
          <div className="flex w-full items-center gap-1.5 mb-4 -ml-2.5 md:justify-between md:ml-0">
            <Button
              isIconOnly
              as={Link}
              className="p-0"
              href="/lobby/rewards"
              variant="light"
            >
              <Icon height="20" icon="formkit:arrowleft" width="20" />
            </Button>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-start">
              Loyalty Club
            </h1>
            <div className="hidden md:block w-10" />
          </div>

          <p className="text-sm text-default-600 max-w-2xl mx-auto">
            Play games with your Gold Coins to climb up.
          </p>
        </div>

        <TierProgressStepper />
        <LoyaltyInfo />
        <VipClubSection />
        <FaqRewards />
      </div>
    </>
  );
}
