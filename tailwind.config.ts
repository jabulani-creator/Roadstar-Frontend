import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#3d6b63",
          strong: "#2f544e",
        },
        accent: {
          DEFAULT: "#6b6b6b",
          strong: "#4a4a4a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
