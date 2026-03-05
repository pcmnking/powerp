import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#1a1a1a",
          gold: "#c5a059",
          cream: "#f9f8f6",
          lightGray: "#f5f5f5",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
