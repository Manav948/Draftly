"use client"

import { usePathname } from "next/navigation"

const Welcoming = () => {
    const pathname = usePathname();
    if (pathname === "/dashboard") {

        return (
            <div>
                <p>
                    Hey , <span>Manav</span> 👋
                </p>
                <p>Welcome to Draftly</p>
            </div>
        )
    }
}

export default Welcoming
