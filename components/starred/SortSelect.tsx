"use client"
import React from 'react'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"
import { StarredItem } from '@/types/saved'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
interface Props {
    sortType: string | null
    refetch: <TPageData>(
        //@ts-ignore
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<StarredItem[], unknown>>;
}
const SortSelect = ({sortType , refetch} : Props) => {

    const router = useRouter();
    const onSelectHanlder = (type : "asc" | "desc") => {
        router.push(`/dashboard/starred/?sort=${type}`)
        refetch()
    }
    return (
        <div>
            <Select 
            defaultValue={sortType === "asc" || sortType === "desc" ? sortType : "desc"}
            onValueChange={(field) => {
                onSelectHanlder(field as "asc" || "desc")
            }}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Sort' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='asc'>Ascending</SelectItem>
                    <SelectItem value='desc'>Descending</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortSelect
