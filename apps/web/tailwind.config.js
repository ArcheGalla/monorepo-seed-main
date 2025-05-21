import {heroui} from "@heroui/theme"
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      screens: {
        xs: "375px",
      },
      colors: {
        // Primary Colors
        midnight: "#0A0F2D", // Main Dark Background
        plum: "#3D1A5F",    // Secondary Background
        magenta: "#D12F93",  // Primary CTA
        btnPrimary: "#e11d48",  // New Primary CTA
        // Secondary Colors
        emerald: "#18A558",  // Highlights, Success
        gold: "#E0B973",     // VIP Accents
        amber: "#FFB800",    // Energetic highlights
        crimson: "#D72638",  // High-Stakes, Secondary CTA
        platinum: "#B0B3B8", // Text, UI Balance
        platinumLight: "#e5e7eb",
        plumDark: "#1E0F36",
        primary: {
          50: "#FCE4F0",
          100: "#F9C9E1",
          200: "#F294C3",
          300: "#EB5FA5",
          400: "#E42A86",
          500: "#D12F93", // Electric Magenta
          600: "#A7247A",
          700: "#7D1B5B",
          800: "#53123D",
          900: "#29091E",
          DEFAULT: "#D12F93", // Electric Magenta
          foreground: "#FFFFFF"
        },
      },
      backgroundImage: {
        'gradient-jackpot': 'linear-gradient(to right, #18A558, #D12F93)',
        'gradient-premium': 'linear-gradient(to right, #0A0F2D, #3D1A5F)',
        'gradient-casino': 'linear-gradient(to right, #E0B973, #D72638)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'neon2': 'linear-gradient(to right, #ffcf0e, #fffb0e, #07ffff, #0793ff)',

      },
      boxShadow: {
        'neon-magenta': '0 0 5px #D12F93, 0 0 10px #D12F93',
        'neon-emerald': '0 0 5px #18A558, 0 0 10px #18A558',
        'neon-gold': '0 0 5px #E0B973, 0 0 10px #E0B973',
        'neon-amber': '0 0 5px #ffb800, 0 0 10px #ffb800',
        'neon-purple': '0 0 5px #a855f7, 0 0 10px #a855f7',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay-2': 'float 6s ease-in-out 4s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    typography,
    heroui(),
  ],
}

module.exports = config;