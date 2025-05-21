"use client";

import React, { FC } from "react";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import NumberFlow, { continuous } from "@number-flow/react";

import { useUserStore } from "@/store/useUserStore";
import { CurrencyEnum } from "@/types/currency";

interface CurrencySwitcherProps {
  isSideMenu?: boolean;
}

export const CurrencySwitcher: FC<CurrencySwitcherProps> = ({
  isSideMenu = false,
}) => {
  const { wallet, selectedCurrency, setSelectedCurrency } = useUserStore();

  const toggleSwitch = () => {
    setSelectedCurrency(
      selectedCurrency === CurrencyEnum.GC ? CurrencyEnum.SC : CurrencyEnum.GC,
    );
  };

  const isGC = selectedCurrency === CurrencyEnum.GC;

  return (
    <div
      className={cn(
        `relative flex items-center justify-between rounded-full h-8 mx-auto bg-black  min-w-[200px] md:min-w-[300px]`,
        { "md:min-w-[200px]": isSideMenu },
      )}
    >
      <Button
        disableRipple
        className={cn(
          "hidden md:flex z-[1] pl-3 pr-2 rounded-r-none justify-start gap-2 border-1.5 border-amber border-r-transparent rounded-l-full h-full bg-black !transition-none !opacity-100 w-fit shrink-0 min-w-[150px] !scale-100",
          {
            "border-transparent rounded-r-full bg-cotent2": !isGC,
            "!hidden": isSideMenu,
          },
        )}
        onPress={() => toggleSwitch()}
      >
        <span className={`font-bold ${isGC ? "text-amber" : "text-gray-400"}`}>
          GC <span className="font-normal">{wallet.gc.toLocaleString()}</span>
        </span>
      </Button>

      {/* Toggle */}
      <Button
        disableRipple
        className={`
          w-[3.9rem] shrink-0 h-8 rounded-full cursor-pointer min-w-0 p-0
            border-1.5 !opacity-100  justify-start bg-content2 z-[2] !scale-100 !duration-0 overflow-visible
           ${isGC ? "border-amber  bg-content3" : "border-green-500 bg-content3"}
        `}
        id="currency-toggle"
        onPress={toggleSwitch}
      >
        {/* border y */}
        <div
          className={cn(
            "absolute inset-0 -top-[1.3px] -bottom-[1.3px] left-5 -right-3 border-1.5 border-x-transparent border-y-green-500 rounded-none",
            {
              "border-y-amber left-5 -right-3 md:-left-3 md:right-5": isGC,
              "md:left-5 md:-right-3": isSideMenu,
            },
          )}
        />

        <div
          className={`
          absolute z-[2] top-0.5 w-6 h-6 rounded-full
              flex items-center justify-center
              transition-all duration-300 transform
              font-bold text-black text-lg
            ${isGC ? "translate-x-1 bg-amber" : "translate-x-8 bg-green-400"}
          `}
        >
          {isGC ? "G" : "S"}
        </div>

        {/* bg ghost buttons */}
        <div
          className={`
          absolute z-[1] opacity-30 top-0.5 w-6 h-6 rounded-full
              flex items-center justify-center
              font-semibold text-black text-lg
           translate-x-1 bg-amber
          `}
        >
          G
        </div>
        <div
          className={`
          absolute z-[1] opacity-30 top-0.5 w-6 h-6 rounded-full
              flex items-center justify-center
              font-semibold text-black text-lg
         translate-x-8 bg-green-400
          `}
        >
          S
        </div>
      </Button>

      <Button
        disableRipple
        className={cn(
          "z-[1] w-fit shrink-0 pr-3 pl-2 flex gap-2 border-1.5 border-green-500 rounded-full h-full bg-black md:bg-cotent2 flex-1 md:min-w-[150px] !transition-none !opacity-100 justify-start border-l-transparent rounded-l-none !scale-100",
          {
            "border-amber border-l-transparent md:border-transparent md:bg-content2":
              isGC,
            "md:border-amber md:border-l-transparent md:bg-black":
              isGC && isSideMenu,
          },
        )}
        onPress={() => toggleSwitch()}
      >
        <span
          className={cn(
            `font-bold ${!isGC ? "text-green-500" : "text-amber md:text-gray-400"}`,
            {
              "md:text-amber": isGC,
            },
          )}
        >
          <span
            className={cn("", {
              "hidden md:inline": isGC,
              "hidden md:hidden": isGC && isSideMenu,
            })}
          >
            SC{" "}
            <span className="font-normal">
              <NumberFlow value={wallet.sc} />
            </span>
          </span>
          <span
            className={cn("md:hidden", {
              hidden: !isGC,
              "inline md:inline": isGC && isSideMenu,
            })}
          >
            GC{" "}
            <span className="font-normal">
              <NumberFlow plugins={[continuous]} value={wallet.gc} />
            </span>
          </span>
        </span>
      </Button>
    </div>
  );
};
