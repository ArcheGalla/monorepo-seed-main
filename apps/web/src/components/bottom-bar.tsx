"use client";

import { Button } from "@heroui/button";
import React, { FC, useEffect, useState } from "react";

interface BottomBarProps {
  handleAuthAction: (type: "login" | "signup") => void;
}

export const BottomBar: FC<BottomBarProps> = ({ handleAuthAction }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("hero");

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, []);

  if (isVisible) {
    return null;
  }

  return (
    <div className="fixed bg-black border-t border-divider z-[40] bottom-0 left-0 right-0 w-full p-4 sm:hidden">
      <div className="flex items-center gap-2">
        <Button
          fullWidth
          className="bg-transparent text-white border border-btnPrimary/70"
          color="default"
          size="sm"
          variant="flat"
          onPress={() => handleAuthAction("login")}
        >
          Log In
        </Button>
        <Button
          fullWidth
          className="bg-btnPrimary"
          color="primary"
          size="sm"
          onPress={() => handleAuthAction("signup")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
