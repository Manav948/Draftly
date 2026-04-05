"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"

const mockData = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 8 },
  { name: "Fri", tasks: 12 },
  { name: "Sat", tasks: 3 },
  { name: "Sun", tasks: 6 },
]

export default function ActivityChart() {
  return (
    <Card className="dark:bg-[#0a0505] dark:text-white border border-red-900/30 shadow-lg rounded-xl overflow-hidden relative">
      {/* Subtle red glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05),transparent_70%)] pointer-events-none" />
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] inline-block animate-pulse"></span>
          Weekly Activity
        </h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#9ca3af", fontSize: 12 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#9ca3af", fontSize: 12 }} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid rgba(220, 38, 38, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#ef4444" }}
              />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#ef4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTasks)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
