"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../../services";
import { Breadcrumbs, CardsContainer, Filters } from "../../../../../../../components";

export default function AccessoryBrandPage() {    
    const pathname = usePathname();
    const brandSlug = pathname.split("/")[4];

    const [brand, setBrand] = useState(null);

    const breadcrumbsObject = {
        "Бренди аксесуарів": "/knyzhkovi-aksesuary/brands/view/all"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/accessories/brand-slug/${brandSlug}`, setBrand)
    }, [])

    let brandObject = brand && brand.length > 0 && brand[0]

    return(
        <div className="brand author">
            <Breadcrumbs linksList={ breadcrumbsObject } />
            { console.log(brandObject) }

            { brand && (
                <h2 className="brand__title author__title">
                    { brandObject.brand.title }
                </h2>
            ) }

            <div className="brand__flex-container author__flex-container">
                <Filters needAge={ false } needPrice={ true } needPublishers={ false }
                needLanguages={ false } needBookTypes={ false } needAuthors={ false }
                needCategories={ false } needBrands={ false } needTheme={ false }
                needFilters={ false }  needDifficultLevel={ false } />

                 { <CardsContainer booksList={ brand } isHobbies={ false } isAccessories={ true } /> }
            </div>
        </div>
    )
}