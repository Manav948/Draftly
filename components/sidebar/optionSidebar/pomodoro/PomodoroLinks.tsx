import ActiveLink from '@/components/ui/active-link'
import { Clock, Settings } from 'lucide-react'
import React from 'react'

const PomodoroLinks = () => {
    return (
        <div className='flex flex-col gap-6 w-full'>
            <div className='flex flex-col gap-2 w-full mt-2'>
                <ActiveLink
                    href="/dashboard/pomodoro"
                    variant={"ghost"}
                    size={"sm"}
                    className='w-full flex items-center justify-start gap2'
                >
                    <Clock />timer
                </ActiveLink>

                <ActiveLink
                    href="/dashboard/pomodoro/settings"
                    variant={"ghost"}
                    size={"sm"}
                    className='w-full flex items-center justify-start gap-2'
                >
                    <Settings />settings
                </ActiveLink>
            </div>
        </div>
    )
}

export default PomodoroLinks
