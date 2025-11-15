import { Editor } from '@tiptap/react'
import { FloatingMenu } from '@tiptap/react/menus'
import React from 'react'
import OptionBtn from './OptionBtn'
import { Heading1, Heading2, Heading3, Heading4, Heading4Icon, HeadingIcon, Link, List, ListOrdered } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import AddImage from './addImage/AddImage'


interface Props {
  editor: Editor
}

const FloatingContainer = ({ editor }: Props) => {
  return (
    <FloatingMenu editor={editor} className="bg-white dark:bg-gray-900 rounded-lg shadow-md flex gap-1 px-1 py-1">
      <OptionBtn
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("heading", { level: 1 })
          ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-6xl"
          : ""
          }`}
      >
        <Heading1 size={18} />
      </OptionBtn>
      <OptionBtn
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("heading", { level: 2 })
          ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : ""
          }`}
      >
        <Heading2 size={18} />
      </OptionBtn>

      <OptionBtn
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("heading", { level: 3 })
          ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : ""
          }`}
      >
        <Heading3 size={18} />
      </OptionBtn>

      <OptionBtn
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("heading", { level: 4 })
          ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : ""
          }`}
      >
        <Heading4 size={18} />
      </OptionBtn>


      <OptionBtn
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("orderList")
          ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : ""
          }`}
      >
        <ListOrdered size={18} />
      </OptionBtn>

      <OptionBtn
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("bulletList")
          ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : ""
          }`}
      >
        <List size={18} />
      </OptionBtn>

      <Separator className='h-6' orientation='vertical' />
      <AddImage editor={editor} />

    </FloatingMenu>
  )
}

export default FloatingContainer