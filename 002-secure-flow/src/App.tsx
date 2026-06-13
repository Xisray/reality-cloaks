import { useState } from "react"
import type { Languages } from "./types"
import FileForm from "./components/file-form"
import ServersInfo from "./components/servers-info"
import Header from "./components/header"
import Features from "./components/features"
import BetaBanner from "./components/banner"

const servers = {
  Poland: ["Kraków", "Warsaw", "Wrocław"],
  "Czech Republic": ["Prague"],
  Netherlands: ["The Hague", "Rotterdam"],
  Estonia: ["Narva", "Tartu"],
  Germany: ["Munich", "Frankfurt", "Berlin", "Hamburg"],
  Romania: ["Bucharest", "Timișoara", "Cluj-Napoca"],
  Finland: ["Turku", "Tampere", "Helsinki"],
  Norway: ["Trondheim", "Oslo", "Bergen"],
  Sweden: ["Gothenburg", "Stockholm", "Malmö"],
}

export function App() {
  const [language, setLanguage] = useState<Languages>(() => {
    const browserLang = navigator.language.split("-")[0]

    const supportedLanguages: Languages[] = ["ru", "gb"]

    return supportedLanguages.includes(browserLang as Languages)
      ? (browserLang as Languages)
      : "gb"
  })

  const [serversData] = useState(() => {
    const allOnlineServers: Array<{
      title: string
      good: boolean
      ping: number
      uptime: string
    }> = []

    Object.entries(servers).forEach(([, cities]) => {
      cities.forEach((city) => {
        const isOnline = Math.random() > 0.4
        if (!isOnline) return

        const decimal = String(Math.floor(Math.random() * 100)).padStart(2, "0")
        const uptime = `99.${decimal}`
        const ping = 40 + Math.random() * 85

        allOnlineServers.push({
          title: city,
          good: true,
          ping,
          uptime,
        })
      })
    })

    const totalOnline = allOnlineServers.length
    const maxDegraded = Math.max(1, Math.floor(totalOnline * 0.1))
    const degradedCount = Math.floor(Math.random() * (maxDegraded + 1))

    const shuffled = [...allOnlineServers].sort(() => Math.random() - 0.5)
    for (let i = 0; i < degradedCount; i++) {
      if (shuffled[i]) shuffled[i].good = false
    }

    const result: Record<string, typeof allOnlineServers> = {}
    Object.keys(servers).forEach((region) => {
      result[region] = shuffled.filter((s) =>
        servers[region as keyof typeof servers].some((name) =>
          s.title.includes(name)
        )
      )
    })

    return { data: result, totalOnline }
  })

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 hidden bg-linear-to-br from-slate-950 via-emerald-950/40 to-slate-950 dark:block" />
      <div className="absolute inset-0 block bg-linear-to-br from-slate-100 via-emerald-50 to-slate-100 dark:hidden" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(at_25%_30%,rgba(16,185,129,0.20),transparent_50%)] dark:block" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(at_75%_65%,rgba(52,211,153,0.15),transparent_50%)] dark:block" />
      <div className="absolute inset-0 block bg-[radial-gradient(at_25%_30%,rgba(16,185,129,0.12),transparent_50%)] dark:hidden" />
      <div className="absolute inset-0 block bg-[radial-gradient(at_75%_65%,rgba(52,211,153,0.10),transparent_50%)] dark:hidden" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size-[60px_60px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
      <BetaBanner language={language} />
      <div className="relative z-10 mx-4 max-w-4xl space-y-10 py-2 sm:mx-6 lg:mx-auto">
        <Header language={language} totalOnline={serversData.totalOnline} onChange={setLanguage} />
        <FileForm language={language} />
        <Features language={language} />
        <ServersInfo
          servers={serversData.data}
          totalOnline={serversData.totalOnline}
        />

        <footer>
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Secure Flow. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Developed in the EU. GDPR Compliant.
          </p>
          <p className="mt-2 text-center text-sm text-primary">
            We respect intellectual property rights and prohibit downloading
            copyrighted content.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
