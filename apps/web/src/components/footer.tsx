"use client";

import React from "react";
import { Link } from "@heroui/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { cn } from "@heroui/theme";

import { Logo } from "@/components/atoms/logo";
import { VisaLogo } from "@/components/atoms/icons/payment-methods/visa";
import { MastercardLogo } from "@/components/atoms/icons/payment-methods/mastercard";
import { ApplePayLogo } from "@/components/atoms/icons/payment-methods/apple-pay";
import { PayPalLogo } from "@/components/atoms/icons/payment-methods/paypal";
import { GooglePayLogo } from "@/components/atoms/icons/payment-methods/google-pay";

export const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Games", href: "#games" },
        { name: "Promotions", href: "#promotions" },
        { name: "VIP Program", href: "#vip" },
        { name: "Responsible Gaming", href: "#responsible-gaming" },
        { name: "FAQ", href: "#support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Responsible Gaming", href: "#responsible-gaming" },
        { name: "Sweepstakes Rules", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Partners", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "ic:outline-facebook", href: "#signup" },

    { icon: "line-md:twitter-x", href: "#signup" },
    { icon: "lucide:instagram", href: "#signup", isWhite: true },
  ];

  const pathname = usePathname();

  return (
    <footer className="bg-midnight/80 pt-16 pb-8 border-t border-magenta/20">
      <div
        className={cn("mx-auto px-4", {
          "px-6 pb-12": pathname.includes("/lobby"),
          container: !pathname.includes("/lobby"),
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <Logo imageClassName="object-cover w-[90px] h-[45px] rounded-none z-[1]" />
            </div>
            <p className="text-default-600 mb-4 max-w-md">
              Experience the thrill of Vegas-style casino games for free! Play
              slots, table games, and more with daily bonuses and exciting
              rewards.
            </p>

            {/* Social Links */}
            <div className="mb-4">
              <h4 className="text-white font-bold mb-2">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    className="text-default-700 hover:text-white"
                    href={social.href}
                  >
                    <Icon
                      className={`text-2xl ${social.isWhite ? "text-white" : ""}`}
                      icon={social.icon}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-white font-bold mb-3 text-sm lg:text-base">
                {column.title}
              </h4>
              <ul className="space-y-1">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      className="text-default-600 hover:text-btnPrimary transition-colors flex items-center text-sm"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods moved to left side */}
        <div className="border-t border-content2 pt-6 pb-6 gap-3 flex-col flex sm:flex-row sm:justify-between pr-4">
          <div className="text-left">
            <h4 className="text-white font-bold mb-2 text-sm">
              Secure Payment Options
            </h4>

            <div className="flex flex-col gap-2">
              <div className="max-w-2xl text-left text-small text-default-600">
                <div className="justify-left grow-1 flex gap-1.5 [&_svg]:h-[25px] [&_svg]:w-[38px]">
                  <div className="flex h-8 w-[46px] items-center justify-center rounded-lg bg-white">
                    <VisaLogo />
                  </div>
                  <div className="flex h-8 w-[46px] items-center justify-center rounded-lg bg-white">
                    <MastercardLogo />
                  </div>
                  <div className="flex h-8 w-[46px] items-center justify-center rounded-lg bg-white">
                    <PayPalLogo />
                  </div>
                  <div className="flex h-8 w-[46px] items-center justify-center rounded-lg bg-white">
                    <ApplePayLogo />
                  </div>
                  <div className="flex h-8 w-[46px] items-center justify-center rounded-lg bg-white">
                    <GooglePayLogo />
                  </div>
                </div>
                {/* <span className="hidden">{process.env.NEXT_PUBLIC_CF_ENV}</span> */}
              </div>
            </div>
          </div>
          {/* Responsible Gaming  */}
          <div className="flex gap-2 flex-col items-start sm:items-end">
            <span className="text-white text-sm font-bold">
              Responsible Gaming
            </span>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-plum to-magenta flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-content1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-bold">18+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-content2 pt-6 text-center">
          <div className="mb-4">
            <p className="text-default-600 text-xs mb-2">
              <Icon className="inline mr-1" icon="lucide:alert-circle" />
              This is a social casino platform. No real money gambling is
              conducted on this site.
            </p>
            <p className="text-default-600 text-xs">
              <Icon className="inline mr-1" icon="lucide:shield" />
              Age restriction: 18+ (or 21+ depending on your region)
            </p>
          </div>
          <p className="text-default-600 text-xs">
            &copy; {new Date().getFullYear()} VegasBonanza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
