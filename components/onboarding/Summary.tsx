"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const Summary = () => {
    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle >Card title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent >
                    <p>Card content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </section>
    )
}

export default Summary
