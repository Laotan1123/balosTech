import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C50F1A",
          black: "#0D0D0F",
          charcoal: "#1A1A1F",
          slate: "#2B2B33",
          stone: "#F4F4F5"
        },
        accent: {
          amber: "#F59E0B",
          green: "#10B981"
        }
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
