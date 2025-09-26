
"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Link from "next/link"
import Image from "next/image"

export const HobbyCategories = ({ fetchCategories=null, isNotebooks=false }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if(!fetchCategories){
            fetchData(Endpoints.ALL_HOBBY_CATEGORIES, setCategories)
        }
        }, [])

    const getCategoryLink = (categorySlug) => {
        if(!needAccessoriesLink){
            return `/hobby/category/${categorySlug}`
        } else if(isNotebooks){
            return `/notes/category/${categorySlug}`
        } else {
            return `/knyzhkovi-aksesuary/category/${categorySlug}`
        }
    }

    const allCategories = fetchCategories || categories
    const needAccessoriesLink = fetchCategories?.length > 0

    return(
        <div className="hobby-categories__container">
            { allCategories && (
                allCategories.map((category, index) => (
                    <Link className="hobby-categories__category" 
                    href={ getCategoryLink(category.slug) } key={index}>
                        <div className="hobby-categories__image-container">
                            {category?.images_src?.length > 0 && (
                                category.images_src.map((image, i) => (
                                    <Image src={image} key={ i } alt="" width="80" height="80" className="hobby-categories__image" />
                                ))
                            )}
                        </div>
                        <p className="hobby-categories__title">
                            { category.title }
                        </p>
                    </Link>
                ))
            ) }
        </div>
    )
}
