"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import Link from "next/link";
import { HobbyCategoryContainer } from "../hobbies";
import Endpoints from "../../endpoints";




export const NoteCategoryClient = () => {
    const [category, setCategory] = useState(null)
    
    const router = usePathname();
    const categorySlug = router.split("/")[3];

    useEffect(() => {
        fetchData(Endpoints.NOTEBOOK_CATEGORY(categorySlug), setCategory)
    }, [])

    return(
        <div className="book hobby">
            <div className="hobby__header">
                <Link href="/notes" className="hobby__link">
                    Блокноти
                </Link>
                { category && (
                    <h2 className="hobby__title">
                        { category?.title }
                    </h2>
                ) }
            </div>

            { category && (
                <div className="hobby__categories">
                    { 
                        category?.subcategories?.map((sub, index) => (
                            <Link className="hobby__categories-category" href={`/notes/sub-category/${sub.slug}`} key={ index }>
                                <div className="hobby-categories__image-container">
                                    { sub.images_src.length > 0 && (
                                        sub?.images_src?.map((image, i) => (
                                            <Image src={ image.image_src } key={i} alt={`${sub.title}_${i}`} width="80" height="80"
                                            className="hobby-categories__image" />
                                        ))
                                    ) }
                                </div>
                                <p className="hobby-categories__title">
                                    { sub.title }
                                </p>
                            </Link>
                        ))
                    }
                </div>
            ) }

            { category && (
                <HobbyCategoryContainer categories={ category.notebooks } notebooks={ true } isNotebooks={ true } />
            ) }
        </div>
    )    
}