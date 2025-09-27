"use client"
import React from 'react'
import User from './User'
import BredCrumNav from './BredCrumNav'
import Welcoming from './Welcoming'

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center mb-4">

      <Welcoming />
      <BredCrumNav />
      <User />
    </header>
  )
}

export default DashboardHeader
