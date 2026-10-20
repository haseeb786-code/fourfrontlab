'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Sync state on client mount without race conditions
  useEffect(() => {
    let resolvedTheme: Theme = 'light'
    try {
      const isDarkDom = document.documentElement.classList.contains('dark')
      const saved = localStorage.getItem('ffl-theme') as Theme | null
      if (saved === 'dark' || saved === 'light') {
        resolvedTheme = saved
      } else if (isDarkDom || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        resolvedTheme = 'dark'
      }
    } catch {
      // fallback
    }

    setThemeState(resolvedTheme)
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setMounted(true)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    const root = document.documentElement
    
    // Add temporary class to animate transitions ONLY during user interaction
    root.classList.add('theme-transitioning')
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('ffl-theme', newTheme)
    } catch {
      // localStorage might be unavailable in private browsing
    }
    
    setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 300)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
