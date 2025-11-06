import React from 'react'
import Logo from '../Logo'
import Title from './Title'
import TaskCalender from '../TaskCalender'
import TagSelector from '@/components/common/tag/tagSelector/TagSelector'
import LinkTag from '@/components/common/tag/LinkTag'

const Header = () => {
  return (
    <div className='w-full border-b dark:border-neutral-800 border-neutral-200 p-3 sm:p-4 flex flex-col gap-3'>
      
      {/* Top Row */}
      <div className='flex items-center gap-3'>
        <Logo />

        <div className='flex-1 min-w-0'>
          <Title />
        </div>
      </div>

      {/* Tools Row */}
      <div className='flex items-center flex-wrap gap-2'>
        <TaskCalender />
        <TagSelector />
        <LinkTag />
      </div>

    </div>
  )
}

export default Header
