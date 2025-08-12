"use client"

import { useState, useEffect } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Link from "next/link"
import Image from "next/image"

export const HobbyCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_HOBBY_CATEGORIES, setCategories)
    }, [])

    return(
        <div className="hobby-categories__container">
            { categories && (
                categories.map((category, index) => (
                    <Link className="hobby-categories__category" href={`/hobby/category/${category.slug}`} key={index}>
                        <div className="hobby-categories__image-container">
                            {category.images_src.length > 0 && (
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