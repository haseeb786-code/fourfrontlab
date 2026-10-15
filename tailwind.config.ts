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
        accent: '#c8f542', // Acid green: only for 1 hero word, active dot, CTA hover border, section numbers
        white: '#fafaf8',
      },
      fontFamily: {
        serif: ['var(--font-serif)', '"Editorial New"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
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
