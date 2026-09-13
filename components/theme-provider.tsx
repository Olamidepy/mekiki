"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeContextType {
  theme: Theme
  resolvedTheme: "dark" | "light"
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "mekiki-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("light")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme)
      } else {
        // Explicitly default to light mode
        setThemeState("light")
      }
    } catch {
      setThemeState("light")
    }
    setMounted(true)
  }, [storageKey])

  React.useEffect(() => {
    const root = document.documentElement

    let effectiveTheme: "dark" | "light" = "light"
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    } else {
      effectiveTheme = theme
    }

    setResolvedTheme(effectiveTheme)

    if (effectiveTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch {
        // Ignore
      }
      setThemeState(newTheme)
    },
    [storageKey]
  )

  const toggleTheme = React.useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next)
  }, [resolvedTheme, setTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
