"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";

export const HowItWorksFAQ = () => {
  return (
    <Accordion
      itemClasses={{
        content: "text-default-600 ",
      }}
      selectionMode="multiple"
    >
      <AccordionItem
        key="1"
        title="Can I convert Gold Coins to Sweepstakes Coins?"
      >
        No, the two currencies operate independently and cannot be converted
        between each other.
      </AccordionItem>
      <AccordionItem
        key="2"
        title="Do I need to spend money to play at VegasBonanza?"
      >
        No! While you can purchase Gold Coins for entertainment, our Sweepstakes
        Coins Mode is completely free to play with multiple ways to obtain
        Sweepstakes Coins without spending money.
      </AccordionItem>
      <AccordionItem key="3" title="How do I know which mode I'm playing in?">
        The game interface clearly displays which currency you&apos;re using at
        all times. You can easily switch between modes using the toggle at the
        top of the screen.
      </AccordionItem>
      <AccordionItem key="4" title="Are these real gambling games?">
        No. VegasBonanza is not gambling. We offer social games for
        entertainment purposes only. No real money can be wagered or won through
        direct gameplay.
      </AccordionItem>
    </Accordion>
  );
};
