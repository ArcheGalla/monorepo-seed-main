import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

interface PackageData {
  goldCoins: number;
  sweepCoins: number;
  price: number;
  scPrice: number;
  signUpBonusGC: number;
  signUpBonusSC: number;
  popular?: boolean;
}

const packages: PackageData[] = [
  // { goldCoins: 0, sweepCoins: 0, price: 0, scPrice: 0, signUpBonusGC: 50000, signUpBonusSC: 2.5 },
  {
    goldCoins: 45000,
    sweepCoins: 1,
    price: 1.99,
    scPrice: 1.99,
    signUpBonusGC: 95000,
    signUpBonusSC: 3.5,
  },
  {
    goldCoins: 120000,
    sweepCoins: 5,
    price: 4.99,
    scPrice: 0.998,
    signUpBonusGC: 215000,
    signUpBonusSC: 7.5,
  },
  {
    goldCoins: 250000,
    sweepCoins: 12,
    price: 9.99,
    scPrice: 0.8325,
    signUpBonusGC: 465000,
    signUpBonusSC: 14.5,
  },
  {
    goldCoins: 600000,
    sweepCoins: 23,
    price: 19.99,
    scPrice: 0.8691304348,
    signUpBonusGC: 1065000,
    signUpBonusSC: 25.5,
    popular: true,
  },
  {
    goldCoins: 1200000,
    sweepCoins: 55,
    price: 49.99,
    scPrice: 0.9089090909,
    signUpBonusGC: 2265000,
    signUpBonusSC: 57.5,
  },
  {
    goldCoins: 2500000,
    sweepCoins: 107,
    price: 99.99,
    scPrice: 0.9344859813,
    signUpBonusGC: 4765000,
    signUpBonusSC: 109.5,
  },
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function PackagesPage() {
  return (
    <>
      <div className="flex-1 relative z-10 flex-col flex-grow flex items-center justify-center w-full py-10 h-full">
        <div className="flex-1 w-full p-4 max-w-screen-lg">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-1 mb-4 bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent">
              Buy Gold Coin Package
            </h1>

            <p className="text-large text-default-600 max-w-2xl mx-auto">
              At VegazBonanza.com it is ALWAYS FREE to enter or win our
              Sweepstakes games. No Purchase Necessary. Void where prohibited by
              law.
              <br /> Find out more in our Sweepstakes Rules | Terms of Service
              apply.
            </p>
          </div>

          <div className="space-y-6">
            {packages.map((pack, index) => (
              <Card
                key={index}
                className={`overflow-visible w-full bg-gradient-to-br from-plum via-[20%] via-plum to-plumDark min-w-[278px] max-w-96 lg:max-w-full mx-auto p-6 gap-3 flex-col lg:flex-row justify-between items-center ${pack?.popular ? "neon-border" : "border-midnight border-2 "}`}
                // className={`overflow-visible w-full bg-plumDark min-w-[278px] max-w-96 lg:max-w-full mx-auto p-6 gap-3 flex-col lg:flex-row justify-between items-center ${pack?.popular ? "neon-border" : "border-midnight border-2 "}`}
                disableRipple
              >
                {pack?.popular && (
                  <div className="bg-magenta card-glow text-white text-center text-xs font-bold py-1 px-3 rounded-full absolute -top-2.5 left-1/2 transform -translate-x-1/2">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center lg:hidden mb-1">
                  <h3 className="text-2xl font-bold">${pack.price}</h3>
                </div>

                <div className="flex flex-col gap-3 items-center lg:items-start xl:items-center xl:gap-8 w-full xl:flex-row xl:flex-wrap">
                  <div className="flex items-center justify-between sm:min-w-[260px]">
                    <div className="flex items-center gap-2.5">
                      <img alt="GC Coin" className="w-8 h-8" src={gcCoin.src} />
                      <div className="space-y-0.5">
                        <h3 className="text-xl font-bold text-white">
                          {formatNumber(pack.goldCoins)} Gold Coins
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-green-500 emerald-card-glow bg-green-900/80 p-2 pr-4 border-2 rounded-full">
                    <Icon
                      className="text-xl text-green-500"
                      icon="lucide:plus"
                    />
                    <div className="flex items-center gap-2.5">
                      <img alt="SC Coin" className="w-6 h-6" src={scCoin.src} />
                      <div className="space-y-0.5">
                        <h3 className="text-lg font-bold text-white">
                          {pack.sweepCoins} FREE Sweepstakes
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-center w-full mt-3 lg:mt-0 lg:w-auto">
                  <h3 className="hidden lg:block text-2xl font-bold">
                    ${pack.price}
                  </h3>

                  <Button
                    className="min-w-[260px] font-bold bg-magenta card-glow w-full"
                    size="lg"
                    variant="solid"
                  >
                    BUY NOW
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="my-12 text-center bg-transparent p-0 shadow-none">
            <CardBody>
              <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold mb-6 text-center bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent pb-1">
                Ready to Play?
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-magenta shadow-neon-magenta uppercase px-8 whitespace-normal max-w-[424px]  h-auto min-h-16 w-full"
                  size="lg"
                  startContent={
                    <img alt="GC Coin" className="w-10 h-10" src={gcCoin.src} />
                  }
                >
                  START PLAYING WITH GOLD COINS
                </Button>
                <Button
                  className="bg-magenta shadow-neon-magenta uppercase px-8  whitespace-normal max-w-[424px] h-auto min-h-16 w-full"
                  size="lg"
                  startContent={
                    <img alt="SC Coin" className="w-10 h-10" src={scCoin.src} />
                  }
                >
                  PLAY FREE WITH SWEEPSTAKES COINS
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
