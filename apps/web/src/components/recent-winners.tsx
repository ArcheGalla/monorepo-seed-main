"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { ScrollShadow } from "@heroui/scroll-shadow";

import gcCoin from "../assets/gc-icon.png";
import scCoin from "../assets/sc-icon.png";

import WildJokersBanner from "@/assets/game-banners/3-wild-jokers.png";
import BuffaloPowerBanner from "@/assets/game-banners/buffalo-power.png";
import DiamondStrikeBanner from "@/assets/game-banners/diamond-strike.png";
import EpicJokerBanner from "@/assets/game-banners/epic-joker.png";
import GoldTrainBanner from "@/assets/game-banners/gold-train.png";
import HotManiaBanner from "@/assets/game-banners/hot-mania.png";
import HotTripleSevensBanner from "@/assets/game-banners/hot-triple-sevens.png";
import IceManiaBanner from "@/assets/game-banners/ice-mania.png";
import IrishReelsBanner from "@/assets/game-banners/irish-reels.webp";
import UnlimitedWishesBanner from "@/assets/game-banners/unlimited-wishes.png";

export const RecentWinners: React.FC = () => {
  // Reference to the scrollable container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Gold Coin winners with actual game images
  const gcWinners = [
    {
      name: "Robert K.",
      game: "3 Wild Jokers",
      gameImage: WildJokersBanner.src,
      winnings: "1,500,000 GC",
      time: "2 hours ago",
      type: "gc",
    },
    {
      name: "Emma S.",
      game: "Hot Triple Sevens",
      gameImage: HotTripleSevensBanner.src,
      winnings: "750,000 GC",
      time: "5 hours ago",
      type: "gc",
    },
    {
      name: "David M.",
      game: "Irish Reels",
      gameImage: IrishReelsBanner.src,
      winnings: "500,000 GC",
      time: "Yesterday",
      type: "gc",
    },
    {
      name: "Linda P.",
      game: "Diamond Strike",
      gameImage: DiamondStrikeBanner.src,
      winnings: "350,000 GC",
      time: "Yesterday",
      type: "gc",
    },
    {
      name: "Thomas R.",
      game: "Gold Train",
      gameImage: GoldTrainBanner.src,
      winnings: "425,000 GC",
      time: "2 days ago",
      type: "gc",
    },
    // Sweepstakes Coin winners
    {
      name: "Jennifer A.",
      game: "Ice Mania",
      gameImage: IceManiaBanner.src,
      winnings: "15,000 SC",
      time: "3 hours ago",
      type: "sc",
    },
    {
      name: "Michael B.",
      game: "Epic Joker",
      gameImage: EpicJokerBanner.src,
      winnings: "7,500 SC",
      time: "6 hours ago",
      type: "sc",
    },
    {
      name: "Sarah C.",
      game: "Buffalo Power",
      gameImage: BuffaloPowerBanner.src,
      winnings: "5,000 SC",
      time: "Yesterday",
      type: "sc",
    },
    {
      name: "James D.",
      game: "Hot Mania",
      gameImage: HotManiaBanner.src,
      winnings: "3,500 SC",
      time: "Yesterday",
      type: "sc",
    },
    {
      name: "Patricia E.",
      game: "Unlimited Wishes",
      gameImage: UnlimitedWishesBanner.src,
      winnings: "4,250 SC",
      time: "2 days ago",
      type: "sc",
    },
  ];

  // Scroll functions for the navigation arrows
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const renderWinnerCard = (winner: any) => (
    <Card
      disableRipple
      className="bg-content1 neon-border overflow-hidden min-w-[250px] w-[250px] flex-shrink-0"
    >
      <div className="relative">
        <img
          alt={winner.game}
          className="w-full h-32 object-cover px-[2px] pt-[2px] rounded-[14px]"
          src={winner.gameImage}
        />
        <div className="absolute top-2 right-2 bg-gradient-casino text-white text-xs py-1 px-2 rounded-full">
          BIG WIN
        </div>
        {/* Coin type badge */}
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full flex items-center justify-center">
          <img
            alt="Coin"
            className="w-8 h-8"
            src={winner.type === "gc" ? gcCoin.src : scCoin.src}
          />
        </div>
      </div>
      <CardBody className="p-4">
        <h4 className="font-bold text-white">{winner.name}</h4>
        <p className="text-sm text-platinum">Won on {winner.game}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <img
              alt="Coin"
              className="w-4 h-4 mr-1"
              src={winner.type === "gc" ? gcCoin.src : scCoin.src}
            />
            <p
              className={`font-bold ${winner.type === "gc" ? "text-amber" : "text-green-500"}`}
            >
              {winner.winnings}
            </p>
          </div>
          <p className="text-xs text-platinum">{winner.time}</p>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <section className="py-16 relative bg-content1/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="from-warning to-yellow-300 bg-gradient-to-b bg-clip-text text-transparent">
              Our Latest Winners
            </span>
          </h2>
        </div>

        {/* Horizontal scrollable row with navigation arrows */}
        <div className="relative">
          {/* Left arrow */}
          <Button
            isIconOnly
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-magenta/30 shadow-neon-magenta hover:bg-magenta/20"
            radius="full"
            size="lg"
            onPress={scrollLeft}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-left" />
          </Button>
          {/* Right arrow */}
          <Button
            isIconOnly
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-magenta/30 shadow-neon-magenta hover:bg-magenta/20"
            radius="full"
            size="lg"
            onPress={scrollRight}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-right" />
          </Button>

          {/* Scrollable container */}
          <ScrollShadow
            ref={scrollContainerRef}
            hideScrollBar
            className="flex pb-6 gap-4 snap-x px-2 md:px-12"
            orientation="horizontal"
          >
            {gcWinners.map((winner, index) => (
              <div key={`winner-${index}`} className="">
                {renderWinnerCard(winner)}
              </div>
            ))}
          </ScrollShadow>
          {/* </div> */}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald/10 blur-3xl -z-10" />
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-magenta/10 blur-3xl -z-10" />
    </section>
  );
};
