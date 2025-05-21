"use client";

import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useDisclosure } from "@heroui/modal";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { isMobile } from "react-device-detect";
import { cn } from "@heroui/theme";

import { StarterPackModal } from "../signup-flow/starter-pack-modal";

import { NotificationCard } from "./notification-card";

const notifications = [
  {
    id: 1,
    type: "promotion",
    title: "🔥 Last week's hot slot",
    message: (
      <>
        Vegas Bonanza&apos;s most winning game last week was Wild Coin x9990!
        Play now and ride the hot streak!
      </>
    ),
    date: "05 May",
    time: "04:43 pm",
    isRead: true,
  },
  {
    id: 2,
    type: "offer",
    title: "Get 50,000 GC with 60% off plus 25.00 SC FREE! 🎁",
    subtitle: "",
    message: (
      <>
        <p>A special offer has arrived at YOUR door!</p>
        <p>
          Get a whopping{" "}
          <span className="bg-amber/10 text-amber">50,000 Gold Coins</span> for
          only $9.99 +{" "}
          <span className="bg-green-500/10 text-green-500">
            FREE 25.00 Sweepstakes Coins
          </span>
          .
        </p>
      </>
    ),
    date: "04 Feb",
    time: "06:22 pm",
    isRead: false,
  },
  {
    id: 3,
    type: "offer",
    title: "Get 200,000 GC for only $74.99 plus 100.00 SC FREE! 🎁",
    subtitle: "",
    message: (
      <>
        <p>A special offer has arrived at YOUR door!</p>
        <p>
          Get a whopping{" "}
          <span className="bg-amber/10 text-amber">200,000 Gold Coins</span> for
          only $74.99 +{" "}
          <span className="bg-green-500/10 text-green-500">
            FREE 100.00 Sweepstakes Coins
          </span>
          .
        </p>
      </>
    ),
    date: "04 Feb",
    time: "06:22 pm",
    isRead: false,
  },
];

export const NotificationButtons = () => {
  const starterPackDisclosure = useDisclosure();
  const notificationDrawer = useDisclosure();

  const notificationCount = notifications.length;

  const handleNotificationCardClick = () => {
    // notificationDrawer.onClose();
    starterPackDisclosure.onOpen();
  };

  return (
    <>
      <StarterPackModal
        isOpen={starterPackDisclosure.isOpen}
        onClose={starterPackDisclosure.onClose}
        // onClaimPack={starterPackDisclosure.onClose} // TODO
        onOpenChange={starterPackDisclosure.onOpenChange}
      />

      <Button
        disableRipple
        isIconOnly
        className="overflow-visible min-h-10 min-w-10"
        radius="full"
        variant="light"
        onPress={notificationDrawer.onOpenChange}
      >
        <Badge
          color="danger"
          content={notificationCount}
          showOutline={false}
          size="md"
        >
          <Icon
            className="text-default-500 min-h-[22px] min-w-[22px]"
            icon="solar:bell-linear"
            width={22}
          />
        </Badge>
      </Button>

      <Button
        disableRipple
        isIconOnly
        className="overflow-visible  min-h-10 min-w-10 rounded-full"
        variant="light"
        onPress={starterPackDisclosure.onOpen}
      >
        <Badge color="danger" content="1" showOutline={false} size="md">
          <Icon
            className="text-default-500 min-h-[22px] min-w-[22px]"
            icon="lucide:gift"
            width={24}
          />
        </Badge>
      </Button>

      <Drawer
        hideCloseButton
        className={cn("bg-black border-r border-r-divider ", {
          "border-l-divider border-l border-r-0": isMobile,
        })}
        // isDismissable={false}
        isOpen={notificationDrawer.isOpen}
        placement={isMobile ? "right" : "left"}
        size="sm"
        onOpenChange={notificationDrawer.onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-row justify-between items-center">
                <h4 className="text-xl font-bold">Notifications</h4>
                <Button
                  isIconOnly
                  className="text-default-500"
                  variant="light"
                  onPress={onClose}
                >
                  <Icon icon="lucide:x" width={24} />
                </Button>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex flex-col gap-4">
                  {notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      {...notification}
                      handleNotificationCardClick={handleNotificationCardClick}
                    />
                  ))}
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
