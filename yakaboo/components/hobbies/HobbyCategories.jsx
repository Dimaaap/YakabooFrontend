"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Link from "next/link"
import Image from "next/image"

export const HobbyCategories = ({ fetchCategories=null }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if(!fetchCategories){
            fetchData(Endpoints.ALL_HOBBY_CATEGORIES, setCategories)
        }
        }, [])

    const allCategories = fetchCategories || categories
    const needAccessoriesLink = fetchCategories?.length > 0

    return(
        <div className="hobby-categories__container">
            { allCategories && (
                allCategories.map((category, index) => (
                    <Link className="hobby-categories__category" 
                    href={!needAccessoriesLink ? `/hobby/category/${category.slug}` 
                    : `/knyzhkovi-aksesuary/category/${category.slug}`} key={index}>
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