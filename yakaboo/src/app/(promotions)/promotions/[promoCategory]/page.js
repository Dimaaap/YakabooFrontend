"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { PromotionsSidebar, Promotions } from "../../../../../components";
import { fetchData } from "../../../../../utils";


export default function PromoCategoryPage() {
    
    const pathname = usePathname();
    const categorySlug = pathname.split("/")[2];

    const [promotions, setPromotions] = useState([])

    useEffect(() => {
        fetchData(`http://localhost:8006/promotions/category/by-slug/${categorySlug}`, setPromotions, `promotions_${categorySlug}`)
    }, [categorySlug])

    return(
        <div className="promotions">
            <h4 className="promotions__title">Акції та знижки</h4>
            <div className="promotions__content">
                <PromotionsSidebar currentCategory={ categorySlug } />
                <Promotions promos={ promotions } />
            </div>
        </div>
    )
}
