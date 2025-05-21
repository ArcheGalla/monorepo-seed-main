"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@heroui/modal";

import { OfferModal } from "./offer-modal";
import { FourGameGrid } from "./four-game-grid";

import { WelcomeModal } from "@/modules/auth/welcome-modal";
import { AuthModal } from "@/modules/auth/auth-modal";
import main1 from "@/assets/VB_Web_HeroMale2.webp";
import main2 from "@/assets/VB_Web_HeroFemale3.webp";
import main3 from "@/assets/VB_Web_Smartphone3.webp";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage";
import gcCoin from "@/assets/gc-icon.png";
import scCoin from "@/assets/sc-icon.png";

export const HeroSection: React.FC = () => {
  const [type, setType] = useState<"login" | "signup" | null>(null);

  const welcomeDisclosure = useDisclosure();
  const authDisclosure = useDisclosure();

  const handleWelcomeAccept = () => {
    welcomeDisclosure.onClose();
    authDisclosure.onOpen();
  };

  const handleAuthAction = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HasSeenMainPageOfferModal, "true");
    setType("signup");
    welcomeDisclosure.onOpen();
  };

  return (
    <>
      <section className="relative overflow-hidden" id="hero">
        <div className="px-4 pt-28 pb-10 md:pb-32 relative z-10 max-w-screen-xl w-full mx-auto">
          <Image
            removeWrapper
            alt="man"
            className="!opacity-50 min-[365px]:!opacity-100 w-[200px] h-[200px] min-[400px]:w-[215px] min-[400px]:h-[215px] min-[470px]:h-[260px] min-[470px]:w-[260px] object-cover z-0 absolute bottom-0 -right-4 min-[420px]:-right-2 md:-left-4 lg:left-10 xl:left-20 md:right-auto md:w-[300px] md:h-[300px] xl:w-[350px] xl:h-[350px] "
            src={main1.src}
          />
          <Image
            removeWrapper
            alt="woman"
            className="hidden md:block w-[300px] h-[300px] object-cover z-0 absolute bottom-0 -right-10 xl:right-20 lg:right-10 md:left-auto xl:w-[350px] xl:h-[350px]"
            src={main2.src}
          />

          <div className="z-[3] relative flex flex-col lg:flex-row lg:gap-24 lg:items-center lg:justify-center lg:px-4">
            <div className="text-left md:text-center">
              <h1>
                <span className="text-5xl uppercase font-extrabold mt-4 xl:text-6xl min-[425px]:leading-[42px] sm:leading-[55px] xl:leading-[75px]">
                  <span className="font-extrabold">#1 </span>
                  VEGAS <br className="sm:hidden" /> STYLE
                </span>
                <br className="" />
                <span className="mt-2 block sm:mt-0 font-bold whitespace-nowrap text-2xl sm:text-3xl md:text-4xl xl:text-5xl">
                  SOCIAL CASINO
                </span>
              </h1>

              <p className="mt-2 min-[500px]:mt-4 text-base sm:text-xl xl:text-xl text-white mb-6">
                Vegas Vibes. Zero Cost. All in.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 xl:mt-10">
                <Button
                  className="bg-btnPrimary hover:bg-btnPrimary/90 text-base rounded-small mr-auto md:mx-auto xl:min-w-[225px] min-h-12 min-w-0 px-4 sm:px-6 sm:min-w-24 gap-1 sm:gap-3"
                  color="primary"
                  size="lg"
                  startContent={
                    <span className="min-h-5 min-w-5">
                      <Icon className="h-5 w-5" icon="lucide:zap" />
                    </span>
                  }
                  onPress={handleAuthAction}
                >
                  {/* Join Now */}
                  Join Now For Free
                  {/* <span className="hidden min-[400px]:inline">For Free</span> */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd section */}
      <section className="py-6 sm:py-10 flex flex-col items-center overflow-hidden relative">
        <div className="relative z-[1] flex flex-col items-center">
          <div className="flex items-center gap-3">
            <h2 className="uppercase text-center leading-5 text-base font-semibold md:text-2xl sm:text-3xl lg:text-4xl">
              <span className="flex gap-1.5 justify-center items-center">
                <img
                  alt="Coin"
                  className="w-4 h-4 sm:w-7 sm:h-7"
                  src={gcCoin.src}
                />
                <span className="text-amber">Free To Play</span>
                <img
                  alt="Coin"
                  className="w-4 h-4 sm:w-7 sm:h-7"
                  src={gcCoin.src}
                />
              </span>
              Vegas Style Games
            </h2>
          </div>
          <FourGameGrid />

          <div className="flex flex-col items-center">
            <h2 className="text-center leading-10 text-[44px] sm:text-5xl uppercase font-extrabold mt-4 xl:text-6xl m-2 mb-6">
              NO PURCHASE <br /> NECESSARY!
            </h2>
            <p className="mb-6 uppercase text-2xl font-semibold border-b-2 border-amber pb-2">
              Free to Play <span className="text-amber">Forever!</span>
            </p>

            <div className="relative mt-7 mb-3 sm:-mt-5">
              {/* coins */}
              <div className="sm:hidden">
                {/* left coins */}
                <img
                  alt="Coin"
                  className="w-7 h-7 absolute left-[6rem] -top-[2rem]"
                  src={gcCoin.src}
                />
                <img
                  alt="Coin"
                  className="w-5 h-5 absolute left-[4rem] -top-2"
                  src={scCoin.src}
                />
                <img
                  alt="Coin"
                  className="w-4 h-4 absolute left-[1rem] -top-3"
                  src={gcCoin.src}
                />
                <img
                  alt="Coin"
                  className="w-7 h-7 absolute -left-[1rem] top-0"
                  src={scCoin.src}
                />
                <img
                  alt="Coin"
                  className="w-10 h-10 absolute -left-[3rem] top-[3rem]"
                  src={gcCoin.src}
                  style={{
                    transform: "rotateY(-13deg) rotateX(-11deg)",
                  }}
                />
                <img
                  alt="Coin"
                  className="w-5 h-5 absolute -left-10 top-[7rem]"
                  src={scCoin.src}
                  style={{
                    transform: "rotateY(-10deg) rotateX(12deg)",
                  }}
                />
                <img
                  alt="Coin"
                  className="w-8 h-8 absolute -left-[1.5rem] top-[9rem]"
                  src={gcCoin.src}
                  style={{
                    transform: "rotateY(-21deg) rotateX(-14deg)",
                  }}
                />
                {/* right coins */}
                <img
                  alt="Coin"
                  className="w-8 h-8 absolute right-0 top-0"
                  src={gcCoin.src}
                  style={{
                    transform: "rotateY(-15deg) rotateX(14deg)",
                  }}
                />
                <img
                  alt="Coin"
                  className="w-5 h-5 absolute -right-[1rem] top-[1.8rem]"
                  src={scCoin.src}
                />
                <img
                  alt="Coin"
                  className="w-8 h-8 absolute -right-[2.2rem] top-[5rem]"
                  src={gcCoin.src}
                  style={{
                    transform: "rotateY(-15deg) rotateX(14deg)",
                  }}
                />
                <img
                  alt="Coin"
                  className="w-4 h-4 absolute -right-[1rem] top-[7.5rem]"
                  src={scCoin.src}
                  style={{
                    transform: "rotateY(-15deg) rotateX(24deg)",
                  }}
                />
              </div>

              <Image
                removeWrapper
                alt="smartphone"
                className="w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] sm:mb-6 object-cover z-0"
                src={main3.src}
              />
            </div>

            <Button
              className="bg-btnPrimary hover:bg-btnPrimary/90 text-base rounded-small mx-auto xs:min-w-[200px] xl:min-w-[225px] min-h-12"
              color="primary"
              size="lg"
              startContent={
                <span className="min-h-5 min-w-5">
                  <Icon className="h-5 w-5" icon="lucide:zap" />
                </span>
              }
              onPress={handleAuthAction}
            >
              Join Now to Play For Free
            </Button>
          </div>
        </div>
      </section>

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

      <OfferModal />
    </>
  );
};
