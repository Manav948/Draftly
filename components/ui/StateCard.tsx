import { Card, CardContent } from "./card"

const StateCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: number
}) => {
  return (
    <Card
      className="
        dark:bg-[#0a0505] dark:text-white border border-red-900/30 rounded-xl p-3 sm:p-5 shadow-sm transition-all
        hover:-translate-y-1 hover:shadow-[0_4px_20px_-4px_rgba(239,68,68,0.2)] hover:border-red-500/50
        relative overflow-hidden group
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-2 sm:py-5 relative z-10">
        <div className="p-2 sm:p-3 rounded-lg bg-red-500/10 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 group-hover:text-red-200 transition-colors">
            {label}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StateCard
