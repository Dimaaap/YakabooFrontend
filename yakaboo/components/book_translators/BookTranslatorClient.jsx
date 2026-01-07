"use client"

import { usePathname } from "next/navigation"
import { Breadcrumbs, CardsContainer, Filters, Spinner } from "../shared";
import Endpoints from "../../endpoints";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import { STALE_TIME } from "../../site.config";

export const BookTranslatorClient = () => {

    const pathname = usePathname();
    const translatorSlug = pathname.split("/")[3];

    const breadcrumbsObject = {
        "Перекладачі": "/book-translator/view/all"
    }

    const { data: translator, isLoading: isTranslatorLoading, error: translatorError } = useQuery({
        queryKey: ["translator", translatorSlug],
        queryFn: () => fetcher(Endpoints.TRANSLATOR(translatorSlug)),
        enabled: !!translatorSlug,
        staleTime: STALE_TIME
    })
    
    if(isTranslatorLoading || translatorError) return <Spinner />

    return (
        <div className="translator author">
            <Breadcrumbs linksList={breadcrumbsObject} />
    
            { translator && (
                <h2 className="seria__title author__title">
                    { translator.first_name } { translator.last_name }
                </h2>
                )
            }
    
            <div className="translator__flex-container author__flex-container">
                <Filters />
                { translator && (<CardsContainer source={{ type: "translator", id: translator.id }} />) }
            </div>
        </div>
        )
    
}