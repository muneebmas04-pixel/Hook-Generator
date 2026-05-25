import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#ff0a2d',
        surface: '#111111',
        'surface-2': '#141414',
        glass: 'rgba(255, 255, 255, 0.08)',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(255, 10, 45, 0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(255,16,48,0.22), transparent 28%), radial-gradient(circle at bottom right, rgba(255,255,255,0.05), transparent 24%), linear-gradient(180deg, #0b0b0d 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
