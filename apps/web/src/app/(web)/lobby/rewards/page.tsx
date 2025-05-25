import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { DailyBonusCard } from "./daily-bonus-card";
import { YourLevelCard } from "./your-level-card";

export default function RewardsPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4 w-full mb-10 pt-4 md:pt-14">
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold pb-1 text-center mb-3 md:mb-4">
            Rewards
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-screen-lg mx-auto">
            <div className="p-1 neon-border2 bg-content1 bg-opacity-40  rounded-medium">
              <div className="flex flex-col gap-3 p-3">
                <h2>Loyalty Club</h2>

                <YourLevelCard />
                <Button
                  as={Link}
                  className="bg-btnPrimary text-base h-12 font-normal"
                  href="/lobby/rewards/loyalty-club"
                  radius="sm"
                >
                  View
                </Button>
              </div>
            </div>

            <DailyBonusCard />
          </div>
        </div>
      </div>
    </>
  );
}
