import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Icon } from "@iconify/react";

interface HeaderProps {
  balances: {
    crownCoins: number;
    sweepsCash: number;
  };
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({ balances, currentStep }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const showRewardsPulse = currentStep >= 6;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }

    return num.toString();
  };

  const menuItems = [
    { name: "Home", icon: "lucide:home" },
    { name: "Top Games", icon: "lucide:trophy" },
    { name: "New Releases", icon: "lucide:sparkles" },
    { name: "Exclusive", icon: "lucide:star" },
    { name: "Early Bird", icon: "lucide:alarm-clock" },
    { name: "Slots", icon: "lucide:dices" },
    {
      name: "Rewards",
      icon: "lucide:gift",
      highlight: showRewardsPulse,
      badge: showRewardsPulse ? "NEW" : undefined,
    },
    { name: "Bonuses", icon: "lucide:percent" },
  ];

  return (
    <Navbar
      className="bg-content1 border-b border-content2 fixed top-0 z-40"
      height="4rem"
      maxWidth="full"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="font-bold text-xl bg-gradient-to-r from-primary-400 to-warning-400 bg-clip-text text-transparent neon-text">
              VegasBonanza
            </span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Button
              className={`${item.highlight ? "pulse2 text-primary" : ""}`}
              color="default"
              startContent={
                <Icon
                  className={item.highlight ? "text-primary" : ""}
                  icon={item.icon}
                />
              }
              variant="light"
            >
              {item.badge ? (
                <Badge color="primary" content={item.badge} size="sm">
                  {item.name}
                </Badge>
              ) : (
                item.name
              )}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {balances.crownCoins > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-content2 rounded-full px-3 py-1">
              <Icon className="text-warning mr-1" icon="lucide:crown" />
              <span className="text-warning font-semibold">
                {formatNumber(balances.crownCoins)}
              </span>
            </div>

            <div className="flex items-center bg-content2 rounded-full px-3 py-1">
              <Icon className="text-secondary mr-1" icon="lucide:dollar-sign" />
              <span className="text-secondary font-semibold">
                {balances.sweepsCash.toFixed(1)}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="font-semibold" color="primary" variant="solid">
            SIGN UP
          </Button>
          <Button className="font-semibold" color="default" variant="bordered">
            LOG IN
          </Button>
        </div>
      </NavbarContent>

      <NavbarMenu className="bg-content1">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Button
              className={`w-full justify-start ${item.highlight ? "text-primary" : ""}`}
              color="default"
              startContent={
                <Icon
                  className={item.highlight ? "text-primary" : ""}
                  icon={item.icon}
                />
              }
              variant="light"
            >
              {item.badge ? (
                <Badge color="primary" content={item.badge} size="sm">
                  {item.name}
                </Badge>
              ) : (
                item.name
              )}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
