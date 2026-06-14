import { useEffect, useState } from "react"
import {
  ServerCrash,
  RefreshCw,
  AlertTriangle,
  Wifi,
  Activity,
  Clock,
} from "lucide-react"

const TOTAL_SECONDS = 300
const BAR_COUNT = 20

function generateIncidentCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from(
    { length: 48 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("")
}

function formatTime(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0")
  const s = String(seconds % 60).padStart(2, "0")
  return `${m}:${s}`
}

function generateBarHeights(): number[] {
  return Array.from({ length: BAR_COUNT }, () => 80 + Math.random() * 20)
}

function LoadGraph() {
  const [bars, setBars] = useState<number[]>(generateBarHeights)
  const avgLoad = Math.round(bars.reduce((a, b) => a + b, 0) / bars.length)

  useEffect(() => {
    const id = setInterval(() => setBars(generateBarHeights()), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div className="flex h-12 items-end gap-0.75">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-red-500/80 transition-all duration-500 ease-in-out"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span className="font-medium text-red-500">{avgLoad}%</span>
        <span>100%</span>
      </div>
    </div>
  )
}

function CountdownTimer({ total }: { total: number }) {
  const [remaining, setRemaining] = useState(total)

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => (prev <= 1 ? total : prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [total])

  const progress = (remaining / total) * 100

  return (
    <div className="flex items-center gap-4">
      <div>
        <p
          className="text-4xl font-semibold text-red-500 tabular-nums"
          style={{ fontFamily: "monospace" }}
        >
          {formatTime(remaining)}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Поиск свободного сервера
        </p>
      </div>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="linear h-full rounded-full bg-red-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function IpAddress() {
  const [ip, setIp] = useState<string>("—")

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d: { ip: string }) => setIp(d.ip))
      .catch(() => setIp("не определён"))
  }, [])

  return <span>{ip}</span>
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="absolute -top-40 -left-40 h-150 w-150 animate-pulse rounded-full bg-red-500/5"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute -right-40 -bottom-60 h-175 w-175 animate-pulse rounded-full bg-red-500/4"
        style={{ animationDuration: "6s", animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-orange-500/3"
        style={{ animationDuration: "5s", animationDelay: "2s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, currentColor, currentColor 1px, transparent 1px, transparent 60px)",
        }}
      />
    </div>
  )
}

export function App() {
  const [incidentCode] = useState(generateIncidentCode)

  return (
    <div className="flex min-h-screen flex-col items-center p-6">
      <AnimatedBackground />

      <main className="flex w-full max-w-2xl flex-1 flex-col justify-center gap-4">
        <header>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Сервер перегружен
            </h1>
            <div className="flex items-center gap-2 sm:flex-row flex-col">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-500">
                <ServerCrash size={13} />
                503
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                Высокая нагрузка
              </span>
            </div>
          </div>
          <p className="mt-1 text-muted-foreground">
            Приносим извинения — в данный момент серверы не могут обработать ваш
            запрос.
          </p>
        </header>

        <section className="space-y-2 rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            <Activity size={13} />
            Нагрузка на сервер
          </div>
          <LoadGraph />
        </section>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-secondary/50 p-3.5">
            <p className="mb-1 flex items-center gap-1.5 text-[11px] tracking-widest text-muted-foreground uppercase">
              <Wifi size={11} />
              IP адрес
            </p>
            <p className="font-mono text-sm font-medium text-foreground">
              <IpAddress />
            </p>
          </div>
          <div className="rounded-xl border bg-secondary/50 p-3.5">
            <p className="mb-1 text-[11px] tracking-widest text-muted-foreground uppercase">
              Код инцидента
            </p>
            <p className="font-mono text-[11px] leading-relaxed font-medium break-all text-foreground">
              {incidentCode}
            </p>
          </div>
        </div>

        <section className="rounded-xl border bg-secondary/50 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            <Clock size={13} />
            Автоматическое перенаправление
          </div>
          <CountdownTimer total={TOTAL_SECONDS} />
        </section>

        <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <div>
            <p className="mb-0.5 text-sm font-medium text-amber-600 dark:text-amber-400">
              Не закрывайте эту страницу
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              По истечении таймера система автоматически перенаправит вас на
              менее загруженный сервер.
            </p>
          </div>
        </div>
        <footer className="w-full max-w-2xl space-y-2 border-t pt-4 pb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Статус системы: высокая нагрузка
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RefreshCw size={12} className="animate-spin" />
              Страница обновится автоматически
            </div>
          </div>
          <p className="text-center text-xs leading-relaxed text-muted-foreground/70">
            Если проблема сохраняется после перенаправления, обратитесь в службу
            поддержки, указав код инцидента выше.
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
