import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested Resources</p>
            <p>
                view <Link href={"/"} >Home Page</Link>
            </p>
        </div>
    )
}

export default NotFound
