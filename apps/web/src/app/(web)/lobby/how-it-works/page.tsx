import { Card, CardBody } from "@heroui/card";

import { HowItWorksTable } from "./how-it-works-table";
import { HowItWorksFAQ } from "./how-it-works-faq";
import { SweepstakesInfoAccordion } from "./sweepstakes-info-accordion";
import { GoldCoinsInfoAccordion } from "./goldcoins-info-accordion";

import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

export default function HowItWorksPage() {
  return (
    <div className="flex-1 relative z-10 flex-col flex-grow flex items-center justify-center w-full py-10 h-full">
      <div className="flex-1 w-full p-4 max-w-screen-lg">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4">
            How to Play VegasBonanza
          </h1>
          <p className="text-sm sm:text-base text-default-600 max-w-2xl mx-auto">
            VegasBonanza uses two virtual currencies:{" "}
            <span className="font-semibold text-amber">Gold Coins (GC)</span>,
            used for entertainment and not redeemable for prizes, and{" "}
            <span className="font-semibold text-green-500">
              Sweepstakes Coins (SC)
            </span>
            , which can be used to play games and may be redeemed for prizes
            where eligible.
          </p>
        </div>

        {/* Game Modes Comparison */}
        <Card className="mb-12 bg-transparent p-0 shadow-none">
          <CardBody className="px-0">
            <h2 className="text-2xl font-bold mb-4">Game Modes at a Glance</h2>
            <HowItWorksTable />
          </CardBody>
        </Card>

        {/* Game Modes Details */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12 items-start">
          {/* Gold Coins Mode */}
          <Card className="bg-content1 scroll-mt-24" id="gc-faq">
            <CardBody className="px-6 pt-5 pb-2  overflow-hidden">
              <div className="flex items-center gap-2 mb-2 lg:mb-4">
                <img
                  alt="GC Coin"
                  className="w-6 h-6 lg:w-10 lg:h-10"
                  src={gcCoin.src}
                />
                <h2 className="text-lg lg:text-2xl font-bold text-amber">
                  Gold Coins Mode
                </h2>
              </div>
              <GoldCoinsInfoAccordion />
            </CardBody>
          </Card>

          {/* Sweepstakes Mode */}
          <Card className="bg-content1 scroll-mt-24" id="sc-faq">
            <CardBody className="px-6 pt-5 pb-2 overflow-hidden">
              <div className="flex items-center gap-2 mb-2 lg:mb-4">
                <img
                  alt="SC Coin"
                  className="w-6 h-6 lg:w-10 lg:h-10"
                  src={scCoin.src}
                />
                <h2 className="text-lg lg:text-2xl font-bold text-green-500">
                  Sweepstakes Coins Mode
                </h2>
              </div>
              <SweepstakesInfoAccordion />
            </CardBody>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-12 bg-transparent p-0 shadow-none">
          <CardBody className="px-0">
            <h2 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="bg-content1 rounded-xl px-3 overflow-hidden">
              <HowItWorksFAQ />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
