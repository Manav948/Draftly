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
        dark:bg-[#0e0707] dark:text-white border border-border rounded-xl p-5 shadow-sm transition-all
        hover:-translate-y-0.5 hover:shadow-md
      "
    >
      <CardContent className="flex items-center gap-4 py-5">
        <div className="p-2 rounded-md bg-white/5">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StateCard
