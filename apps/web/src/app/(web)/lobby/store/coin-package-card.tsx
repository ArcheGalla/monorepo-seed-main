import React, { FC } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { cn } from "@heroui/theme";
import { usePathname } from "next/navigation";

import { CoinPackage } from "./packages";

import gc1 from "@/assets/gc1.webp";

interface CoinPackageCardProps {
  coinPackage: CoinPackage;
  onBuyNow: (pkg: CoinPackage) => void;
  isModal?: boolean;
}

export const CoinPackageCard: FC<CoinPackageCardProps> = ({
  coinPackage,
  onBuyNow,
  isModal,
}) => {
  const { goldCoins, sweepstakesCoins, price, badge } = coinPackage;

  const pathname = usePathname();
  const isStorePage = pathname.includes("lobby/store");

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";

    return num.toLocaleString();
  };

  const getBadgeStyles = () => {
    if (badge === "Popular") {
      return {
        background: "linear-gradient(135deg, #e41d93 0%, #892bf7 100%)",
        icon: "lucide:trending-up",
        borderColor: "#f373c1",
      };
    } else if (badge === "Best Value") {
      return {
        // background: "linear-gradient(135deg, #00c853 0%, #009688 100%)",
        // icon: "lucide:award",
        // borderColor: "#4caf50",
        background: "linear-gradient(135deg, #e41d93 0%, #892bf7 100%)",
        icon: "lucide:award",
        borderColor: "#f373c1",
      };
    }

    return {
      background: "linear-gradient(135deg, #e41d93 0%, #892bf7 100%)",
      icon: "lucide:star",
      borderColor: "#f373c1",
    };
  };

  return (
    <div className="flex gap-3 items-stretch">
      <Card
        disableRipple
        className={cn(
          "border border-divider bg-content2 bg-opacity-40 transition-all relative overflow-visible w-full h-full flex",
          {
            "neon-border border-0": badge,
          },
        )}
      >
        <CardBody className="overflow-visible p-0 flex flex-col justify-center">
          {badge && (
            <div
              className="absolute -top-2.5 left-0 pl-2 pr-3 py-0.5 text-xs font-normal shadow-lg flex items-center gap-2 z-10 rounded-full"
              style={{
                background: getBadgeStyles().background,
              }}
            >
              <Icon
                className="text-white text-base"
                icon={getBadgeStyles().icon}
              />
              <span>{badge}</span>
            </div>
          )}
          <div className="relative px-2 py-3 flex-grow flex flex-col justify-center">
            <div className={cn("flex items-center gap-2 justify-between")}>
              <div className="flex min-[400px]:gap-0.5 items-start min-[400px]:items-center w-full flex-col min-[400px]:flex-row">
                <div className="flex justify-between gap-2 min-w-fit  whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <img
                      alt="GC Coin"
                      className="w-8 h-8 -mt-0.5 mb-1 min-[400px]:mt-0 min-[400px]:mb-2"
                      src={gc1.src}
                    />
                    <h3 className="text-sm md:text-base font-medium tracking-tight">
                      <span className="text-amber">GC</span>{" "}
                      {formatNumber(goldCoins)}
                    </h3>
                  </div>
                </div>
                <div className="flex text-sm md:text-base items-center gap-0.5 w-fit py-1 pl-0.5 rounded-md">
                  <span className="text-green-500">+</span>
                  <span
                    className={cn(
                      "flex text-sm gap-0 font-medium text-green-500",
                    )}
                  >
                    FREE SC&nbsp;
                    <span className="text-white">{sweepstakesCoins}</span>
                  </span>
                </div>
              </div>

              <div
                className={cn("flex flex-col  items-center gap-3", {
                  "gap-4 sm:flex-row": isStorePage,
                })}
              >
                <Button
                  className={cn("font-normal min-w-[105px] bg-btnPrimary", {
                    "md:min-h-12": isModal,
                  })}
                  radius="sm"
                  onPress={() => onBuyNow(coinPackage)}
                >
                  <span
                    className={cn("text-sm font-normal", {
                      "md:text-lg": isModal,
                    })}
                  >
                    {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
