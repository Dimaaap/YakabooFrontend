"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { fetchData } from "../../../../../services";
import { Breadcrumbs, Filters, CardsContainer } from "../../../../../components";

export default function LiteraturePeriodPage() {

    const pathname = usePathname();
    const [period, setPeriod] = useState(null)
    const [periodBooks, setPeriodBooks] = useState([]);
    const periodSlug = pathname.split("/")[3];
    const periodId = period?.id || null;

    const breadcrumbsObject = {
        "Література За Періодами": "/literature-periods/view/all"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/literature_period/${periodSlug}`, setPeriod)
    }, [])

    useEffect(() => {
        if(periodId){
            fetchData(`http://localhost:8006/literature_period/period/${period.id}/books`, setPeriodBooks)
        }
    }, [periodId])


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