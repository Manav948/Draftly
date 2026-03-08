"use client"

import dynamic from 'next/dynamic'

const ReadOnlyContentClient = dynamic(() => import('./ReadOnlyContent'), {
  ssr: false
})

export default ReadOnlyContentClient
