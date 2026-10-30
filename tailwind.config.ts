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
        background: '#080808',
        surface: '#111111',
        border: '#1f1f1f',
        'text-primary': '#f5f5f0',
        'text-muted': '#6b6b6b',
        'text-dim': '#3a3a3a',
        accent: '#c8f542', // Acid green
        limeAccent: '#a3e635',
        cyanAccent: '#38bdf8',
        violetAccent: '#a855f7',
        obsidian: '#050608',
        carbon: '#0a0c10',
        panel: '#0e1117',
        viewport: '#040507',
        white: '#fafaf8',
        blueprint: {
          bg: '#F4F4F2',
          surface: '#FFFFFF',
          border: '#E0E2DE',
          'border-dark': '#D4D7D1',
          line: '#E8EAE6',
          text: '#121316',
          'text-muted': '#666A73',
          'text-dim': '#9DA1A8',
          accent: '#687D3B',
          'accent-hover': '#556730',
          gold: '#E5A93C',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', '"Newsreader"', '"Instrument Serif"', '"Editorial New"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        widest: '0.15em',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #1f1f1f 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-size': '32px 32px',
      },
    },
  },
  plugins: [],
}
export default config
