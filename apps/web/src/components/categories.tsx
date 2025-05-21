"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Button } from "@heroui/button";

const categories = [
  [
    { name: "Slots", icon: "lucide:dices" },
    { name: "Ruby Play", icon: "codicon:ruby" },
  ],
  [
    { name: "Jackpots", icon: "lucide:trophy" },
    { name: "Poker", icon: "lucide:club" },
  ],
  [
    { name: "Blackjack", icon: "lucide:spade" },
    { name: "Bonus Buy", icon: "lucide:gift" },
  ],
  [
    { name: "New Releases", icon: "lucide:sparkles" },
    { name: "Table Games", icon: "lucide:table" },
  ],
  [
    { name: "Baccarat", icon: "lucide:diamond" },
    { name: "Roulette", icon: "lucide:circle-dot" },
  ],
  [
    { name: "Slingo", icon: "lucide:puzzle" },
    { name: "Megaways", icon: "lucide:infinity" },
  ],
  [
    { name: "Hold and Win", icon: "lucide:hand" },
    { name: "Classic Games", icon: "lucide:history" },
  ],
  [
    { name: "Booming Games", icon: "lucide:rocket" },
    { name: "Instant Win", icon: "lucide:zap" },
  ],
];

const categories2 = [
  { name: "Slots", icon: "lucide:dices" },
  { name: "Ruby Play", icon: "codicon:ruby" },
  { name: "New Releases", icon: "lucide:sparkles" },
  { name: "Poker", icon: "lucide:club" },
  { name: "Bonus Buy", icon: "lucide:gift" },
  { name: "Table Games", icon: "lucide:table" },
  { name: "Blackjack", icon: "lucide:spade" },
  { name: "Baccarat", icon: "lucide:diamond" },
  { name: "Roulette", icon: "lucide:circle-dot" },
  { name: "Jackpots", icon: "lucide:trophy" },
  { name: "Slingo", icon: "lucide:puzzle" },
  { name: "Megaways", icon: "lucide:infinity" },
  { name: "Hold and Win", icon: "lucide:hand" },
  { name: "Classic Games", icon: "lucide:history" },
  { name: "Instant Win", icon: "lucide:zap" },
];

export const Categories = () => {
  // Reference to the scrollable container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll functions for the navigation arrows
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black lg:container py-4 mb-8 pt-16 px-4 lg:mx-auto">
      <div className="mx-auto text-center lg:mb-10">
        <h2 className="mx-auto text-3xl container md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="">Categories</span>
        </h2>
      </div>

      <div className="relative mx-auto">
        {/* Left arrow */}
        <Button
          isIconOnly
          // className="absolute -left-2 bg-transparent top-1/2 -translate-y-1/2 z-10 lg:hidden w-8 h-8 min-w-0 "
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20 lg:hidden w-8 h-8 min-w-0 hidden "
          radius="full"
          size="lg"
          onPress={scrollLeft}
        >
          <Icon className="text-white text-xl" icon="lucide:chevron-left" />
        </Button>
        {/* Right arrow */}
        <Button
          isIconOnly
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20  lg:hidden  w-8 h-8 min-w-0 hidden"
          // className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-transparent lg:hidden  w-8 h-8 min-w-0"
          radius="full"
          size="lg"
          onPress={scrollRight}
        >
          <Icon className="text-white text-xl" icon="lucide:chevron-right" />
        </Button>

        <ScrollShadow
          ref={scrollContainerRef}
          hideScrollBar
          className="py-2 grid grid-cols-2 gap-4 items-start justify-start lg:grid-cols-4 xl:grid-cols-5 lg:gap-8 max-w-screen-2xl:grid-cols-7"
          orientation="horizontal"
        >
          {categories.map((categoryPair, index) => (
            <div
              key={`pair ${index}`}
              className="flex lg:hidden flex-col gap-4"
            >
              {categoryPair.map((category, index) => (
                <div key={`pair card ${index}`}>
                  <Card
                    key={index}
                    className="neon-border bg-content3 transition-colors min-w-[120px] xs:min-w-[160px] rounded-medium min-h-20 bg-opacity-60 group lg:max-w-[220px] h-[70px] overflow-hidden mx-auto w-full"
                  >
                    <CardBody className="flex flex-row items-center gap-0 p-4 justify-start overflow-hidden">
                      <Icon
                        className="text-default-600 shrink-0 h-6 w-6 mr-2 group-hover:text-white transition-colors"
                        icon={category.icon}
                      />
                      <span className="text-white font-medium text-left uppercase ">
                        {category.name}
                      </span>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          ))}
          {categories2.map((category, index) => (
            <Card
              key={`categry ${index}`}
              className="neon-border bg-content3 transition-colors min-w-[160px] rounded-medium min-h-20 bg-opacity-60 group lg:max-w-[220px] h-[70px] overflow-hidden mx-auto w-full hidden lg:flex"
            >
              <CardBody className="flex flex-row items-center gap-0 p-4 justify-center overflow-hidden">
                <Icon
                  className="text-default-500 shrink-0 h-6 w-6 mr-2 group-hover:text-white transition-colors"
                  icon={category.icon}
                />
                <span className="text-white font-medium text-center uppercase">
                  {category.name}
                </span>
              </CardBody>
            </Card>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
};
