import { useFormatter } from "next-intl"
import { Card, CardContent } from "./card"

const ActivityItem = ({ item }: any) => {
  const format = useFormatter()

  return (
    <Card
      className="
        dark:bg-[#0e0707] text-foreground
        hover:shadow-lg transition
      "
    >
      <CardContent className="flex gap-4 py-4">
        <div className="text-2xl">{item.emoji ?? "📝"}</div>

        <div className="min-w-0">
          <p className="font-medium truncate">{item.title}</p>
          <p className="text-sm text-muted-foreground">
            Updated {format.relativeTime(new Date(item.updatedAt), new Date())}
            {" · "}
            <span className="text-red-400">{item.workspace.name}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
export default ActivityItem