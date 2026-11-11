import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        paper: "#FAF8F5",
        ink: "#111111",
        vermilion: "#D92D20",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "#1c1917",
            lineHeight: "1.75",
            h1: {
              fontFamily: "var(--font-serif)",
              fontWeight: "700",
            },
            h2: {
              fontFamily: "var(--font-serif)",
              fontWeight: "700",
            },
            h3: {
              fontFamily: "var(--font-serif)",
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "#1c1917",
              fontStyle: "italic",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;

