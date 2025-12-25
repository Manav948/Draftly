import { Card, CardContent } from "./card"

const FocusCard = () => {
  return (
    <Card
      className="
        relative overflow-hidden
        dark:bg-black/50 text-foreground
        border border-gray-400
      "
    >
      <CardContent className="p-6 space-y-3">
        <p className="text-sm text-muted-foreground">
          Today’s Focus
        </p>

        <h3 className="text-xl font-semibold">
          Consistency beats motivation
        </h3>

        <p className="text-sm text-muted-foreground">
          Even small progress compounds over time.
        </p>
      </CardContent>

      {/* glow */}
      <div className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]
      " />
    </Card>
  )
}
export default FocusCard