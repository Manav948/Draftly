"use client"
import React from 'react'

interface Props {
    selectedEmoji?: string 
}
const ReadOnlyEmoji = ({selectedEmoji} : Props) => {
  return (
    <div className='w-12 h-12 rounded-lg dark:bg-blue-500 bg-gray-900 flex items-center justify-center text-3xl px-3 mb-5'>
        {selectedEmoji}
    </div>
  )
}

export default ReadOnlyEmoji
