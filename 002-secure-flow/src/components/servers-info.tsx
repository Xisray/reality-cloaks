import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { AlertCircle, CheckCircle, ChevronDownIcon, Dot } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

function ServerCard({
  title,
  good,
  ping,
  uptime,
}: {
  title: string
  good: boolean
  ping: number
  uptime: string
}) {
  return (
    <div className="border border-primary bg-secondary p-2">
      <div className="flex items-center justify-between">
        <span>{title}</span>
        <div
          className={cn(
            "flex justify-center text-sm",
            good ? "text-green-600" : "text-yellow-600"
          )}
        >
          <Dot />
          <span>{good ? "Operational" : "Degraded"}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">
          Response Time: {ping.toFixed(1)}ms
        </span>
        <span className="text-xs text-muted-foreground">Uptime: {uptime}%</span>
      </div>
    </div>
  )
}

function ServersInfo({
  totalOnline,
  servers,
}: {
  totalOnline: number
  servers: Record<
    string,
    Array<{
      title: string
      good: boolean
      ping: number
      uptime: string
    }>
  >
}) {
  return (
    <Collapsible className="border-2 border-primary">
      <CollapsibleTrigger
        render={
          <Button className="flex w-full bg-secondary p-2" variant="ghost">
            <div className="flex w-full justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Network Status: {totalOnline} Servers Online
              </span>
              <span className="flex items-center gap-2 text-sm">
                <AlertCircle size={18} className="text-yellow-600" />
                Beta v0.9.3
              </span>
            </div>
            <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
          </Button>
        }
      />
      <CollapsibleContent className="p-2">
        {Object.entries(servers)
          .filter((v) => v[1].length > 0)
          .map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <div className="space-y-2 p-2">
                {value.map((v) => (
                  <ServerCard
                    key={v.title}
                    title={v.title}
                    good={v.good}
                    ping={v.ping}
                    uptime={v.uptime}
                  />
                ))}
              </div>
            </div>
          ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default ServersInfo
