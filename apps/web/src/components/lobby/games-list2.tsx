"use client";

import React, { useState } from "react";
import { Card } from "@heroui/card";
import { Icon } from "@iconify/react";
import { ScrollShadow } from "@heroui/scroll-shadow";

import { games } from "../game-showcase";

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

export const GamesList2 = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories2[0].name);

  const renderGameCard = (game: (typeof games)[0]) => (
    <Card
      key={game.id}
      disableRipple
      isPressable
      className="overflow-hidden justify-between mx-auto w-full min-w-[100px] max-w-[234px] md:min-w-[170px] bg-transparent shadow-none"
    >
      <div className="relative">
        <img
          alt={game.name}
          className="w-full h-52 lg:h-64 object-cover py-[2px] px-[2px] rounded-[14px]"
          src={game.image}
        />
        <div className="absolute top-0 right-0 flex gap-1 flex-col items-end p-2">
          {game.isHot && (
            <span className="bg-gradient-casino text-white text-xs py-1 px-2 rounded-full ml-auto">
              HOT
            </span>
          )}
          {game.isNew && (
            <span className="bg-magenta text-white text-xs py-1 px-2 rounded-full">
              NEW
            </span>
          )}
        </div>
      </div>
      <div className="px-4 py-3 w-full hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1.5" />
            <Icon className="text-platinum mr-1" icon="lucide:users" />
            <span className="text-sm text-platinum">
              {game.players} playing
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-[1140px]:w-[93%] mx-auto">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Category</h3>
      </div>

      <ScrollShadow
        hideScrollBar
        className="py-2 mb-8 gap-1 sm:gap-2 items-start justify-start overscroll-x-contain grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1590px]:grid-cols-6"
        orientation="horizontal"
      >
        {games.map((game, index) => (
          <div key={`game ${index}`} className="">
            {renderGameCard(game)}
          </div>
        ))}
      </ScrollShadow>
    </div>
  );
};
