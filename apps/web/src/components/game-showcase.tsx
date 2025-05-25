"use client";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { ScrollShadow } from "@heroui/scroll-shadow";

import game1 from "@/assets/game-banners-2/ThumbnailWeb(600x900).webp";
import game2 from "@/assets/game-banners-2/5_Wild_Buffalo_2_Thumbnail_600_900px.webp";
import game3 from "@/assets/game-banners-2/Donkey&theGoats-Thumbnail-600x900px.webp";
import game4 from "@/assets/game-banners-2/RG_EpicJoker_Thumbnail_600x900_a.webp";
import game13 from "@/assets/game-banners-2/4_Fantastic_Fish_Gold_Thumbnail_DD_600_900px.webp";
import game6 from "@/assets/game-banners-2/Thumbnail_F_L_Temple_Rush_600x900_DD.webp";
import game7 from "@/assets/game-banners-2/Thumbnail_Fang'sInferno_600x900.webp";
import game8 from "@/assets/game-banners-2/Thumbnail_Four_3Bears_600x900.webp";
import game9 from "@/assets/game-banners-2/Thumbnail_Quackin'_Reels_600x900.webp";
import game10 from "@/assets/game-banners-2/Thumbnailincludinggamelogo600X900.webp";
import game11 from "@/assets/game-banners-2/pop2_banners_and_thumbnailsThumbnailLarge(600x900).webp";
import game12 from "@/assets/game-banners-2/thumbnail_BonanzaFalls_600x900 (1).webp";
import game5 from "@/assets/game-banners-2/thumbnail_BonanzaFalls_600x900.webp";
import game14 from "@/assets/game-banners-2/thumbnail_GoldenGooseMegaways_600x900.webp";
import game15 from "@/assets/game-banners-2/thumbnail_VegasRush_600x900.webp";

export const games = [
  {
    id: 1,
    name: "3 Wild Jokers",
    category: "slots",
    image: game1.src,
    isNew: false,
    isHot: true,
    players: 1245,
  },
  {
    id: 2,
    name: "Buffalo Power Megaways",
    category: "slots",
    image: game2.src,
    isNew: true,
    isHot: false,
    players: 1876,
  },
  {
    id: 3,
    name: "Diamond Strike",
    category: "jackpots",
    image: game3.src,
    isNew: false,
    isHot: false,
    players: 954,
  },
  {
    id: 4,
    name: "Epic Joker",
    category: "slots",
    image: game4.src,
    isNew: false,
    isHot: true,
    players: 1532,
  },
  {
    id: 5,
    name: "Gold Train",
    category: "slots",
    image: game5.src,
    isNew: false,
    isHot: false,
    players: 876,
  },
  {
    id: 6,
    name: "Hot Mania",
    category: "slots",
    image: game6.src,
    isNew: true,
    isHot: true,
    players: 2145,
  },
  {
    id: 7,
    name: "Hot Triple Sevens",
    category: "jackpots",
    image: game7.src,
    isNew: false,
    isHot: true,
    players: 1654,
  },
  {
    id: 8,
    name: "Ice Mania",
    category: "slots",
    image: game8.src,
    isNew: true,
    isHot: false,
    players: 1123,
  },
  {
    id: 9,
    name: "Irish Reels",
    category: "slots",
    image: game9.src,
    isNew: false,
    isHot: false,
    players: 987,
  },
  {
    id: 10,
    name: "Unlimited Wishes",
    category: "jackpots",
    image: game10.src,
    isNew: true,
    isHot: false,
    players: 2354,
  },
  {
    id: 11,
    name: "Lucky Sevens",
    category: "slots",
    image: game11.src,
    isNew: false,
    isHot: true,
    players: 1432,
  },
  {
    id: 12,
    name: "Golden Fortune",
    category: "jackpots",
    image: game12.src,
    isNew: true,
    isHot: false,
    players: 1765,
  },
  {
    id: 13,
    name: "3 Wild Jokers",
    category: "slots",
    image: game13.src,
    isNew: false,
    isHot: true,
    players: 1245,
  },
  {
    id: 14,
    name: "Buffalo Power Megaways",
    category: "slots",
    image: game14.src,
    isNew: true,
    isHot: false,
    players: 1876,
  },
  {
    id: 15,
    name: "Diamond Strike",
    category: "jackpots",
    image: game15.src,
    isNew: false,
    isHot: false,
    players: 954,
  },
];

