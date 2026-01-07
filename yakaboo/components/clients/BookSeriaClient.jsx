"use client";

import { usePathname } from "next/navigation";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Image from "next/image";
import { STALE_TIME } from "../../site.config";

export function BookSeriaClient() {
    const pathname = usePathname()
    const seriaSlug = pathname.split("/")[3]

    const breadcrumbsObject = {
        "Серія книг": "/book/seria/all"
    }

    const { data: seria, isLoading: seriaLoading, error: seriaError } = useQuery({
        queryKey: ["seria", seriaSlug],
        queryFn: () => fetcher(Endpoints.BOOK_SERIA(seriaSlug)),
        enabled: !!seriaSlug,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false
    });

    if(seriaLoading || seriaError) return (
         <div className="spinner">
            <Image src="/icons/spinner.svg" alt="" width="20" height="20" />
        </div>
    )

    return (
        <div className="seria author">
            <Breadcrumbs linksList={ breadcrumbsObject } />

            { seria && (
                <h2 className="seria__title author__title">
                    Серія книг - { seria.title }
                </h2>
            ) }

            <div className="seria__flex-container author__flex-container">
                <Filters />
                { seria && (<CardsContainer source={{ type: "series", slug: seria.slug }} />) }
            </div>
        </div>
    )

}