"use client"
import { LayoutDashboard } from 'lucide-react'
import React from 'react'

const Workspaces = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 cursor-pointer transition">
      <LayoutDashboard size={20} className="text-gray-600" />
    </div>
  )
}

export default Workspaces
