import React from 'react'
import { Card, CardContent } from '../ui/card'
import Container from './container/Container'
import Header from './header/Header'

const Editor = () => {
    return (
        <Card>
            <CardContent>
                <Header />
                <Container />
            </CardContent>
        </Card>
    )
}

export default Editor
