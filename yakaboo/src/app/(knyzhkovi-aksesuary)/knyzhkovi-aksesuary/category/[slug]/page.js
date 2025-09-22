"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../services";

export default function AccessoryCategoryPage() {

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[3];   
    
    const [category, setCategory] = useState([]);

    const breadcrumbsObject = {
        "Книжкові аксесуари": "/knyzhkovi-aksesuary"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/accessories-categories/accessories/${categorySlug}`, setCategory)
    }, [])

    let categoryItem = category && category.length > 0 && category[0]
    
    return (
        <div>
            { console.log(categoryItem) }        
            <h1>adddas</h1>    
        </div>
        
    )
}