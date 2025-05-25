"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/theme";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

import { useLogout } from "@/modules/hooks/useLogOut";
import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

export const navItems = [
  { icon: "lucide:home", label: "Lobby", href: "/lobby" },
  {
    icon: "lucide:shopping-bag",
    label: "Store",
    href: "/lobby/store",
  },
  {
    label: "Redeem",
    icon: "solar:cash-out-linear",
    href: "/lobby/redeem",
  },
  {
    icon: "lucide:award",
    label: "Rewards",
    href: "/lobby/rewards",
    altUlr: "/lobby/rewards/loyalty-club",
  },
  { icon: "lucide:user", label: "My Account", href: "/lobby/account" },
  {
    icon: "material-symbols:history-rounded",
    label: "Transaction History",
    href: "/lobby/account/transaction-history",
  },
  {
    icon: "lucide:circle-help",
    label: "How It Works",
    href: "/lobby/how-it-works",
  },
  { icon: "ix:support", label: "Support", href: "/lobby/support" },
];

export const mobileMenuNavItems = [
  { icon: "lucide:user", label: "My Account", href: "/lobby/account" },
  {
    icon: "material-symbols:history-rounded",
    label: "Transaction History",
    href: "/lobby/account/transaction-history",
  },
  {
    icon: "lucide:circle-help",
    label: "How It Works",
    href: "/lobby/how-it-works",
  },
  { icon: "ix:support", label: "Support", href: "/lobby/support" },
];

export const Navigation = () => {
  const pathname = usePathname();
  const { focusingOn } = useAppStore();
  const { handleLogOut, isLoading } = useLogout();

  return (
    <div
      className={cn("bg-[#191428] p-3 rounded-xl relative z-[3]", {
        "z-[51]":
          focusingOn === FocusTargetEnum.Redeem ||
          focusingOn === FocusTargetEnum.Rewards,
      })}
    >
      {navItems.map((item) => (
        <Button
          key={item.label}
          as={Link}
          className={cn(
            "w-full justify-start gap-3 py-7 font-medium transition-none hover:text-btnPrimary/90 !bg-transparent hover:!bg-transparent",
            {
              "text-btnPrimary":
                pathname === item.href ||
                pathname === item?.altUlr ||
                (focusingOn === FocusTargetEnum.Redeem &&
                  item.label === "Redeem") ||
                (focusingOn === FocusTargetEnum.Rewards &&
                  item.label === "Rewards"),
            },
          )}
          href={item?.href || "#"}
          startContent={
            <span className="min-h-5 min-w-5">
              <Icon className="text-xl shrink-0" icon={item.icon} />
            </span>
          }
          variant="light"
        >
          {item.label}
        </Button>
      ))}
      <Button
        className={cn(
          "w-full justify-start gap-3 py-7 font-medium transition-none hover:text-btnPrimary/90 !bg-transparent hover:!bg-transparent",
        )}
        isDisabled={isLoading}
        startContent={
          <span className="min-h-5 min-w-5">
            <Icon className="text-xl shrink-0" icon="carbon:exit" />
          </span>
        }
        variant="light"
        onPress={handleLogOut}
      >
        Log Out
      </Button>
    </div>
  );
};
