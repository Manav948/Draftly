import { CalendarItem } from '@/types/extended'
import React, { useMemo } from 'react'
import CalendarTask from './CalendarTask';

interface Props {
    calendarItems: CalendarItem[];
    topOffSet: number
}
const CalendarTasks = ({ calendarItems, topOffSet }: Props) => {
    const visibleItems = useMemo(() => {
        return calendarItems.slice(0, 2);
    }, [calendarItems])
    return (
        // <div>
        //     {
        //         visibleItems.map((calendarItem) => (
        //             <CalendarTask
        //                 key={calendarItem.taskId}
        //                 topOffset={topOffSet}
        //                 calendarItem={calendarItem}
        //             />
        //         ))}
        //     {calendarItems.length > 3 && (
        //         <button>{calendarItems.length - visibleItems.length} more</button>
        //     )}
        // </div>
        <></>
    )
}

export default CalendarTasks
