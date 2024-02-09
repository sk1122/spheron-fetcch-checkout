import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        manrope: ["var(--font-manrope)", ...fontFamily.sans],
        syne: ["var(--font-syne)", ...fontFamily.sans]
      },
      colors: {
        primary: "#0057FF",
        input: "#E3ECFF",
        success: "#0A9A38",
        destructive: "#E70000",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
