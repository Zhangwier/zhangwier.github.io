import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // The spotlight glow colour, kept as a token so it is easy to retheme.
      colors: {
        glow: 'rgba(29, 78, 216, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
