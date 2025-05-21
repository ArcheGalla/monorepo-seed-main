import { GamesList } from "@/components/lobby/games-list";
import { LobbyHero } from "@/components/lobby/lobby-hero";

export default function LobbyPage() {
  return (
    <div className="flex-1 relative flex-col flex-grow flex items-center justify-center w-full pb-10 h-full">
      <div className="flex-1 w-full p-4 md:pt-3">
        <LobbyHero />
        {/* <div className="md:pt-3 pb-20"> */}
        <div className=" pb-20">
          <GamesList />
        </div>
      </div>
    </div>
  );
}
