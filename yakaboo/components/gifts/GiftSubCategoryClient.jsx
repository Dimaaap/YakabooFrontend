"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import { fetchData } from "../../services";
import { HobbySubcategoryContainer } from "../hobbies/SubcategoryContainer";

export const GiftSubCategoryClient = () => {
    
    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];

    const [subCategory, setSubCategory] = useState(null);

    const breadcrumbsObject = {
        "Подарунки": "/gifts"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/gift-subcategories/gifts/${subcategorySlug}`, setSubCategory)
    }, [])

    return(
        <div className="book hobby hobby-subcategory">
            { subCategory && <HobbySubcategoryContainer subCategory={ subCategory } breadcrumbsLink={ breadcrumbsObject }
            subCategoryLink={`/gits/sub-category/${subcategorySlug}`} isHobbies={ false } isGifts={ true } />  }
        </div>
    )
}