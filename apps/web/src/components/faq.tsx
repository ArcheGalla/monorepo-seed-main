"use client";

import React from "react";

import { FaqItems } from "./faq-items";

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I sign up?",
      answer:
        "Signing up is easy! Click the 'Sign Up' button at the top of the page, fill in your details, and you'll be playing in minutes. No credit card required.",
    },
    {
      question: "How do I claim daily bonuses?",
      answer:
        "Log in daily and you'll automatically receive a notification about your daily bonus. Click 'Claim' to add the coins to your account.",
    },
    {
      question: "Is real money required to play?",
      answer:
        "No! VegasBonanza is completely free to play. While you can purchase additional coins if you wish, you'll receive free coins daily just for logging in.",
    },
    {
      question: "How do I join the VIP program?",
      answer:
        "Our VIP program is based on your activity. The more you play, the higher your VIP level will become, unlocking additional benefits and bonuses.",
    },
    {
      question: "Can I play on mobile devices?",
      answer:
        "Yes! VegasBonanza is fully optimized for mobile play. Access the site from your mobile browser or download our app from the App Store or Google Play.",
    },
    {
      question: "How do I redeem my Sweepstakes Coins?",
      answer:
        "To redeem your Sweepstakes Coins, navigate to the 'Rewards' section in your account dashboard and follow the redemption instructions.",
    },
    {
      question:
        "What's the difference between Gold Coins and Sweepstakes Coins?",
      answer:
        "Gold Coins are used for playing games and cannot be redeemed for prizes. Sweepstakes Coins are promotional tokens that can be used to play games and may be redeemed for prizes in eligible jurisdictions.",
    },
    {
      question: "Are there any purchase limits?",
      answer:
        "Yes, we have responsible gaming limits in place. You can also set your own purchase limits in your account settings.",
    },
  ];

  return (
    <section className="relative flex flex-col">
      {/* FAQ Section */}
      <div className="relative z-[3]">
        <div className="py-10 lg:py-20 lg:container mx-auto px-6 lg:px-0">
          {/* <section className="mx-auto w-full max-w-screen-xl" id="faq"> */}
          <div
            className="flex w-full max-w-screen-xl flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-12 xl:px-4"
            id="faq"
          >
            {/* <h2 className="px-2 pt-4 text-3xl font-bold leading-7 tracking-tight lg:inline-block lg:text-5xl  bg-gradient-to-b from-[#FFE783] to-[#E78D00] bg-clip-text text-transparent"> */}
            <h2 className="px-2 pt-4 text-3xl font-bold leading-7 tracking-tight lg:inline-block lg:text-5xl">
              <span className="inline-block lg:hidden">FAQ</span>
              <span className="hidden lg:block">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </span>
            </h2>
            <FaqItems questions={faqs} />
          </div>
          {/* </section> */}
        </div>
      </div>
    </section>
  );
};
