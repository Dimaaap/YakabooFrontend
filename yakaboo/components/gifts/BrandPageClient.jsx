"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import Endpoints from "../../endpoints";

export const BrandPageClient = () =>{

    const pathname = usePathname()
    const brandSlug = pathname.split('/')[4];

    const [brand, setBrand] = useState(null);

    const breadcrumbObject = {
        "Бренди подарунків": "/gifts/brands/view/all"
    }

    useEffect(() => {
        fetchData(Endpoints.GIFT_BRAND(brandSlug), setBrand)
    }, [])

    let brandObject = brand && brand.length > 0 && brand[0]

    return(
        <div className="brand author">
            <Breadcrumbs linksList={ breadcrumbObject } />

            { brand && (
                <h2 className="brand__title author__title">
                    { brand.title }
                </h2>
            ) }

            <div className="brand__flex-container author__flex-container">
                <Filters needAge={ false } needPrice={ true } needPublishers={ false }
                needLanguages={ false } needBookTypes={ false } needAuthors={ false }
                needCategories={ false } needGiftBrands={ true } needTheme={ false }
                needFilters={ true } />
                { brand && (
                    <CardsContainer booksList={ brand.gifts } isHobbies={ false } isAccessories={ false } isGifts={ true } giftsBrand={brand.title} />    
                ) }
                
            </div>
        </div>
    )
}