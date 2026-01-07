"use client"

import { usePathname } from "next/navigation"
import Endpoints from "../../endpoints"
import { Breadcrumbs, CardsContainer, Filters, Spinner } from "../shared"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../../services/fetch.service"
import { STALE_TIME } from "../../site.config"

export const DoubleSubactegoryClient = () => {
    const pathname = usePathname();

    const doubleSubcategorySlug = pathname.split("/")[4];
    const subcategorySlug = pathname.split("/")[3];
    const categorySlug = pathname.split("/")[2];

    const { data: doubleSubcategory, isLoading: isDoubleSubcategoryLoading } = useQuery({
        queryKey: ["double-subcategory", doubleSubcategorySlug],
        queryFn: () => fetcher(Endpoints.DOUBLE_SUBCATEGORY_BY_SLUG(doubleSubcategorySlug)),
        enabled: !!doubleSubcategorySlug,
        staleTime: STALE_TIME
    })


    const { data: subcategory } = useQuery({
        queryKey: ["subcategory", subcategorySlug],
        queryFn: () => fetcher(Endpoints.SUBCATEGORY_BY_SLUG(subcategorySlug)),
        enabled: !!subcategorySlug,
        staleTime: STALE_TIME
    })

    if(isDoubleSubcategoryLoading) return <Spinner />

    const breadcrumbsLink = {
        Книжки: "/book",
        [subcategory?.title]: `/book-categories/${categorySlug}/${subcategorySlug}`,
    }

    return (
        <div className="subcategory">
            <Breadcrumbs linksList={ breadcrumbsLink } />
            <div className="subcategory__container">
                <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false } />

                <CardsContainer source={{ type: "double_subcategory", slug: doubleSubcategorySlug }} 
                categoryTitle={ doubleSubcategory.title } />
            </div>
        </div>
    )
}