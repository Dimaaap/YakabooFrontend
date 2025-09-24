"use client"

import { useEffect, useState } from "react"
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { Filters, Skeleton } from "../shared";
import { PromoContainer } from ".";
import { usePathname } from "next/navigation";

export const PromoClient = () => {
    const [currentPromo, setCurrentPromo] = useState(null);

    const pathname = usePathname();
    const promoSlug = pathname.split("/")[2]
    
    useEffect(() => {
        fetchData(Endpoints.PROMOTION(promoSlug), setCurrentPromo)
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