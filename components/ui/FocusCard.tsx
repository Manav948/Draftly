import { Card, CardContent } from "./card"

const FocusCard = () => {
  return (
    <Card
      className="
        relative overflow-hidden
        dark:bg-[#0a0505] text-white
        border border-red-900/30
        hover:border-red-500/50 transition-colors
        shadow-lg
      "
    >
      <CardContent className="p-8 space-y-4 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
            Today’s Focus
          </p>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight">
          Consistency beats motivation
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed max-w-[90%]">
          Even small progress compounds over time. Keep pushing forward and trust the process.
        </p>
      </CardContent>

      {/* red glow */}
      <div className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent_50%)]
      " />
      <div className="
        pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full
        bg-red-600/10 blur-3xl
      " />
    </Card>
  )
}
export default FocusCard