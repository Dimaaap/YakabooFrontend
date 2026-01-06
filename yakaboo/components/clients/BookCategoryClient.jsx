"use client"

import { usePathname } from "next/navigation"
import Endpoints from "../../endpoints"
import { Breadcrumbs, CardsContainer, Filters, Spinner } from "../shared"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../../services/fetch.service"
import { STALE_TIME } from "../../site.config"

export const BookCategoryClient = () => {

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[2];

    const { data: category, isLoading: isCategoryLoading } = useQuery({
        queryKey: ["category", categorySlug],
        queryFn: () => fetcher(Endpoints.CATEGORY_BY_SLUG(categorySlug)),
        enabled: !!categorySlug,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false
    })

    const subcategories = category?.subcategories || []

    if(isCategoryLoading) return (
        <Spinner />
    )

    if(!category) return null

    const breadcrumbsLink = {"Книжки": "/books"}

    return(
        <div className="book-category">
            <Breadcrumbs linksList={ breadcrumbsLink } isSmaller={ true } />
            <div className="book-category__container"> 
                <Filters needBookCategories={ true } bookCategories={ subcategories || [] } categorySlug={ categorySlug } />
                <div className="book-category__book-section">
                    <div className="book-category__books">
                        <CardsContainer source={{ type: "category", slug: categorySlug }} categoryTitle={ category.title } />
                    </div>
                </div>
            </div>
        </div>
    )
}