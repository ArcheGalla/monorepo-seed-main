import { create } from "zustand";

import { FocusTargetEnum } from "@/types/focus-target";

interface AppStore {
  isAnimatingWallet: boolean;
  setIsAnimatingWallet: (value: boolean) => void;
  focusingOn: FocusTargetEnum | null;
  setFocusingOn: (value: FocusTargetEnum | null) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  isAnimatingWallet: false,
  setIsAnimatingWallet: (value) =>
    set((state) => ({ isAnimatingWallet: value })),
  focusingOn: null,
  setFocusingOn: (value) => set((state) => ({ focusingOn: value })),
}));
