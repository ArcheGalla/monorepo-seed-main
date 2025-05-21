import { BalanceCards } from "./balance-cards";
import { BonusHistory } from "./bonus-history";
import { LevelBadge } from "./level-badge";

export default function WalletPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-6 w-full mb-10 pt-10">
        <div className="text-center mb-6 xl:mb-12 pt-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4 bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
            My Wallet
          </h1>
          <p className="text-large text-default-600 max-w-2xl mx-auto">
            Track your balances, level, and rewards
          </p>
        </div>

        <section className="mb-8">
          <LevelBadge level={12} multiplier={1.2} />
        </section>

        <section className="mb-8">
          <BalanceCards />
        </section>

        <section>
          <BonusHistory />
        </section>
      </div>
    </>
  );
}
