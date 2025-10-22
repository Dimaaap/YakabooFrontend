"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Image from "next/image"
import { CardsContainer, Filters } from "../shared"
import { CategoryBanner } from "../shared/CategoryBanner"

export const BookCategoryClient = () => {
    const [category, setCategory] = useState(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollRef = useRef(null);

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[2];
    const banners = category?.banners

    useEffect(() => {
        fetchData(Endpoints.CATEGORY_BY_SLUG(categorySlug), setCategory)
    }, [])

    const subcategories = category?.subcategories || []
    const total = subcategories?.length;

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

    const handleNext = () => {
        if(scrollRef.current){
            scrollRef.current.scrollBy({
                left: scrollRef.current.offsetWidth,
                behavior: "smooth"
            })
        }
    }

    const handlePrev = () => {
        if(scrollRef.current){
            scrollRef.current.scrollBy({
                left: -scrollRef.current.offsetWidth,
                behavior: "smooth"
            })
        }
    }

    if(!category) return null

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
            { total > 0 && (
                <>
                    { canScrollLeft && (
                        <button className="books-container__btn container-slider-btn prev-btn category-btn"
                        onClick={ handlePrev }>
                            <Image src="/icons/arrow-left.svg" alt="" width="30" height="30" />
                        </button>     
                    ) }
                       
                    <div className="book-category__subcategories-scroll" ref={ scrollRef }>
                        {subcategories.map((subcategory, index) => (
                            <Link className="book-category__subcategory subcategory" key={ index } 
                            href={`/book-category/${categorySlug}/${subcategory.slug}`}>
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
                    { canScrollRight && (
                        <button className="books-container__btn container-slider-btn next-btn category-btn"
                        onClick={ handleNext }>
                            <Image src="/icons/arrow-left.svg" alt="" width="30" height="30" />
                        </button>      
                    ) }
                      
                </>
                
            ) }

            <div className="book-category__container">
                <Filters />
                <div className="book-category__book-section">
                    { banners.length > 0 && (
                        <CategoryBanner banners={ banners } />
                    ) }

                    <div className="book-category__books">
                    <CardsContainer booksList={ category?.books || [] } />
                </div>
                </div>
            </div>
        </div>
    )
}