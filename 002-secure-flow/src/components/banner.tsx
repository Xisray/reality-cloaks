import { cn } from "@/lib/utils"
import translation from "@/translation"
import type { Languages } from "@/types"

function BetaBanner({language}: {language: Languages}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "bg-linear-to-r from-emerald-500/4 via-emerald-400/8 to-emerald-500/4",
        "dark:from-emerald-500/6 dark:via-emerald-400/10 dark:to-emerald-500/6",
        "border-b border-emerald-500/20 dark:border-emerald-400/18"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.12) 30%, rgba(110,231,183,0.22) 50%, rgba(52,211,153,0.12) 70%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "beta-shimmer 3.5s ease-in-out infinite",
        }}
      />

      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(52,211,153,0.55) 30%, rgba(110,231,183,0.85) 50%, rgba(52,211,153,0.55) 70%, transparent)",
          backgroundSize: "200% 100%",
          animation: "beta-shimmer 3.5s ease-in-out infinite",
        }}
      />

      <div className="relative flex items-center justify-center gap-3 px-6 py-2.5">
        <div
          className="flex shrink-0 items-center gap-1.25 rounded-full px-2.5 py-0.75 pl-1.75"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.14) 0%, rgba(52,211,153,0.24) 100%)",
            border: "1px solid rgba(52,211,153,0.38)",
            animation: "beta-glow 3.5s ease-in-out infinite",
          }}
        >
          <span
            className="h-1.25 w-1.25 rounded-full bg-emerald-400 dark:bg-emerald-400"
            style={{
              boxShadow: "0 0 6px rgba(52,211,153,0.8)",
              animation: "beta-dot 2s ease-in-out infinite",
            }}
          />
          <span className="text-[10px] font-bold tracking-[0.12em] text-emerald-600 uppercase dark:text-emerald-300">
            Beta
          </span>
        </div>

        <span className="h-3.5 w-px shrink-0 bg-emerald-500/20 dark:bg-emerald-400/25" />

        <p className="text-[13px] text-slate-500 dark:text-slate-300/80">
          {translation.beta[language]}
        </p>
      </div>

      <style>{`
        @keyframes beta-shimmer {
          0%   { background-position: -100% 0; }
          50% { background-position: 50% 0; }
          100%   { background-position: -100% 0; }
        }
        @keyframes beta-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(52,211,153,0.15); }
          50%       { box-shadow: 0 0 22px rgba(52,211,153,0.35); }
        }
        @keyframes beta-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
export default BetaBanner

// Beta Access Only - Invitation Required
