export interface IWallet {
  id: string;
  balance: number;
  currency_type: "gold" | "sweepstake_redeemable" | "sweepstake_non_redeemable";
  is_redeemable: boolean;
}

export interface IUser {
  id: string;
  user_id: string;
  email: string;
  birthday: string | null;
  full_name: string;
  rank: number | null;
  address: Record<string, any> | null;
  created_at: string;
  last_login_at: string;
  wallets: IWallet[];
}
