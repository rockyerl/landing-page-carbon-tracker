import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans:    ["Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        rimba:   "#1D6B5A",
        "rimba-light": "#2A9478",
        emas:    "#B8962E",
        "emas-light": "#D4AF5A",
        tanah:   "#C14B2A",
        arang:   "#1A1A18",
        abu:     "#7A7A72",
        lontar:  "#F7F5EF",
        pasir:   "#EDEAE0",
        jati:    "#4A3728",
      },
    },
  },
  plugins: [],
};
export default config;
