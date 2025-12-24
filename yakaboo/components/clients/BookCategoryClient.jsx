"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Image from "next/image"
import { Breadcrumbs, CardsContainer, Filters } from "../shared"
import { CategoryBanner } from "../shared/CategoryBanner"

export const BookCategoryClient = () => {
    const [category, setCategory] = useState(null);
    const [categoryBooks, setCategoryBooks] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollRef = useRef(null);

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[2];

    useEffect(() => {
        fetchData(Endpoints.CATEGORY_BY_SLUG(categorySlug), setCategory)
    }, [])


    useEffect(() => {
        if(!category) return;
        fetchData(Endpoints.CATEGORY_BOOKS(category.id), setCategoryBooks)
    }, [category])

    const subcategories = category?.subcategories || []

    const checkScroll = () => {
        const el = scrollRef.current;

        if(!el) return 

        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
    }

    useEffect(() => {
        const el = scrollRef.current 

        if(!el) return 

        checkScroll()
        el.addEventListener("scroll", checkScroll);
        el.addEventListener("resize", checkScroll)

        return() => {
            el.removeEventListener("scroll", checkScroll);
            el.removeEventListener("resize", checkScroll)
        }
    }, [category])

    if(!category) return null

    const breadcrumbsLink = {"Книжки": "/books"}

    return(
        <div className="book-category">
            <Breadcrumbs linksList={ breadcrumbsLink } isSmaller={ true } />
            <div className="book-category__container"> 
                <Filters needBookCategories={ true } bookCategories={ subcategories || [] } categorySlug={ categorySlug } />
                <div className="book-category__book-section">
                    <div className="book-category__books">
                        <CardsContainer booksList={ categoryBooks || [] } categoryTitle={ category.title } />
                    </div>
                </div>
            </div>
        </div>
    )
}