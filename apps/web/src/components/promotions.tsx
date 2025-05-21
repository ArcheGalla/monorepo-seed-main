import React, { FC } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import promoImg from "@/assets/3_people_bonus.webp";

export const Promotions: FC = () => {
  return (
    <div className="">
      <section
        className="pt-20 pb-8 lg:py-16 relative container mx-auto"
        id="promotions"
      >
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:justify-around lg:items-center">
          {/* Casino character image  */}
          <div className="relative hidden lg:block">
            <img
              alt="Casino Winners"
              className="rounded-xl shadow-2xl shadow-magenta/20 z-20 object-cover !h-[300px] !w-[300px] xl:!h-[400px] xl:!w-[400px]"
              height={400}
              src={promoImg.src}
              width={400}
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-magenta via-gold to-emerald rounded-xl blur-md -z-10 opacity-70" />
          </div>
          {/* Text content */}
          <div className="text-center lg:max-w-[52%] lg:order-first lg:text-left px-4">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="mb-1">
                <Icon
                  className="text-btnPrimary"
                  height="34"
                  icon="lucide:gift"
                  width="34"
                />
              </div>
              <div className="w-full md:w-1/3 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold text-center">
                    <span className="">150%</span>
                  </div>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold   mb-3">
                Welcome Bonus
              </h3>
            </div>

            <p className="text-xl text-platinum mb-6">
              Get 150% Extra Gold Coins on Your First Play! Sign up now and
              start with a massive bonus to boost your gameplay experience.
            </p>

            <div className="mb-8 lg:mb-0">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 xl:mt-10 lg:justify-start">
                <Button
                  as="a"
                  className="bg-btnPrimary hover:bg-btnPrimary/90 text-base rounded-small mx-auto xs:min-w-[200px] xl:min-w-[225px] min-h-12"
                  color="primary"
                  href="#hero"
                  size="lg"
                  startContent={
                    <span className="min-w-5 min-h-5">
                      <Icon className="h-5 w-5" icon="lucide:gift" />
                    </span>
                  }
                >
                  Join Now to Get 150% Extra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
