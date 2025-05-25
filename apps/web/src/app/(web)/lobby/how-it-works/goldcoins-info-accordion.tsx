"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import React from "react";

export const GoldCoinsInfoAccordion = () => {
  return (
    <Accordion
      className="p-0"
      itemClasses={{
        content: "pt-0",
      }}
      selectionMode="multiple"
    >
      <AccordionItem
        key="what-are-gold-coins"
        aria-label="What are Gold Coins?"
        title={<span className="font-bold">What are Gold Coins?</span>}
      >
        <p className="text-default-600">
          Gold Coins are our virtual entertainment currency designed purely for
          fun and enjoyment. They allow you to access and play all the exciting
          games in our extensive collection without any real-money gambling
          involved.
        </p>
      </AccordionItem>

      <AccordionItem
        key="how-to-obtain"
        aria-label="How to Obtain"
        title={<span className="font-bold">How to Obtain</span>}
      >
        <ul className="list-disc list-inside text-default-600">
          <li>
            <span className="font-bold text-amber">
              Purchase from the VegasBonanza Store:
            </span>{" "}
            Various bundles are available to suit your budget
          </li>
          <li>
            <span className="font-bold text-amber">Daily Login Bonus:</span>{" "}
            Receive free Gold Coins just for checking in each day
          </li>
          <li>
            <span className="font-bold text-amber">Special Promotions:</span>{" "}
            Keep an eye out for limited-time offers and bonuses
          </li>
        </ul>
      </AccordionItem>

      <AccordionItem
        key="what-you-can-do"
        aria-label="What You Can Do With Gold Coins"
        title={
          <span className="font-bold">What You Can Do With Gold Coins</span>
        }
      >
        <ul className="list-disc list-inside text-default-600">
          <li>Access and play all games in our extensive library</li>
          <li>Enjoy longer gameplay sessions</li>
          <li>
            Experience all the excitement and entertainment of casino-style
            games
          </li>
          <li>Compete on leaderboards and track your achievements</li>
        </ul>
      </AccordionItem>

      <AccordionItem
        key="important-to-know"
        aria-label="Important to Know"
        title={<span className="font-bold">Important to Know</span>}
      >
        <ul className="list-disc list-inside text-default-600">
          <li>Gold Coins have no real-world monetary value</li>
          <li>
            Gold Coins cannot be cashed out, withdrawn, or exchanged for real
            money
          </li>
          <li>Gold Coins are for entertainment purposes only</li>
          <li>
            Purchasing Gold Coins does not guarantee winning anything of value
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
};
