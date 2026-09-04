/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#3054ff',
          hover: '#2040e0',
          blue: '#3b82f6',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          gradientEnd: '#b4c0ff',
        },
        base: {
          950: '#05070d',
          900: '#0a0e17',
          850: '#0d1220',
          800: '#111827',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Instrument Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'grid': "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [typography],
}
