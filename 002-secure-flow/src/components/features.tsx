import translation from "@/translation"
import type { Languages } from "@/types"
import { Gauge, Globe, Shield } from "lucide-react"

function getIcon(key: keyof typeof translation.features) {
  if (key === "speed") {
    return <Gauge className="text-primary" />
  }
  if (key === "network") {
    return <Globe className="text-primary" />
  }
  if (key === "security") {
    return <Shield className="text-primary" />
  }
}

function Features({ language }: { language: Languages }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
      {Object.entries(translation.features).map(([key, value]) => (
        <div
          key={key}
          className="flex-1 space-y-2 border border-primary bg-secondary p-2"
        >
          <h2 className="flex gap-2 text-lg font-bold">
            {getIcon(key as keyof typeof translation.features)}{" "}
            {value.header[language]}
          </h2>
          <p className="text-sm text-muted-foreground">
            {value.description[language]}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Features
