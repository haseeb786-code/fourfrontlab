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
        background: '#07090e',
        foreground: '#f3f4f6',
        surface: {
          50: '#151b28',
          100: '#111722',
          200: '#0d121c',
          300: '#090d15',
          DEFAULT: '#0d121c',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          cyan: '#00f2fe',
          teal: '#00e5ff',
          blue: '#4facfe',
          violet: '#6366f1',
          purple: '#8b5cf6',
          emerald: '#10b981',
          accent: '#00f2fe',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 242, 254, 0.15), transparent 50%), radial-gradient(circle at 100% 50%, rgba(99, 102, 241, 0.12), transparent 50%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'glow-violet': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
