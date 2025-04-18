import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const Breadcrumbs = ({ linksList }) => {

    const allLinks = {
        "Головна": "/",
        ...linksList
    }

    const allLinksLength = Object.keys(allLinks).length;

  return (
    <ul className="breadcrumbs">
        { Object.entries(allLinks).map(([label, path], index) => (
            <li key={ index } className="breadcrumbs__item">
                <Link href={path} className="breadcrumbs__link">
                    {label}
                    { index + 1 < allLinksLength && <Image src="/icons/separator.svg" alt="" 
                    width="16" height="16" /> }
                    
                </Link>
            </li>
        )) }
    </ul>
  )
}
