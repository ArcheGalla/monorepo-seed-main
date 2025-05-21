import React, { FC } from "react";
import { Card } from "@heroui/card";

import Game1 from "@/assets/Game_ChapoVB.webp";
import Game2 from "@/assets/Game_PlunderlandVB.webp";
import Game3 from "@/assets/Game_SultanVB.webp";
import Game4 from "@/assets/Game_TitanStrikeVB.webp";

export const FourGameGrid: FC = () => {
  const games = [
    {
      id: 1,
      name: "Game 1",
      image: Game1.src,
    },
    {
      id: 2,
      name: "Game 2",
      image: Game2.src,
    },
    {
      id: 3,
      name: "Game 3",
      image: Game3.src,
    },
    {
      id: 4,
      name: "Game 4",
      image: Game4.src,
    },
  ];

  const renderGameCard = (game: (typeof games)[0]) => (
    <Card key={game.id} className="overflow-hidden justify-between w-full">
      <div className="relative">
        <img
          alt={game.name}
          className="w-full h-36 xs:h-44 min-[400px]:h-48 min-[440px]:h-56 sm:h-80 object-cover rounded-xl"
          src={game.image}
        />
      </div>
    </Card>
  );

  return (
    <section className="bg-black relative" id="four-games">
      <div className="md:container mx-auto px-4 relative z-[3]">
        <div className="relative mx-auto grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-3 py-6 max-w-3xl">
          {games.map((game, index) => (
            <div key={`game ${index}`} className="">
              {renderGameCard(game)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
