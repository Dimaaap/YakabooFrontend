"use client"

import Link from 'next/link'
import Endpoints from '../../endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../services/fetch.service';
import { Spinner } from '../shared';

const MainHeader = () => {

    const SIX_HOURS = 6 * 60 * 60 * 1000

    const { data: interesting = [] } = useQuery({
        queryKey: ["interesting"],
        queryFn: () => fetcher(Endpoints.ALL_INTERESTING),
        staleTime: SIX_HOURS,
        gcTime: SIX_HOURS
    })

  return (
    <div className="main-header">
        <ul className="main-header__items">
            { interesting.length > 0 ? (
                interesting.map((interest, i) => (
                    <Link href={ interest.slug } key={ i } className={`main-header__link ${ i === 0 ? "is-active": "" }`}>
                        <li className={`main-header__point ${ i === 0 ? "is-active": "" }`}>
                            { interest.title }
                        </li>
                    </Link>
                ))
            ) : (
                [...Array(5)].map((_, i) => (
                    <li key={i} className="main-header__point skeleton-item"></li>
                ))
            )}
        </ul>
    </div>
  )
}

export default MainHeader