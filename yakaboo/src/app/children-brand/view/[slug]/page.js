"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../../services";
import { Breadcrumbs, CardsContainer, Filters } from "../../../../../components";

export default function ChildrenBrandPage() {
    const pathname = usePathname();

    const [brand, setBrand] = useState(null);
    const [brandHobbies, setBrandHobbies] = useState([])

    const brandSlug = pathname.split("/")[3]

    const breadcrumbsObject = {
        "Бренди": "/children-brands/view/all"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/hobby-brands/by-slug/${brandSlug}`, setBrand)
    }, [])

    useEffect(() => {
        if(brandSlug){
            fetchData(`http://localhost:8006/hobby-brands/hobbies/${brandSlug}`, setBrandHobbies)
        }
    }, [brandSlug])

    return (
        <div className="brand author">
            <Breadcrumbs linksList={ breadcrumbsObject } />

            { brand && (
                <h2 className="brand__title author__title">
                    { brand.title }
                </h2>
            ) }

            <div className="brand__flex-container author__flex-container">
                <Filters needAge={ false } needPrice={ true } needPublishers={ false }
                needLanguages={ false } needBookTypes={ false } needAuthors={ false }
                needCategories={ false } needBrands={ false } needTheme={ false }
                needFilters={ false }  needDifficultLevel={ false } />

                { <CardsContainer booksList={ brandHobbies.hobbies } isHobbies={ true } /> }
            </div>
        </div>
    )
}