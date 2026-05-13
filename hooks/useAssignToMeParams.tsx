import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'

const useAssignToMeParams = () => {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get("type")
    const workspaceParam = searchParams.get("workspace") ?  searchParams.get("workspace") : "all"

    const currentType = useMemo(() => {
        return typeParam &&
            (typeParam === "all" ||
                typeParam === "tasks" ||
                typeParam === "mindMaps")
            ? typeParam
            : "all"
    }, [typeParam])

    return {currentType , workspaceParam}
}

export default useAssignToMeParams
