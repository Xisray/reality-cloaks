import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

function ThemeToggle() {
  const themeProvider = useTheme()

  const isDark = themeProvider.theme === "dark"

  return (
    <button
      onClick={() => themeProvider.setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative h-9 w-16 rounded-full border transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        isDark
          ? "border-slate-600 bg-slate-800"
          : "border-amber-200 bg-amber-50"
      )}
    >
      {/* Track icons */}
      <Sun
        size={12}
        className={cn(
          "absolute top-1/2 left-2 -translate-y-1/2 transition-opacity duration-300",
          isDark ? "text-slate-400 opacity-30" : "text-amber-400 opacity-100"
        )}
      />
      <Moon
        size={12}
        className={cn(
          "absolute top-1/2 right-2 -translate-y-1/2 transition-opacity duration-300",
          isDark ? "text-slate-300 opacity-100" : "text-slate-300 opacity-30"
        )}
      />

      {/* Sliding thumb */}
      <span
        className={cn(
          "absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[11px] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isDark
            ? "left-[calc(100%-1.75rem)] bg-slate-700 text-slate-200"
            : "left-1 bg-white text-amber-500"
        )}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  )
}

export default ThemeToggle
