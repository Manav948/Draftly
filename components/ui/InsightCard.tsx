import { Card, CardContent } from "./card"

const InsightCard = () => {
    return (
        <Card className="dark:bg-[#0e0707] dark:text-foreground ">
            <CardContent className="p-6 text-sm">
                💡 Tip: Reviewing your work daily increases long-term consistency by 40%.
            </CardContent>
        </Card>
    )
}
export default InsightCard  