import type { Config } from "tailwindcss";

/**
 * Design tokens ported verbatim from the Google Stitch export
 * (docs/DESIGN_SYSTEM.md). Do not edit values without updating the design source.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#616363",
        "surface-container": "#e7eefe",
        "outline-variant": "#c3c5d7",
        "on-secondary-fixed": "#1a1c1c",
        "primary-fixed": "#dbe1ff",
        "secondary-fixed-dim": "#c6c6c7",
        "surface-container-highest": "#dce2f3",
        "on-tertiary-fixed-variant": "#783200",
        "on-tertiary": "#ffffff",
        "on-primary": "#ffffff",
        "on-background": "#151c27",
        "on-primary-fixed": "#00174d",
        "on-primary-fixed-variant": "#003dab",
        "surface-bright": "#f9f9ff",
        "primary-container": "#1a56db",
        "on-tertiary-fixed": "#341100",
        "surface-container-high": "#e2e8f8",
        background: "#f9f9ff",
        "on-error-container": "#93000a",
        outline: "#737686",
        "on-surface": "#151c27",
        "tertiary-fixed-dim": "#ffb690",
        "on-error": "#ffffff",
        "surface-tint": "#1353d8",
        "on-surface-variant": "#434654",
        "surface-variant": "#dce2f3",
        secondary: "#5d5f5f",
        "surface-container-lowest": "#ffffff",
        tertiary: "#7c3400",
        error: "#ba1a1a",
        "secondary-container": "#dfe0e0",
        "primary-fixed-dim": "#b5c4ff",
        "inverse-on-surface": "#ebf1ff",
        primary: "#003fb1",
        "on-primary-container": "#d4dcff",
        "surface-dim": "#d3daea",
        "tertiary-container": "#a24500",
        "tertiary-fixed": "#ffdbca",
        "secondary-fixed": "#e2e2e2",
        "on-secondary": "#ffffff",
        "surface-container-low": "#f0f3ff",
        surface: "#f9f9ff",
        "on-tertiary-container": "#ffd4bf",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#454747",
        "inverse-primary": "#b5c4ff",
        "inverse-surface": "#2a313d",
        // Functional accent (per DESIGN_SYSTEM.md): orange for high-conversion CTAs / progress
        accent: "#f97316",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        base: "8px",
        "container-max": "1280px",
        "margin-desktop": "64px",
        gutter: "24px",
        "margin-mobile": "20px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        "headline-md": ["var(--font-inter)", "Inter"],
        "label-sm": ["var(--font-inter)", "Inter"],
        "body-md": ["var(--font-inter)", "Inter"],
        "headline-lg": ["var(--font-inter)", "Inter"],
        "body-lg": ["var(--font-inter)", "Inter"],
        "headline-lg-mobile": ["var(--font-inter)", "Inter"],
        display: ["var(--font-inter)", "Inter"],
        "label-md": ["var(--font-inter)", "Inter"],
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg-mobile": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        display: [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "label-md": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" },
        ],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
