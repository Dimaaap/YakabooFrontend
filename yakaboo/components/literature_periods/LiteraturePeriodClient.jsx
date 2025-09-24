"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchData } from "../../services"
import { Breadcrumbs, CardsContainer, Filters } from "../shared"
import Endpoints from "../../endpoints"


export const LiteraturePeriodClient = () => {
    const [period, setPeriod] = useState(null)
    const [periodBooks, setPeriodBooks] = useState([])

    const pathname = usePathname();
    const periodSlug = pathname.split("/")[3];
    const periodId = period?.id || null;

    const breadcrumbsObject = {
        "Література За Періодами": "/literature-periods/view/all"
    }

    useEffect(() => {
        fetchData(Endpoints.LITERATURE_PERIOD(periodSlug), setPeriod)
    }, [])

    useEffect(() => {
        if(periodId){
            fetchData(Endpoints.LITERATURE_PERIOD_BOOKS(period.id), setPeriodBooks)
        }
    }, [])

    return(
            <div className="period author">
                <Breadcrumbs linksList={breadcrumbsObject} />
    
                { period && <h2 className="period__title">{ period.title }</h2> }
    
                <div className="period__flex-container author__flex-container">
                    <Filters />
                    { periodBooks.length > 0 && (<CardsContainer booksList={periodBooks} />) }
                </div>
            </div>
        )
}