"use client";

import { FC, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/libs/tanstack";

interface ITanstackQueryProvider {
  children: ReactNode;
}

export const TanstackQueryProvider: FC<Readonly<ITanstackQueryProvider>> = (
  props,
) => {
  const { children } = props;

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
