"use client";

import { usePathname } from "next/navigation";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters, Spinner} from "../shared";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import { STALE_TIME } from "../../site.config";

export const BookSubcategoryClient = () => {

    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];
    const categorySlug = pathname.split("/")[2];

    const { data: category, isLoading: isCategoryLoading } = useQuery({
        queryKey: ["category", categorySlug],
        queryFn: () => fetcher(Endpoints.CATEGORY_BY_SLUG(categorySlug)),
        enabled: !!categorySlug,
        staleTime: STALE_TIME
    })

    const { data: subcategory, isLoading: isSubcategoryLoading } = useQuery({
        queryKey: ["subcategory", subcategorySlug],
        queryFn: () => fetcher(Endpoints.SUBCATEGORY_BY_SLUG(subcategorySlug)),
        enabled: !!subcategorySlug,
        staleTime: STALE_TIME
    })

    const { data: doubleSubcategories = [] } = useQuery({
        queryKey: ["double-subcategories", subcategory?.id],
        queryFn: () => fetcher(Endpoints.DOUBLE_SUBCATEGORIES(subcategory?.id)),
        enabled: !!subcategory?.id
    })

    if(isCategoryLoading || isSubcategoryLoading) return <Spinner />


    const breadcrumbsLink = {
        Книжки: "/books",
    }

    if(category) {
        breadcrumbsLink[category.title] = `/book-categories/${categorySlug}`
    } else {
        return
    }

    return(
        <div className="subcategory">
            <Breadcrumbs linksList={ breadcrumbsLink } />
            { subcategory && (
                <h3 className="subcategory__header-title">
                    { subcategory.title }
                </h3>    
            ) }
            
            <div className="subcategory__container">
                { doubleSubcategories?.length > 0 ? (
                    <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false }
                    needBookCategories={ true } bookCategories={ doubleSubcategories } categorySlug={ categorySlug } subcategories={ true }  />
                ) : (
                    <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false }/>
                ) }
                
                <CardsContainer source={{ type: "subcategory", slug: subcategorySlug }} categoryTitle={ subcategory.title } />    
            </div>
           
        </div>
    )
}