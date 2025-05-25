import React, { FC, useEffect } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

interface GameIntroTooltipProps {
  show: boolean;
  onClose: () => void;
}

export const GameIntroTooltip: FC<GameIntroTooltipProps> = ({
  show,
  onClose,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center pointer-events-none items-center">
      <div className="absolute inset-0 bg-black bg-opacity-80 pointer-events-auto" />

      <div className="relative bg-white text-black p-4 rounded-lg max-w-md w-full mx-4 pointer-events-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-btnPrimary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="lucide:gamepad-2" />
          </div>

          <h3 className="text-xl font-bold">Let&apos;s Play!</h3>
        </div>

        <p className="mb-4">
          Click on the game and have fun! Choose your favorite game and start
          spinning.
        </p>

        <Button
          className="w-full font-normal bg-btnPrimary text-base"
          color="primary"
          radius="sm"
          size="lg"
          variant="solid"
          onPress={onClose}
        >
          Play Now
        </Button>
      </div>
    </div>
  );
};
