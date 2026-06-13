import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

function ThemeToggle() {
  const themeProvider = useTheme()

  const isDark = themeProvider.theme === "dark"

  return (
    <Button
      onClick={() => themeProvider.setTheme(isDark ? "light" : "dark")}
      variant="outline"
      aria-label="Toggle theme"
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}

export default ThemeToggle
