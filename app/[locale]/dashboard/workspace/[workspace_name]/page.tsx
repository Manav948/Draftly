import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
    params: {
        workspace_name: string
    }
}

const page = async ({ params: { workspace_name } }: Params) => {
    const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_name}`)
    return (
        <div>
            {workspace_name}
        </div>
    )
}

export default page
