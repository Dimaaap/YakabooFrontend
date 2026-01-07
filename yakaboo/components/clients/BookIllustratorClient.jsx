"use client"

import { usePathname } from "next/navigation";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters, Spinner } from "../shared";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import { STALE_TIME } from "../../site.config";

export const BookIllustratorClient = () => {

    const pathname = usePathname();
    const illustratorSlug = pathname.split("/")[3];

    const {data: illustrator, isLoading: isIllustratorLoading, error: illustratorError} = useQuery({
        queryKey: ["illustrator", illustratorSlug],
        queryFn: () => fetcher(Endpoints.ILLUSTRATOR(illustratorSlug)),
        enabled: !!illustratorSlug,
        staleTime: STALE_TIME
    })

    if(isIllustratorLoading || illustratorError) return <Spinner />

    const breadcrumbsObject ={ 
        "Ілюстратори": "/book-illustrators/view/all"
    }

    return (
        <div className="translator author">
            <Breadcrumbs linksList={ breadcrumbsObject } isSmaller={ true } />

            { illustrator && (
                <h2 className="seria__title author__title">
                    { illustrator.first_name } { illustrator.last_name }
                </h2>
            ) }

            <div className="translator__flex-container author__flex-container">
                <Filters />
                { illustrator && (<CardsContainer source={{ type: "illustrator", id: illustrator.id }} />) }
            </div>
        </div>
    )

}