"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";
import { cn } from "@heroui/theme";
import { Badge } from "@heroui/badge";

import { mobileMenuNavItems } from "./navigation";

import { useLogout } from "@/modules/hooks/useLogOut";
import { useAppStore } from "@/store/useAppStore";
import { FocusTargetEnum } from "@/types/focus-target";

export const MobileMenu = () => {
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { focusingOn } = useAppStore();

  const { handleLogOut, isLoading } = useLogout();

  const menuLinks = [
    {
      label: "Store",
      icon: "lucide:store",
      href: "/lobby/store",
    },
    {
      label: "Redeem",
      icon: "solar:cash-out-linear",
      href: "/lobby/redeem",
    },
    {
      label: "Home",
      icon: "lucide:home",
      href: "/lobby",
    },
    {
      label: "Rewards",
      icon: "lucide:gift",
      href: "/lobby/rewards",
      altUrl: "/lobby/rewards/loyalty-club",
    },
    {
      label: "Menu",
      icon: "lucide:menu",
      onPress: () => setIsDrawerOpen(true),
    },
  ];

  const notifications = 2;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 md:hidden bg-black border-t border-t-divider",
        {
          "z-[51]":
            focusingOn === FocusTargetEnum.Redeem ||
            focusingOn === FocusTargetEnum.Rewards,
        },
      )}
    >
      <div className="px-2 pt-1 pb-3 flex justify-around items-center">
        {menuLinks.map(({ label, icon, href, altUrl, onPress }) =>
          notifications && label === "Rewards" ? (
            <Badge
              key={label}
              className="right-[20%] top-[20%] pointer-events-none"
              color="danger"
              content={notifications}
              showOutline={false}
              size="md"
            >
              <div className="flex flex-col items-center">
                <Button
                  key={label}
                  isIconOnly
                  aria-label={label}
                  as={href ? Link : undefined}
                  className={cn("", {
                    "text-btnPrimary":
                      pathname === href ||
                      pathname === altUrl ||
                      focusingOn === FocusTargetEnum.Rewards,
                  })}
                  href={href}
                  variant="light"
                  onPress={onPress}
                >
                  <Icon className="text-2xl" icon={icon} />
                </Button>
                <span className="text-xs text-default-700 -mt-1">{label}</span>
              </div>
            </Badge>
          ) : (
            <div key={label} className="flex flex-col items-center">
              <Button
                key={label}
                isIconOnly
                aria-label={label}
                as={href ? Link : undefined}
                className={cn("", {
                  "text-btnPrimary":
                    pathname === href ||
                    (focusingOn === FocusTargetEnum.Redeem &&
                      label === "Redeem") ||
                    (focusingOn === FocusTargetEnum.Rewards &&
                      label === "Rewards"),
                })}
                href={href}
                variant="light"
                onPress={onPress}
              >
                <Icon className="text-2xl" icon={icon} />
              </Button>
              <span className="-mt-1 text-xs text-default-700">{label}</span>
            </div>
          ),
        )}
      </div>

      <Drawer
        className=" bg-content1"
        classNames={{
          closeButton: "h-10 w-10 flex items-center justify-center",
        }}
        isOpen={isDrawerOpen}
        placement="bottom"
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerContent>
          <DrawerHeader className="border-b border-divider">Menu</DrawerHeader>
          <DrawerBody className="overflow-y-auto gap-0.5 py-4">
            {mobileMenuNavItems.map((item) => (
              <Button
                key={item.label}
                as={Link}
                className={cn(
                  "w-full justify-start bg-transparent hover:text-btnPrimary/90",
                  {
                    "text-btnPrimary": pathname === item.href,
                  },
                )}
                href={item.href || "#"}
                startContent={<Icon className="text-xl" icon={item.icon} />}
                variant="flat"
                onPress={() => {
                  setIsDrawerOpen(false);
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              className={cn(
                "w-full justify-start bg-transparent hover:!bg-transparent hover:text-btnPrimary/90 text-default-700",
                {},
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
