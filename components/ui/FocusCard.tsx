"use client"

import { Terminal, CheckCircle } from "lucide-react"

const FocusCard = () => {
  return (
    <div className="relative overflow-hidden h-full min-h-[200px] bg-[#131313] border border-[#1f1f1f] rounded-xl group hover:border-[#2a2a2a] transition-all">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-700/40 to-transparent" />

      <div className="p-6 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={13} className="text-red-600" />
            <span className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Focus</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1a] border border-[#252525] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[9px] font-medium text-[#666]">Active</span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-[#f0f0f0] tracking-tight leading-tight">
            Consistency<br />beats motivation.
          </h3>
          <p className="text-[11px] text-[#444] mt-2 leading-relaxed">
            Progress compounds over time. Keep building.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="h-1 flex-1 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div className="h-full bg-red-600 w-3/4 rounded-full" />
          </div>
          <span className="text-[10px] font-mono text-red-600">75%</span>
        </div>
      </div>
    </div>
  )
}

export default FocusCard