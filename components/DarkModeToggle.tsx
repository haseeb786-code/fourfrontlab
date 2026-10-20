'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  // During SSR or pre-mount, default to light styling to prevent hydration mismatch
  const isDark = mounted && theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light blueprint mode' : 'Switch to dark obsidian mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative w-[52px] h-[28px] rounded-full border transition-colors duration-200
        flex items-center shrink-0 cursor-pointer select-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#687D3B] dark:focus-visible:ring-[#c8f542]
        ${isDark
          ? 'bg-[#181B20] border-[#c8f542]/70 shadow-[0_0_12px_rgba(200,245,66,0.15)]'
          : 'bg-[#F4F4F2] border-[#121316]'
        }
      `}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 flex items-center justify-center w-4 h-4 pointer-events-none">
        <Sun
          className={`w-3 h-3 transition-colors duration-200 ${
            isDark ? 'text-[#555A64]' : 'text-[#121316]'
          }`}
        />
      </span>
      <span className="absolute right-1.5 flex items-center justify-center w-4 h-4 pointer-events-none">
        <Moon
          className={`w-3 h-3 transition-colors duration-200 ${
            isDark ? 'text-[#c8f542]' : 'text-[#8E929A]'
          }`}
        />
      </span>

      {/* Sliding Thumb */}
      <span
        className={`
          absolute top-[3px] w-[20px] h-[20px] rounded-full shadow-md transition-transform duration-200 ease-out
          ${isDark
            ? 'translate-x-[26px] bg-[#c8f542]'
            : 'translate-x-[3px] bg-[#121316]'
          }
        `}
      />
    </button>
  )
}
