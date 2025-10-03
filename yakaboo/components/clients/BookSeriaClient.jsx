"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";

export function BookSeriaClient() {
    const [seria, setSeria] = useState(null);
    const [seriaBooks, setSeriaBooks] = useState([])

    const pathname = usePathname()
    const seriaSlug = pathname.split("/")[3]

    const breadcrumbsObject = {
        "Серія книг": "/book/seria/all"
    }

    useEffect(() => {
        fetchData(Endpoints.BOOK_SERIA(seriaSlug), setSeria)
    }, [])
    
    useEffect(() => {
        fetchData(Endpoints.ALL_SERIA_BOOKS(seriaSlug), setSeriaBooks)
    }, [])

    return (
        <div className="seria author">
            <Breadcrumbs linksList={ breadcrumbsObject } />
            { console.log(seria) }

            { seria && (
                <h2 className="seria__title author__title">
                    Серія книг - { seria.title }
                </h2>
            ) }

            <div className="seria__flex-container author__flex-container">
                <Filters />
                { seriaBooks.length > 0 && (<CardsContainer booksList={ seriaBooks } />) }
            </div>
        </div>
    )

}