export const games2 = [
  [
    {
      id: 1,
      name: "3 Wild Jokers",
      category: "slots",
      image: game1.src,
      isNew: false,
      isHot: true,
      players: 1245,
    },
    {
      id: 2,
      name: "Buffalo Power Megaways",
      category: "slots",
      image: game2.src,
      isNew: true,
      isHot: false,
      players: 1876,
    },
  ],
  [
    {
      id: 3,
      name: "Diamond Strike",
      category: "jackpots",
      image: game3.src,
      isNew: false,
      isHot: false,
      players: 954,
    },
    {
      id: 4,
      name: "Epic Joker",
      category: "slots",
      image: game4.src,
      isNew: false,
      isHot: true,
      players: 1532,
    },
  ],
  [
    {
      id: 5,
      name: "Gold Train",
      category: "slots",
      image: game5.src,
      isNew: false,
      isHot: false,
      players: 876,
    },
    {
      id: 6,
      name: "Hot Mania",
      category: "slots",
      image: game6.src,
      isNew: true,
      isHot: true,
      players: 2145,
    },
  ],
  [
    {
      id: 7,
      name: "Hot Triple Sevens",
      category: "jackpots",
      image: game7.src,
      isNew: false,
      isHot: true,
      players: 1654,
    },
    {
      id: 8,
      name: "Ice Mania",
      category: "slots",
      image: game8.src,
      isNew: true,
      isHot: false,
      players: 1123,
    },
  ],
  [
    {
      id: 9,
      name: "Irish Reels",
      category: "slots",
      image: game9.src,
      isNew: false,
      isHot: false,
      players: 987,
    },
    {
      id: 10,
      name: "Unlimited Wishes",
      category: "jackpots",
      image: game10.src,
      isNew: true,
      isHot: false,
      players: 2354,
    },
  ],
  [
    {
      id: 11,
      name: "3 Wild Jokers",
      category: "slots",
      image: game11.src,
      isNew: false,
      isHot: true,
      players: 1245,
    },
    {
      id: 12,
      name: "Buffalo Power Megaways",
      category: "slots",
      image: game12.src,
      isNew: true,
      isHot: false,
      players: 1876,
    },
  ],
  [
    {
      id: 13,
      name: "3 Wild Jokers",
      category: "slots",
      image: game13.src,
      isNew: false,
      isHot: true,
      players: 1654,
    },
    {
      id: 14,
      name: "Buffalo Power Megaways",
      category: "slots",
      image: game14.src,
      isNew: true,
      isHot: false,
      players: 987,
    },
  ],
];

export const GameShowcase: React.FC = () => {
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

  const renderGameCard = (game: (typeof games)[0]) => (
    <Card
      key={game.id}
      disableRipple
      isPressable
      className="neon-border overflow-hidden justify-between mx-auto w-full min-w-[135px] max-w-[234px] lg:min-w-[200px] lg:max-w-[200px]"
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
      <div className="px-2.5 sm:px-4 py-3 w-full hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1.5" />
            <Icon className="text-platinum mr-1" icon="lucide:users" />
            <span className="text-xs lg:text-sm text-platinum">
              {game.players} playing
            </span>
          </div>
          <Button
            as="a"
            className="min-w-0 h-8 bg-magenta"
            color="primary"
            href="#signup"
            size="sm"
          >
            Play
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <section className="bg-black py-16 relative" id="games">
      <div className="md:container mx-auto px-4 relative z-[3]">
        <div className="container mx-auto text-center lg:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="">Premium Casino Games</span>
          </h2>
        </div>

        {/* Games Grid */}
        {/* Scrollable container */}
        <div className="relative mx-auto">
          {/* Left arrow */}
          <Button
            isIconOnly
            // className="absolute -left-2 bg-transparent top-1/2 -translate-y-1/2 z-10 w-8 h-8 min-w-0 "
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20 w-8 h-8 min-w-0 "
            radius="full"
            size="lg"
            onPress={scrollLeft}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-left" />
          </Button>
          {/* Right arrow */}
          <Button
            isIconOnly
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20   w-8 h-8 min-w-0"
            // className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-transparent w-8 h-8 min-w-0"
            radius="full"
            size="lg"
            onPress={scrollRight}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-right" />
          </Button>

          <ScrollShadow
            ref={scrollContainerRef}
            hideScrollBar
            className="flex py-6 gap-4 snap-x px-2 md:px-12"
            orientation="horizontal"
          >
            {games.map((game, index) => (
              <div key={`game ${index}`} className="hidden lg:block">
                {renderGameCard(game)}
              </div>
            ))}
            {games2.map((gamePair, index) => (
              <div
                key={`game pair ${index}`}
                className="flex  flex-col gap-4 lg:hidden"
              >
                {gamePair.map(renderGameCard)}
              </div>
            ))}
          </ScrollShadow>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-plum/30 blur-3xl z-[2]" />
      <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-magenta/10 blur-3xl z-[2]" />
    </section>
  );
};
