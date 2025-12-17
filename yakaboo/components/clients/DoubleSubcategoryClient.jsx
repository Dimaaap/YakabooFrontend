"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import { Breadcrumbs, CardsContainer, Filters } from "../shared"

export const DoubleSubactegoryClient = () => {
    const [doubleSubcategoryBooks, setDoubleSubcategoryBooks] = useState([])
    const [subcategory, setSubcategory] = useState(null);
    const [doubleSubcategory, setDoubleSubcategory] = useState(null);

    const pathname = usePathname();
    const doubleSubcategorySlug = pathname.split("/")[4];
    const subcategorySlug = pathname.split("/")[3];
    
    
    useEffect(() => {
        fetchData(Endpoints.DOUBLE_SUBCATEGORY_BY_SLUG(doubleSubcategorySlug), setDoubleSubcategory)
    }, [])


    useEffect(() => {
        if(doubleSubcategory){
            fetchData(Endpoints.DOUBLE_SUBCATEGORY_BOOK(doubleSubcategorySlug), setDoubleSubcategoryBooks)
        } else {
            return 
        }
    }, [doubleSubcategory])

    useEffect(() => {
        fetchData(Endpoints.SUBCATEGORY_BY_SLUG(subcategorySlug), setSubcategory)
    }, [])

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