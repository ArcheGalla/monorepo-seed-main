"use client";

import React, { useState } from "react";
import { useDisclosure } from "@heroui/modal";
import { Navbar, NavbarContent, NavbarBrand } from "@heroui/navbar";
import { Button } from "@heroui/button";

import { MobileDrawerMenu } from "./mobile-drawer-menu";

import { Logo } from "@/components/atoms/logo";
import { WelcomeModal } from "@/modules/auth/welcome-modal";
import { AuthModal } from "@/modules/auth/auth-modal";
import { BottomBar } from "@/components/bottom-bar";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage";

const MENU_ITEMS = [
  { name: "Games", href: "/games", icon: "lucide:joystick" },
  { name: "Promotions", href: "/promotions", icon: "lucide:gift" },
  { name: "VIP Program", href: "/vip", icon: "lucide:crown" },
  {
    name: "Responsible Gaming",
    href: "/responsible-gaming",
    icon: "lucide:shield",
  },
  { name: "Support", href: "/help-center", icon: "lucide:help-circle" },
];

export const MainNavbar: React.FC = () => {
  const { isOpen: isDrawerOpen, onOpenChange: onDrawerOpenChange } =
    useDisclosure();

  const welcomeDisclosure = useDisclosure();
  const authDisclosure = useDisclosure();

  const [type, setType] = useState<"login" | "signup" | null>(null);

  const handleWelcomeAccept = () => {
    welcomeDisclosure.onClose();
    authDisclosure.onOpen();
  };

  const handleAuthAction = (type: "login" | "signup") => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HasSeenMainPageOfferModal, "true");
    setType(type);
    if (type === "login") {
      authDisclosure.onOpen();
    } else {
      welcomeDisclosure.onOpen();
    }
  };

  return (
    <>
      <BottomBar handleAuthAction={handleAuthAction} />

      <Navbar
        // className="bg-midnight/70 backdrop-blur-md"
        className="bg-transparent absolute top-5"
        classNames={{
          // wrapper: "max-w-[1536px] pl-0 pr-4",
          wrapper: "max-w-screen-lg pl-0 pr-4 md:pr-14",
        }}
        isBlurred={false}
        isMenuOpen={isDrawerOpen}
        maxWidth="xl"
        onMenuOpenChange={onDrawerOpenChange}
      >
        <NavbarContent>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="gap-4" justify="end">
          <div className="flex items-center gap-2">
            <Button
              className="bg-transparent text-white border border-btnPrimary/70"
              color="default"
              size="sm"
              variant="flat"
              onPress={() => handleAuthAction("login")}
            >
              Log In
            </Button>
            <Button
              className="bg-btnPrimary"
              color="primary"
              size="sm"
              onPress={() => handleAuthAction("signup")}
            >
              Sign Up
            </Button>
          </div>

          {/* <div className="hidden sm:block sm:h-full">
            <NavbarMenuToggle
              aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
              className="text-white"
            />
          </div> */}
        </NavbarContent>
      </Navbar>

      <MobileDrawerMenu
        isOpen={isDrawerOpen}
        menuItems={MENU_ITEMS}
        onAuthAction={handleAuthAction}
        onOpenChange={onDrawerOpenChange}
        // onSupportNavigate={handleStartupFlow}
      />

      <WelcomeModal
        isOpen={welcomeDisclosure.isOpen}
        onAccept={handleWelcomeAccept}
        onOpenChange={welcomeDisclosure.onOpenChange}
      />

      <AuthModal
        isOpen={authDisclosure.isOpen}
        setType={setType}
        type={type}
        onOpenChange={authDisclosure.onOpenChange}
      />
    </>
  );
};
