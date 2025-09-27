import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const BredCrumNav = () => {
    const paths = usePathname();
    const pathNames = paths
        .split("/")
        .filter((path) => path !== "EN" && path.trim() !== "");
    const t = useTranslations("ROUTES");
    if (pathNames.length > 1) {
        return (
            <div className=''>
                {pathNames.map((link, i) => {
                    const href = `/${pathNames.slice(0, i + 1).join("/")}`
                    return (
                        <div key={i}>
                            {i + 1 < pathNames.length ? (
                                <>
                                    <Link href={href}>{t(link.toUpperCase())}</Link>
                                    <ChevronRight className='text-primary' />
                                </>
                            ) : (
                                <p>{t(link.toUpperCase())}</p>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default BredCrumNav
