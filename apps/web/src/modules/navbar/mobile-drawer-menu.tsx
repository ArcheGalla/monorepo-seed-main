// components/layout/header/MobileDrawerMenu.tsx
import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";

import { Logo } from "@/components/atoms/logo";

export interface MenuItem {
  name: string;
  href: string;
  icon: string;
}

interface MobileDrawerMenuProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  menuItems: MenuItem[];
  onAuthAction: (type: "login" | "signup") => void;
  // onSupportNavigate: () => void;
}

export const MobileDrawerMenu: React.FC<MobileDrawerMenuProps> = ({
  isOpen,
  onOpenChange,
  menuItems,
  onAuthAction,
  // onSupportNavigate,
}) => {
  return (
    <Drawer
      className="right-to-left-drawer"
      hideCloseButton={true}
      isOpen={isOpen}
      placement="right"
      size="xs"
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="bg-midnight/95 backdrop-blur-lg">
        {(onClose) => (
          <>
            <DrawerHeader className="border-b border-magenta/20 flex justify-between items-center">
              <Logo imageClassName="object-cover w-[90px] h-[45px] rounded-none" />
              <Button
                isIconOnly
                className="text-white"
                variant="light"
                onPress={onClose}
              >
                <Icon className="text-lg" icon="lucide:x" />
              </Button>
            </DrawerHeader>
            <DrawerBody className="pt-6">
              <div>
                {menuItems.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="group">
                    <Link
                      className="flex items-center gap-3 py-2 text-white hover:text-btnPrimary transition-colors duration-200"
                      href={item.href}
                      onPress={() => {
                        // if (item.name === "Support") {
                        //   onSupportNavigate();
                        // }
                        onClose();
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-plum/30 flex items-center justify-center">
                        <Icon className="text-lg" icon={item.icon} />
                      </div>
                      <span className="text-lg font-medium">{item.name}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </DrawerBody>
            <DrawerFooter className="border-t border-magenta/20 flex flex-col gap-4">
              <Button
                className="w-full bg-transparent text-white border border-btnPrimary/70"
                color="default"
                startContent={<Icon icon="lucide:log-in" />}
                variant="flat"
                onPress={() => {
                  onAuthAction("login");
                  onClose();
                }}
              >
                Log In
              </Button>
              <Button
                className="w-full bg-btnPrimary text-white"
                color="primary"
                startContent={<Icon icon="lucide:user-plus" />}
                variant="flat"
                onPress={() => {
                  onAuthAction("signup");
                  onClose();
                }}
              >
                Sign Up
              </Button>
              <div className="text-xs text-center text-platinum/60 mt-2">
                <p>
                  © {new Date().getFullYear()} VegasBonanza. All rights
                  reserved.
                </p>
                <p>18+ | Play Responsibly</p>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
