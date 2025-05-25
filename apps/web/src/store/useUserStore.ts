import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IUser } from "@/types/user";
import { CurrencyEnum } from "@/types/currency";

interface UserStore {
  full_name: string | null;
  email: string | null;
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  selectedCurrency: CurrencyEnum;
  setSelectedCurrency: (currency: CurrencyEnum) => void;
  wallet: {
    gc: number;
    sc: number;
  };
  setWallet: (amount: { gc: number; sc: number }) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      full_name: null,
      email: null,
      user: null,
      setUser: (user) =>
        set({
          user,
          full_name: user.full_name,
          email: user.email,
          wallet: {
            gc:
              user.wallets.find((w) => w.currency_type === "gold")?.balance ||
              0,
            sc:
              (user.wallets.find(
                (w) => w.currency_type === "sweepstake_redeemable",
              )?.balance || 0) +
              (user.wallets.find(
                (w) => w.currency_type === "sweepstake_non_redeemable",
              )?.balance || 0),
          },
        }),
      clearUser: () =>
        set({
          user: null,
          full_name: null,
          email: null,
          wallet: { gc: 0, sc: 0 },
        }),
      selectedCurrency: CurrencyEnum.GC,
      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
      wallet: {
        gc: 0,
        sc: 0,
      },
      setWallet: (amount) =>
        set((state) => ({
          wallet: {
            gc: amount.gc,
            sc: amount.sc,
            // gc: state.wallet.gc + amount.gc,
            // sc: state.wallet.sc + amount.sc,
          },
        })),
    }),
    { name: "user-storage" },
  ),
);
