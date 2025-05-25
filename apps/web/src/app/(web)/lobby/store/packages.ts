export interface CoinPackage {
  id: number;
  goldCoins: number;
  sweepstakesCoins: number;
  price: number;
  badge?: string;
}

export const coinPackages: CoinPackage[] = [
  {
    id: 2,
    goldCoins: 45000,
    sweepstakesCoins: 1,
    price: 1.99,
  },
  {
    id: 3,
    goldCoins: 120000,
    sweepstakesCoins: 5,
    price: 4.99,
  },
  {
    id: 4,
    goldCoins: 250000,
    sweepstakesCoins: 12,
    price: 9.99,
  },
  {
    id: 5,
    goldCoins: 600000,
    sweepstakesCoins: 23,
    price: 19.99,
  },
  {
    id: 6,
    goldCoins: 1250000,
    sweepstakesCoins: 55,
    price: 49.99,
    badge: "Popular",
  },
  {
    id: 7,
    goldCoins: 2500000,
    sweepstakesCoins: 107,
    price: 99.99,
  },
  {
    id: 8,
    goldCoins: 5000000,
    sweepstakesCoins: 249,
    price: 199.99,
    badge: "Best Value",
  },
  {
    id: 9,
    goldCoins: 7500000,
    sweepstakesCoins: 559,
    price: 499.99,
  },
];
