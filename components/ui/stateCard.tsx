import React from 'react'
import { Card, CardContent } from './card'

const StateCard = ({
    icon: Icon,
    label,
    value
}: {
    icon: any,
    label: string,
    value: number
}) => {
    return (
        <div>
            <Card
                className="dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-black/30 hover:-translate-y-0.5 transition">
                <CardContent className="flex items-center gap-4 py-5">
                    <Icon className="text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StateCard
