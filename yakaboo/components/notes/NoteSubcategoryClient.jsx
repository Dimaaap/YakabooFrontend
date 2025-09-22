"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { HobbySubcategoryContainer } from "../hobbies/SubcategoryContainer";

export const NoteSubcategoryClient = () => {
    const [subCategory, setSubCategory] = useState(null);

    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];
    
    
    const breadcrumbsObject = {
        "Блокноти": "/notes",
    }
    
    useEffect(() => {
        fetchData(`http://localhost:8006/subcategory/notebooks/${subcategorySlug}`, setSubCategory)
    }, [])

    return(
        <div className="book hobby hobby-subcategory">
            { subCategory && <HobbySubcategoryContainer subCategory={ subCategory } 
            breadcrumbsLink={ breadcrumbsObject } subCategoryLink={`/notes/sub-category/${subcategorySlug}`} isNotebooks={ true } /> }
            
        </div>
    )
}