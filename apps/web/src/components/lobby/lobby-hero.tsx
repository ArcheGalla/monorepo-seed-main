import React from "react";

export const LobbyHero = () => {
  return (
    <>
      <div className="flex flex-col gap-8 w-full mx-auto min-[1140px]:w-[93%]">
        {/* Search */}
        {/* <div className="flex justify-between items-center gap-3">
          <Input
            classNames={{
              input: "bg-zinc-800/50 text-white placeholder:text-zinc-400",

              inputWrapper: " max-w-[600px]",
            }}
            placeholder="Search games and game providers"
            radius="lg"
            size="lg"
            startContent={
              <Icon className="text-default-400" icon="lucide:search" />
            }
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <div className="hidden lg:block">
            <CurrencySwitcher coinType={coinType} />
          </div>
        </div> */}

        {/* <div className="mx-auto">
          <CurrencySwitcher coinType={coinType} />
        </div> */}

        {/* <div className="hidden mx-auto md:block">
          <CurrencySwitcher2 coinType={coinType} />
        </div> */}

        {/* <div className=" relative w-full flex flex-col items-center justify-center gap-8 rounded-xl overflow-hidden border-b border-b-magenta/25 border-t border-t-magenta/20 ">
          <Card className="bg-gradient-to-r from-plumDark via-plum to-plumDark w-full rounded-xl">
            <div className="p-6 flex flex-col items-center gap-3 lg:gap-8 pt-4 pb-24 lg:pb-14 lg:pt-6 ">
              <DailySpins />

              <div className="absolute left-6 xl:left-14 bottom-6 lg:bottom-[2.3rem]">
                <SaleBanner />
              </div>

              <div className="absolute right-6 xl:right-14 bottom-4 opacity-60 lg:bottom-[2rem] bg-purple-900 rounded-full p-2">
                <Icon className="w-10 h-10 text-white opacity-70" icon="lucide:gift" />
              </div>
            </div>
          </Card>
        </div> */}
      </div>
    </>
  );
};
