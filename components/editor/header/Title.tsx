"use client"
import React, { useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

const Title = () => {
  const [content, setContent] = useState("Task Title")

  const onChangeEditHandler = (e: ContentEditableEvent) => {
    setContent(e.target.value)
  }

  const pasteHandler = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    setContent(text)
  }

  return (
    <div className="w-full">
      <ContentEditable
        tagName='span'
        html={content}
        onChange={onChangeEditHandler}
        onPaste={pasteHandler}
        spellCheck={false}
        className="text-lg sm:text-xl font-semibold text-gray-800
        dark:text-gray-200 focus:outline-none border-b border-transparent
        focus:border-primary transition"
      />
    </div>
  )
}

export default Title
