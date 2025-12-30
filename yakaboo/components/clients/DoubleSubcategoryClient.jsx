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

    const { data: doubleSubcategory, isLoading: isDoubleSubcategoryLoading } = useQuery({
        queryKey: ["double-subcategory", doubleSubcategorySlug],
        queryFn: () => fetcher(Endpoints.DOUBLE_SUBCATEGORY_BY_SLUG(doubleSubcategorySlug)),
        enabled: !!doubleSubcategorySlug,
        staleTime: STALE_TIME
    })
    
    const { data: doubleSubcategoryBooks = [], isLoading: isBooksLoading } = useQuery({
        queryKey: ["double-subcategory-books", doubleSubcategorySlug],
        queryFn: () => fetcher(Endpoints.DOUBLE_SUBCATEGORY_BOOK(doubleSubcategorySlug)),
        enabled: !!doubleSubcategorySlug,
        staleTime: STALE_TIME
    })

    const { data: subcategory } = useQuery({
        queryKey: ["subcategory", subcategorySlug],
        queryFn: () => fetcher(Endpoints.SUBCATEGORY_BY_SLUG(subcategorySlug)),
        enabled: !!subcategorySlug,
        staleTime: STALE_TIME
    })

    if(isDoubleSubcategoryLoading || isBooksLoading) return <Spinner />

    const breadcrumbsLink = {
        Книжки: "/book",
        [subcategory?.title]: [subcategory?.slug],
    }

    return (
        <div className="subcategory">
            <Breadcrumbs linksList={ breadcrumbsLink } />
            { doubleSubcategory && (
                <h3 className="subcategory__header-title">
                    { doubleSubcategory.title }
                </h3>
            ) }
            <div className="subcategory__container">
                <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false } />

                { doubleSubcategoryBooks.length > 0 && (
                    <CardsContainer booksList={ doubleSubcategoryBooks } />
                ) }
            </div>
        </div>
    )
}