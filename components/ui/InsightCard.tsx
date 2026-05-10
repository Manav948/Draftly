import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "./card"

const InsightCard = () => {
    return (
        <Card className="bg-white dark:bg-[#131313] border border-gray-100 dark:border-[#1f1f1f] mt-6 relative overflow-hidden group shadow-sm dark:shadow-none">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-500"></div>
            <CardContent className="p-6 flex items-start gap-4 text-gray-900 dark:text-white">
                <div className="mt-1 p-2 rounded-full bg-red-500/10 text-red-500">
                    <Lightbulb size={20} className="animate-pulse" />
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-1 tracking-tight text-gray-900 dark:text-[#f0f0f0]">Daily Insight</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        Reviewing your work daily increases long-term consistency by 40%. Consistency is the foundation of massive success!
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
export default InsightCard  