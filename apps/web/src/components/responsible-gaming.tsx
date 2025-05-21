import React from "react";
import { Icon } from "@iconify/react";

export const ResponsibleGaming: React.FC = () => {
  return (
    <section className="py-16 bg-content1 relative" id="responsible-gaming">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-white">Responsible Gaming</span>
          </h2>
          <p className="text-platinum max-w-2xl mx-auto">
            At VegasBonanza, we&apos;re committed to providing a safe and
            responsible gaming environment. We want our players to enjoy our
            games in a healthy and balanced way.
          </p>
        </div>

        {/* 18+ Icon */}
        <div className="flex justify-center items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-plum to-magenta flex items-center justify-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-content1 flex items-center justify-center">
              <div className="text-center">
                <Icon
                  className="text-magenta text-4xl md:text-6xl mb-2"
                  icon="lucide:ban"
                />
                <p className="text-white font-bold text-2xl md:text-3xl">18+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-72 h-72 rounded-full bg-magenta/10 blur-3xl -z-10" />
      <div className="absolute bottom-40 right-0 w-72 h-72 rounded-full bg-plum/20 blur-3xl -z-10" />
    </section>
  );
};
