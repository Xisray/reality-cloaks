import { Button } from "@/components/ui/button"
import {
  Camera,
  Gift,
  Image,
  Moon,
  Smile,
  Star,
  Sun,
  TrendingUp,
} from "lucide-react"
import { useTheme } from "./components/theme-provider"
import React from "react"
import { cn } from "./lib/utils"
import MediaFeed from "./components/MediaFeed"

const categories = [
  {
    id: "all",
    text: "All",
    icon: <Star />,
  },
  {
    id: "memes",
    text: "Memes",
    icon: <Smile />,
  },
  {
    id: "images",
    text: "Images",
    icon: <Image />,
  },
  {
    id: "gifs",
    text: "Gifs",
    icon: <Gift />,
  },
  {
    id: "videos",
    text: "Videos",
    icon: <Camera />,
  },
  {
    id: "trending",
    text: "Trending",
    icon: <TrendingUp />,
  },
]

export function App() {
  const theme = useTheme()
  const [activeCategory, setActiveCategory] = React.useState("all")
  return (
    <div className="mx-auto my-2 max-w-6xl space-y-10">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Smile
                  size={22}
                  className="animate-[pulse_3s_ease-in-out_infinite]"
                />
              </div>
              <div className="leading-tight">
                <h1 className="text-lg font-bold tracking-tight">Meme Flow</h1>
                <p className="text-xs text-muted-foreground">
                  Your daily dose of laughter
                </p>
              </div>
            </div>

            <Button
              size="icon-lg"
              variant="ghost"
              onClick={() =>
                theme.setTheme(theme.theme === "dark" ? "light" : "dark")
              }
            >
              {theme.theme === "dark" ? <Moon /> : <Sun />}
            </Button>
          </div>

          {/* Categories row */}
          <div className="flex scrollbar-none items-center gap-2 overflow-x-auto pb-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === activeCategory ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "shrink-0 gap-1.5 rounded-full transition-all duration-200",
                  category.id === activeCategory
                    ? "shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.icon}
                {category.text}
              </Button>
            ))}
          </div>
        </div>
      </header>
      <MediaFeed activeCategory={activeCategory} />
    </div>
  )
}

export default App
