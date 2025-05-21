"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import React from "react";

export const SweepstakesInfoAccordion = () => {
  return (
    <Accordion
      className="p-0"
      itemClasses={{
        content: "pt-0",
      }}
      selectionMode="multiple"
    >
      <AccordionItem
        key="what-are-sweepstakes-coins"
        aria-label="What are Sweepstakes Coins?"
        title={<span className="font-bold">What are Sweepstakes Coins?</span>}
      >
        <p className="text-default-600">
          Sweepstakes Coins are our special virtual tokens that represent
          entries into the VegasBonanza Sweepstakes promotion. They provide a
          completely free way to play our games and potentially win exciting
          rewards.
        </p>
      </AccordionItem>
      <AccordionItem
        key="how-to-get-sweepstakes-coins"
        aria-label="How to Get Sweepstakes Coins"
        title={<span className="font-bold">How to Get Sweepstakes Coins</span>}
      >
        <ul className="list-disc list-inside text-default-600">
          <li>
            <span className="font-bold text-green-500">
              Free with Gold Coins Bundles:
            </span>{" "}
            Receive complimentary Sweepstakes Coins when you purchase Gold Coins
          </li>
          <li>
            <span className="font-bold text-green-500">Mail-In Request:</span>{" "}
            Send a self-addressed stamped envelope to receive free Sweepstakes
            Coins (details in our Terms & Conditions)
          </li>
          <li>
            <span className="font-bold text-green-500">
              Social Media Giveaways:
            </span>{" "}
            Follow us for opportunities to win free Sweepstakes Coins
          </li>
          <li>
            <span className="font-bold text-green-500">Daily Login Bonus:</span>{" "}
            Receive a small amount of free Sweepstakes Coins daily
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem
        key="what-you-can-do-with-sweepstakes"
        aria-label="What You Can Do With Sweepstakes Coins"
        title={
          <span className="font-bold">
            What You Can Do With Sweepstakes Coins
          </span>
        }
      >
        <ul className="list-disc list-inside text-default-600">
          <li>Play games in Sweepstakes Coins Mode</li>
          <li>Each game played represents an entry into our sweepstakes</li>
          <li>
            Accumulate potential rewards that can be redeemed according to our
            redemption policy
          </li>
          <li>
            Enjoy the full VegasBonanza experience without making a purchase
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem
        key="important-legal-information"
        aria-label="Important Legal Information"
        title={<span className="font-bold">Important Legal Information</span>}
      >
        <ul className="list-disc list-inside text-default-600">
          <li>Sweepstakes Coins have no monetary value</li>
          <li>Sweepstakes Coins CANNOT be purchased directly</li>
          <li>
            NO PURCHASE OR PAYMENT IS NECESSARY to participate in Sweepstakes
            Coins Mode
          </li>
          <li>Sweepstakes Coins are void where prohibited by law</li>
          <li>
            Must be 18+ (or legal age in your jurisdiction) to participate
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
};
