import type { Config } from "tailwindcss";

/**
 * Slack logo / hashtag accents (primary):
 * Cyan #36C5F0 · Green #2EB67D · Yellow #ECB22E · Magenta #E01E5A
 * Deep brand (UI chrome, not hero grade): Aubergine #4A154B
 * Links / secondary: Accessible blue #1264A3 · Aubergine Null #611F69 · Active #7C3085
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        coal: "#F8F4F9",
        char: "#FFFFFF",
        panel: "#FFFFFF",
        edge: "#E8DFEB",
        cream: "#1D1C1D",
        sand: "#616061",
        muted: "#868686",
        // Interactive / accents (Slack)
        blue: "#1264A3",
        indigo: "#611F69",
        violet: "#7C3085",
        cyan: "#36C5F0",
        green: "#2EB67D",
        yellow: "#ECB22E",
        red: "#E01E5A",
        aubergine: "#4A154B",
        night: "#4A154B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        micro: "0.28em",
        tightest: "-0.045em",
      },
      screens: {
        "3xl": "1800px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(18,100,163,0.14), 0 20px 60px -20px rgba(74,21,75,0.28)",
        soft: "0 1px 2px rgba(74,21,75,0.04), 0 12px 40px -16px rgba(74,21,75,0.14)",
        lift: "0 2px 4px rgba(74,21,75,0.04), 0 30px 80px -30px rgba(74,21,75,0.22)",
      },
    },
  },
  plugins: [],
};
export default config;
