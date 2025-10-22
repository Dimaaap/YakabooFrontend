"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Image from "next/image"
import { Filters } from "../shared"

export const BookCategoryClient = () => {
    const [category, setCategory] = useState(null)

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[2];

    useEffect(() => {
        fetchData(Endpoints.CATEGORY_BY_SLUG(categorySlug), setCategory)
    }, [])

    return(
        <div className="book-category">
            <div className="book-category__header">
                <Link href="/books" className="book-category__books-link">
                    Книги
                </Link>
                { category && (
                    <h3 className="book-category__title">
                        { category.title }
                    </h3>    
                ) }
            </div>
            { category?.subcategories?.length > 0 && (
                <div className="book-category__subcategories-scroll">
                    {category.subcategories.map((subcategory, index) => (
                        <Link className="book-category__subcategory subcategory" key={ index } href={`/book-category/${categorySlug}/${subcategory.slug}`}>
                            { subcategory?.images_src?.length > 0 && (
                                <div className="subcategory__images-container">
                                    { subcategory.images_src.map((image, index) => (
                                        <Image src={ image.image_src } key={ index } className="subcategory__image" width="50" height="50" alt="" />
                                    )) }
                                </div>    
                            ) }
                            
                            <p className="subcategory__title">{subcategory.title}</p>
                        </Link>
                    ))}
                </div>
            ) }

            <div className="book-category__container">
                <Filters />
                <div className="book-category__book-section">
                    { category?.banners?.length > 0 && (
                        <div className="book-category__banners-section banners">
                            { category.banners.map((banner, index) => (
                                <Link href={ banner.link } key={ index }>
                                    <Image src={ banner.image_url } width="150" height="150" alt="" />
                                </Link>
                            )) }
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}