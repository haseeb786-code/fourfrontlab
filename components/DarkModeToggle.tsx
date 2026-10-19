'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative w-[52px] h-[28px] rounded-full border transition-all duration-300 ease-in-out
        flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#687D3B]
        ${theme === 'dark'
          ? 'bg-[#1a1a1a] border-[#c8f542]'
          : 'bg-[#F4F4F2] border-[#121316]'
        }
      `}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 flex items-center justify-center w-4 h-4">
        <Sun
          className={`w-3 h-3 transition-all duration-300 ${
            theme === 'dark' ? 'text-[#3a3a3a]' : 'text-[#121316]'
          }`}
        />
      </span>
      <span className="absolute right-1.5 flex items-center justify-center w-4 h-4">
        <Moon
          className={`w-3 h-3 transition-all duration-300 ${
            theme === 'dark' ? 'text-[#c8f542]' : 'text-[#9DA1A8]'
          }`}
        />
      </span>

      {/* Thumb */}
      <span
        className={`
          absolute top-[3px] w-[20px] h-[20px] rounded-full shadow-md transition-all duration-300 ease-in-out
          ${theme === 'dark'
            ? 'translate-x-[25px] bg-[#c8f542]'
            : 'translate-x-[3px] bg-[#121316]'
          }
        `}
      />
    </button>
  )
}
