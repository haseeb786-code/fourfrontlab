import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0C0C0C',
        jet: '#0C0C0C',
        platinum: '#D7E2EA',
        surface: {
          50: '#141414',
          100: '#111111',
          200: '#0C0C0C',
          DEFAULT: '#0C0C0C',
          border: 'rgba(215, 226, 234, 0.12)',
        },
        brand: {
          cyan: '#00f2fe',
          magenta: '#B600A8',
          purple: '#7621B0',
          amber: '#BE4C00',
          accent: '#D7E2EA',
        },
      },
      fontFamily: {
        sans: ['var(--font-kanit)', 'sans-serif'],
        kanit: ['var(--font-kanit)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(#646973 0%, #bbccd7 100%)',
        'cta-gradient': 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      },
      boxShadow: {
        'cta-glow': '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        'card-stack': '0 -10px 40px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
