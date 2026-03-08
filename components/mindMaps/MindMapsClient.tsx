"use client"

import dynamic from 'next/dynamic'
import { LoadingScreen } from '@/components/common/LoadingScreen'

const MindMapsClient = dynamic(() => import('./MindMaps'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

export default MindMapsClient
