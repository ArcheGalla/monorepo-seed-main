import { GamesList2 } from "@/components/lobby/games-list2";
import { LobbyHero } from "@/components/lobby/lobby-hero";

export default function GamesPage() {
  return (
    <div className="flex-1 relative flex-col flex-grow flex items-center justify-center w-full pb-10 h-full">
      <div className="flex-1 w-full p-4">
        <LobbyHero />
        <div className="pt-8 pb-20">
          <GamesList2 />
        </div>
      </div>
    </div>
  );
}
