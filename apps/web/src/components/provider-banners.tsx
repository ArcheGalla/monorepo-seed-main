import React from "react";
import { Card } from "@heroui/card";
import { Icon } from "@iconify/react";
import Marquee from "react-fast-marquee";
import { cn } from "@heroui/theme";

import aviatrixLogo from "../assets/provider-logos/67d7e336d08d96473b734f88_Aviatrix.svg";
import logo2 from "../assets/provider-logos/LS_Logo_Stacked_On_Black.png.webp";
import logo3 from "../assets/provider-logos/PP-white-logo.svg";
import logo4 from "../assets/provider-logos/dg-logo-700x135.png";
import logo5 from "../assets/provider-logos/logo-2.svg";
import logo6 from "../assets/provider-logos/logo.svg";
import logo7 from "../assets/provider-logos/logo_red.svg";
import logo8 from "../assets/provider-logos/rogue.png";

export const ProviderBanners: React.FC = () => {
  // Sample provider data
  const providers = [
    { id: 1, name: "Evolution Gaming", icon: "logos:evolution-gaming" },
    { id: 2, name: "NetEnt", icon: "logos:netent" },
    { id: 3, name: "Microgaming", icon: "logos:microgaming" },
    { id: 4, name: "Playtech", icon: "logos:playtech" },
    { id: 5, name: "Pragmatic Play", icon: "logos:pragmatic-play" },
    { id: 6, name: "IGT", icon: "logos:igt" },
    { id: 7, name: "Novomatic", icon: "logos:novomatic" },
    { id: 8, name: "Yggdrasil", icon: "logos:yggdrasil" },
    { id: 9, name: "Play'n GO", icon: "logos:playn-go" },
    { id: 10, name: "Betsoft", icon: "logos:betsoft" },
    { id: 11, name: "Red Tiger", icon: "logos:red-tiger" },
    { id: 12, name: "Quickspin", icon: "logos:quickspin" },
  ];

  return (
    <section className="pt-4 relative overflow-hidden">
      {/* Auto-scrolling provider logos - single row (left to right) */}
      <div className="hidden relative w-full overflow-hidden py-4 bg-gradient-to-r from-midnight/0 via-plum/10 to-midnight/0">
        <div className="flex animate-scroll-left">
          {/* All providers in a single row */}
          {providers.map((provider) => (
            <Card
              key={`provider-${provider.id}`}
              disableRipple
              className="flex-shrink-0 mx-4 w-32 h-32 bg-content1/30 backdrop-blur-sm border border-magenta/20"
            >
              <div className="p-4 flex items-center justify-center h-full">
                {provider.icon ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full p-3 flex items-center justify-center">
                      <Icon
                        className="text-4xl text-white"
                        icon="lucide:gamepad-2"
                      />
                    </div>
                    <div className="absolute bottom-2 text-xs text-white text-center w-full">
                      {provider.name}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Icon
                      className="text-4xl text-white mb-2"
                      icon="lucide:gamepad-2"
                    />
                    <span className="text-xs text-white text-center">
                      {provider.name}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {/* Duplicate set for seamless loop */}
          {providers.map((provider) => (
            <Card
              key={`provider-dup-${provider.id}`}
              disableRipple
              className="flex-shrink-0 mx-4 w-32 h-32 bg-content1/30 backdrop-blur-sm border border-magenta/20"
            >
              <div className="p-4 flex items-center justify-center h-full">
                {provider.icon ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full p-3 flex items-center justify-center">
                      <Icon
                        className="text-4xl text-white"
                        icon="lucide:gamepad-2"
                      />
                    </div>
                    <div className="absolute bottom-2 text-xs text-white text-center w-full">
                      {provider.name}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Icon
                      className="text-4xl text-white mb-2"
                      icon="lucide:gamepad-2"
                    />
                    <span className="text-xs text-white text-center">
                      {provider.name}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full">
        <div className={cn("mx-auto max-w-[1280px] py-6 md:py-10")} dir="ltr">
          <Marquee
            autoFill
            direction={"left"}
            pauseOnHover={true}
            speed={40}
            style={{
              maskImage:
                "linear-gradient(to right,#000,#000,transparent 0,#000 300px,#000 calc(100% - 300px),transparent)",
            }}
          >
            {[
              aviatrixLogo,
              logo2,
              logo3,
              logo4,
              logo5,
              logo6,
              logo7,
              logo8,
            ].map((logo, index) => (
              <div
                key={index}
                className={cn(
                  "mx-[35px] flex h-[100px] w-[150px] items-center justify-center text-white opacity-[0.6]",
                  {
                    "w-[52px]": index === 1,
                    "w-[40px]": index === 7,
                  },
                )}
              >
                <img
                  alt="provider logo"
                  className="object-contain"
                  src={logo.src}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </section>
  );
};
