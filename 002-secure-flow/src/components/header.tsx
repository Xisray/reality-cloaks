import translation from "@/translation"
import type { Languages } from "@/types"
import { Gauge } from "lucide-react"
import LanguageSelect from "./language-select"
import ThemeToggle from "./theme-toggle"
import { Separator } from "./ui/separator"

function Header({
  language,
  totalOnline,
  onChange,
}: {
  language: Languages
  totalOnline: number
  onChange: (language: Languages) => void
}) {
  return (
    <header className="mt-4 space-y-4">
      <div className="fixed flex justify-between z-10 w-full top-2 left-0 sm:hidden p-2">
        <ThemeToggle />
        <LanguageSelect language={language} onChange={onChange} />
      </div>
      <div className="relative flex items-center justify-center gap-4">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 backdrop-blur-sm dark:border-emerald-500/30 dark:bg-emerald-500/10">
          <Gauge
            size={38}
            className="text-emerald-600 dark:text-emerald-500"
            strokeWidth={2.5}
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="bg-linear-to-r from-slate-900 to-emerald-700 bg-clip-text font-mono text-5xl font-bold tracking-[1px] text-transparent select-none dark:from-slate-100 dark:to-emerald-200">
            Secure Flow
          </h1>
          <p className="-mt-1 font-mono text-xs tracking-[3px] text-emerald-700/80 dark:text-emerald-500/70">
            SECURE • FAST • PRIVATE
          </p>
        </div>
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 sm:flex">
          <LanguageSelect language={language} onChange={onChange} />
          <Separator orientation="vertical" />
          <ThemeToggle />
        </div>
      </div>
      <p className="text-center text-muted-foreground">
        {translation.description[language]}
      </p>
      <p className="text-center text-sm text-primary">
        {translation.note[language]}
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-2">
        <div className="flex flex-1 flex-col items-center justify-center border border-primary bg-secondary p-4">
          <span className="text-2xl font-bold text-primary">{totalOnline}</span>
          <span>{translation.activeServers[language]}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border border-primary bg-secondary p-4">
          <span className="text-2xl font-bold text-primary">99.9%</span>
          <span>{translation.uptime[language]}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center border border-primary bg-secondary p-4">
          <span className="text-2xl font-bold text-primary">3TB/s</span>
          <span>{translation.speed[language]}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
