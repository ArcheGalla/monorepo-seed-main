import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

export const GameLobby: React.FC = () => {
  const gameCategories = [
    { name: "TOP GAMES", icon: "lucide:star" },
    { name: "EXCLUSIVE", icon: "lucide:crown" },
    { name: "EARLY BIRD", icon: "lucide:alarm-clock" },
    { name: "SLOTS", icon: "lucide:dices" },
  ];

  const games = [
    {
      name: "Crown Jewels",
      image: "https://picsum.photos/300/200?random=1",
      isNew: true,
      isExclusive: true,
    },
    {
      name: "Immortal Ways",
      image: "https://picsum.photos/300/200?random=2",
      isNew: true,
      isExclusive: true,
    },
    {
      name: "Habanero",
      image: "https://picsum.photos/300/200?random=3",
      isNew: false,
      isExclusive: true,
    },
    {
      name: "Last Man Standing",
      image: "https://picsum.photos/300/200?random=4",
      isNew: true,
      isExclusive: false,
    },
    {
      name: "Big Bass Bonanza",
      image: "https://picsum.photos/300/200?random=5",
      isNew: false,
      isExclusive: false,
    },
    {
      name: "Burning Hearts",
      image: "https://picsum.photos/300/200?random=6",
      isNew: false,
      isExclusive: false,
    },
  ];

  const secondRowGames = [
    {
      name: "Wild West",
      image: "https://picsum.photos/300/200?random=7",
      isNew: false,
      isExclusive: false,
    },
    {
      name: "Lucky Frog",
      image: "https://picsum.photos/300/200?random=8",
      isNew: false,
      isExclusive: false,
    },
    {
      name: "Red Elephant",
      image: "https://picsum.photos/300/200?random=9",
      isNew: false,
      isExclusive: false,
    },
    {
      name: "Golden Corn",
      image: "https://picsum.photos/300/200?random=10",
      isNew: false,
      isExclusive: false,
    },
    {
      name: "Forest Queen",
      image: "https://picsum.photos/300/200?random=11",
      isNew: false,
      isExclusive: false,
    },
    {
      name: "Treasure Hunt",
      image: "https://picsum.photos/300/200?random=12",
      isNew: false,
      isExclusive: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <img
          alt="Hero Banner"
          className="w-full h-full object-cover"
          src="https://picsum.photos/1200/400?random=hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome to VegasBonanza
          </h1>
          <p className="text-white text-lg">
            Play games, collect bonuses, and win real rewards!
          </p>
        </div>
      </div>

      {/* Game Categories */}
      <div className="flex items-center justify-center gap-4 mb-8 overflow-x-auto pb-2">
        {gameCategories.map((category, index) => (
          <Button
            key={index}
            className="whitespace-nowrap"
            color={index === 0 ? "primary" : "default"}
            startContent={<Icon icon={category.icon} />}
            variant={index === 0 ? "solid" : "bordered"}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Top Games Section */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <Icon className="text-warning mr-2" icon="lucide:star" />
          <h2 className="text-xl font-bold">TOP GAMES</h2>
          <Icon className="text-warning ml-2" icon="lucide:star" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {games.map((game, index) => (
            <Card key={index} className="bg-content2 border-none">
              <CardBody className="p-0 overflow-hidden">
                <div className="relative">
                  <img
                    alt={game.name}
                    className="w-full aspect-[3/2] object-cover"
                    src={game.image}
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {game.isNew && (
                      <div className="bg-primary text-white text-xs font-bold py-1 px-2 rounded">
                        NEW
                      </div>
                    )}
                    {game.isExclusive && (
                      <div className="bg-warning text-content1 text-xs font-bold py-1 px-2 rounded">
                        EXCLUSIVE
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="font-semibold truncate">{game.name}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Spring Spin Banner */}
      <div className="flex justify-center mb-8">
        <div className="bg-content2 rounded-lg px-6 py-3 flex items-center gap-2">
          <Icon className="text-warning" icon="lucide:flower" />
          <span className="font-bold">SPRING SPIN</span>
          <Icon className="text-warning" icon="lucide:flower" />
        </div>
      </div>

      {/* More Games */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {secondRowGames.map((game, index) => (
          <Card key={index} className="bg-content2 border-none">
            <CardBody className="p-0 overflow-hidden">
              <div className="relative">
                <img
                  alt={game.name}
                  className="w-full aspect-[3/2] object-cover"
                  src={game.image}
                />
                <div className="absolute top-0 left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center -translate-y-1/2 -translate-x-1/2">
                  <Icon className="text-white" icon="lucide:crown" />
                </div>
              </div>
              <div className="p-2 text-center">
                <p className="font-semibold truncate">{game.name}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
