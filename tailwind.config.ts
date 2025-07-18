
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
       
      },
       colors: {
        'bee': '#f4af01',
        beeYellow: '#f4af01',
        beeBlack: '#000000',
      },
      keyframes: {
        buzz: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(1px, -1px)' },
          '50%': { transform: 'translate(-1px, 1px)' },
          '75%': { transform: 'translate(1px, 1px)' },
        },
      },
      animation: {
        buzz: 'buzz 0.3s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
