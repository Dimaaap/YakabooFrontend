"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { fetchData } from "../../../../../services";
import { Breadcrumbs } from "../../../../../components";

export default function LiteraturePeriodPage() {

    const pathname = usePathname();
    const [period, setPeriod] = useState(null)
    const periodSlug = pathname.split("/")[3];

    const breadcrumbsObject = {
        "Література За Періодами": "/literature-periods/view/all"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/literature_period/${periodSlug}`, setPeriod)
    }, [])


    return(
        <div className="period author">
            <Breadcrumbs linksList={breadcrumbsObject} />

            { period && <h2 className="period__title">{ period.title }</h2> }
        </div>
    )
}