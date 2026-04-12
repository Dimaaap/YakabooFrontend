"use client"

import Endpoints from "../../endpoints";
import { Filters, Skeleton } from "../shared";
import { PromoContainer } from ".";
import { usePathname } from "next/navigation";
import { fetcher } from "../../services/fetch.service";
import { STALE_TIME } from "../../site.config";
import { useQuery } from "@tanstack/react-query";

export const PromoClient = () => {

    const pathname = usePathname();
    const promoSlug = pathname.split("/")[2]
    

    const { data: currentPromo } = useQuery({
        queryKey: ["promotion", promoSlug],
        queryFn: () => fetcher(Endpoints.PROMOTION(promoSlug)),
        staleTime: STALE_TIME
    })

    return(
       <div className="promotions promotion-page">
            <h4 className="promotions__title">Акції та знижки</h4>
       
            { currentPromo ? <PromoContainer currentPromo={ currentPromo } /> : <Skeleton /> }
       
            <div className="promotion-page__main-content promo-content">
                <div className="promo-content__left">
                    <Filters />
                </div>
            </div>
        </div>
    )
}