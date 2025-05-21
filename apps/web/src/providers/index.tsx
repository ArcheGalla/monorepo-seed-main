"use client";

import React from "react";

import { HeroUIProviderWrapper } from "@/providers/hero-ui";
import { TanstackQueryProvider } from "@/providers/tanstack-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProviderWrapper
      themeProps={{ attribute: "class", defaultTheme: "light" }}
    >
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </HeroUIProviderWrapper>
  );
}
