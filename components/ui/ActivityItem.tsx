import { useFormatter } from "next-intl"
import { Card, CardContent } from "./card"

interface ActivityItemProps {
  item: {
    emoji: string | null
    title: string
    updatedAt: string | Date
    workspace: { name: string }
  }
}

const ActivityItem = ({ item }: ActivityItemProps) => {
  const format = useFormatter()

  return (
    <Card
      className="
        bg-[#0a0505] border border-red-900/20 text-white
        hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:border-red-500/40 hover:-translate-x-1 transition-all
        cursor-pointer
      "
    >
      <CardContent className="flex gap-3 py-3 px-4">
        <div className="text-xl pt-1 drop-shadow-md">{item.emoji ?? "📝"}</div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold truncate text-[14px]">{item.title}</p>
          <div className="flex flex-wrap items-center text-[11px] text-gray-400 mt-1 gap-1.5 line-clamp-1">
            <span>{format.relativeTime(new Date(item.updatedAt), new Date())}</span>
            <span className="w-1 h-1 rounded-full bg-red-600/50"></span>
            <span className="text-red-400 font-medium px-2 py-0.5 rounded-md bg-red-500/10 border border-red-900/30 truncate max-w-[100px] sm:max-w-max">
              {item.workspace.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default ActivityItem