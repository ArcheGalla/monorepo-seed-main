import { CoinPackages } from "./coin-packages";
import { Promotions } from "./promotions";

export default function PackagesPage() {
  return (
    <>
      <div className="flex-1 relative z-10 flex-col flex-grow flex items-center justify-center w-full pb-10 h-full md:pt-10">
        <div className="flex-1 w-full p-4 max-w-screen-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4  text-pretty">
              Buy Gold Coin Package
            </h1>
          </div>

          <Promotions />
          <CoinPackages />
        </div>
      </div>
    </>
  );
}
