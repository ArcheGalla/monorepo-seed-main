"use client";

import React, { FC, useEffect } from "react";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";

interface OnboardingTooltipProps {
  show: boolean;
  onClose: () => void;
  text: React.ReactNode;
  buttonText: string;
  containerClassName?: string;
  triangleClassName?: string;
  backdropClassName?: string;
}

export const OnboardingTooltip: FC<OnboardingTooltipProps> = ({
  show,
  onClose,
  text,
  buttonText,
  containerClassName = "",
  triangleClassName = "",
  backdropClassName = "",
}) => {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black bg-opacity-80 pointer-events-auto z-50",
          backdropClassName,
        )}
      />

      {/* Tooltip container */}
      <div
        className={cn(
          "absolute bg-white p-6 rounded-lg max-w-sm w-full pointer-events-auto z-[52] text-black",
          containerClassName,
        )}
      >
        {/* Triangle pointer */}
        <div
          className={cn(
            "absolute border-[20px] border-transparent",
            triangleClassName,
          )}
        />

        {/* Content */}
        <p className="mb-4 text-center">{text}</p>

        <Button
          className="w-full font-normal bg-btnPrimary text-white text-base h-12"
          color="secondary"
          radius="sm"
          size="lg"
          variant="solid"
          onPress={onClose}
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};
