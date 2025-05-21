"use client";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/modal";
import { useRouter } from "next/navigation";

import { CreateAccountModal } from "./signup-flow/create-account-modal";
import { WelcomeBonusModal } from "./signup-flow/welcome-bonus-modal";
import { StarterPackModal } from "./signup-flow/starter-pack-modal";
import { DailyBonusModal } from "./signup-flow/daily-bonus-modal";
import { CurrencyTooltip } from "./signup-flow/currency-tooltip";
import { GameIntroTooltip } from "./signup-flow/game-intro-tooltip";
import { PhoneModal } from "./signup-flow/phone-modal";
import { NavTooltip } from "./signup-flow/nav-tooltip";

import { useAppStore } from "@/store/useAppStore";
import { useUserStore } from "@/store/useUserStore";
import { EmailVerificationModal } from "@/modules/auth/email-verification-modal";
import { WelcomeModal } from "@/modules/auth/welcome-modal";
import { CurrencyEnum } from "@/types/currency";
import { FocusTargetEnum } from "@/types/focus-target";

export const SignupFlow = ({
  resetKey,
  step = 0,
}: {
  resetKey: number;
  step?: number;
}) => {
  const router = useRouter();
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [showCurrencyToolTip, setShowCurrencyToolTip] = useState(false);
  const [showNavTooltip, setShowNavTooltip] = useState(false);
  const [showGameTooltip, setShowGameTooltip] = useState(false);

  const phoneNumberDisclosure = useDisclosure();
  const welcomeDisclosure = useDisclosure();
  const accountDisclosure = useDisclosure();
  const emailVerificationDisclosure = useDisclosure();
  const welcomeBonusDisclosure = useDisclosure();
  const starterPackDisclosure = useDisclosure();
  const dailyBonusDisclosure = useDisclosure();

  const { setIsAnimatingWallet, setFocusingOn } = useAppStore();

  const { wallet, setWallet, setSelectedCurrency } = useUserStore();

  // Start the onboarding flow
  // useEffect(() => {
  //   if (step !== 3) {
  //     welcomeDisclosure.onOpen();
  //   }
  // }, [resetKey]);

  useEffect(() => {
    if (step === 2) {
      setWallet({
        gc: 100000,
        sc: 2,
      });
      setSelectedCurrency(CurrencyEnum.GC);
      setFocusingOn(null);
      setIsAnimatingWallet(false);

      return phoneNumberDisclosure.onOpen();
    }

    if (step === 3) {
      setWallet({
        gc: 100000,
        sc: 2,
      });
      setSelectedCurrency(CurrencyEnum.GC);
      setFocusingOn(null);
      setIsAnimatingWallet(false);

      return welcomeBonusDisclosure.onOpen();
    }
    welcomeDisclosure.onOpen();
  }, [step]);

  const handlePhoneSubmit = () => {
    phoneNumberDisclosure.onClose();
    window.scrollTo(0, 0);
    welcomeBonusDisclosure.onOpen();
  };

  const handleWelcomeAccept = () => {
    welcomeDisclosure.onClose();
    accountDisclosure.onOpen();
  };

  const handleAccountCreated = (email: string) => {
    accountDisclosure.onClose();
    emailVerificationDisclosure.onOpen();
  };

  const handleClaimBonus = () => {
    setIsAnimatingWallet(true);

    // Show toast notification
    // addToast({
    //   title: "Bonus Added!",
    //   description: "100,000 GC + 2 SC have been added to your account.",
    //   color: "success",
    // });

    setTimeout(() => {
      setWallet({
        gc: wallet.gc + 100000,
        sc: wallet.sc + 2,
      });
    }, 1500);

    // After animation, show starter pack
    setTimeout(() => {
      welcomeBonusDisclosure.onClose();
      starterPackDisclosure.onOpen();
      setIsAnimatingWallet(false);
    }, 4500);
  };

  const handleSkipOrClosePack = () => {
    setFocusingOn(FocusTargetEnum.Currency);
    starterPackDisclosure.onClose();
    setShowCurrencyToolTip(true);
  };

  const handleClaimPack = () => {
    setIsAnimatingWallet(true);
    setTimeout(() => {
      setWallet({
        gc: wallet.gc + 100000,
        sc: wallet.sc + 2,
      });
    }, 1500);

    setTimeout(() => {
      starterPackDisclosure.onClose();
      setShowCurrencyToolTip(true);
      setIsAnimatingWallet(false);
    }, 4500);
  };

  const handleCurrencyTooltipClosed = () => {
    setShowCurrencyToolTip(false);
    setSelectedCurrency(CurrencyEnum.GC);
    setShowNavTooltip(true);
    setFocusingOn(FocusTargetEnum.Redeem);
  };

  const handleNavTooltipClosed = () => {
    setFocusingOn(null);
    setShowNavTooltip(false);
    dailyBonusDisclosure.onOpen();
    setFocusingOn(FocusTargetEnum.Day1);
  };

  const handleDailyBonusClaimed = () => {
    setIsAnimatingWallet(true);

    setTimeout(() => {
      setWallet({
        gc: wallet.gc + 100000,
        sc: wallet.sc + 2,
      });
    }, 1500);

    setTimeout(() => {
      setFocusingOn(null);
      dailyBonusDisclosure.onClose();
      setShowGameTooltip(true);
      setIsAnimatingWallet(false);
    }, 4500);
  };

  const handleGameTooltipClosed = () => {
    setFocusingOn(null);
    setIsAnimatingWallet(false);
    setSelectedCurrency(CurrencyEnum.GC);
    setShowGameTooltip(false);
  };

  useEffect(() => {
    setShowCoinAnimation(false);
  }, [starterPackDisclosure.isOpen]);

  return (
    <>
      {/* Modals */}
      <WelcomeModal
        isOpen={welcomeDisclosure.isOpen}
        onAccept={handleWelcomeAccept}
        onOpenChange={welcomeDisclosure.onOpenChange}
      />

      <CreateAccountModal
        isOpen={accountDisclosure.isOpen}
        onAccountCreated={handleAccountCreated}
        onOpenChange={accountDisclosure.onOpenChange}
      />

      <EmailVerificationModal
        email="example@gmail.com"
        isOpen={emailVerificationDisclosure.isOpen}
        onOpenChange={emailVerificationDisclosure.onOpenChange}
      />

      <PhoneModal
        isOpen={phoneNumberDisclosure.isOpen}
        onConfirm={handlePhoneSubmit}
        onOpenChange={phoneNumberDisclosure.onOpenChange}
      />

      <WelcomeBonusModal
        isOpen={welcomeBonusDisclosure.isOpen}
        onClaimBonus={handleClaimBonus}
        onOpenChange={welcomeBonusDisclosure.onOpenChange}
      />

      <StarterPackModal
        isOpen={starterPackDisclosure.isOpen}
        onClose={handleSkipOrClosePack}
        onOpenChange={starterPackDisclosure.onOpenChange}
      />

      <DailyBonusModal
        isOpen={dailyBonusDisclosure.isOpen}
        onClaim={handleDailyBonusClaimed}
        onOpenChange={dailyBonusDisclosure.onOpenChange}
      />

      {/* Tooltips */}
      <CurrencyTooltip
        show={showCurrencyToolTip}
        onClose={handleCurrencyTooltipClosed}
      />
      <NavTooltip show={showNavTooltip} onClose={handleNavTooltipClosed} />
      <GameIntroTooltip
        show={showGameTooltip}
        onClose={handleGameTooltipClosed}
      />

      {/* Animations */}
      {/* {showCoinAnimation && <CoinAnimation onComplete={() => setShowCoinAnimation(false)} />} */}
    </>
  );
};
