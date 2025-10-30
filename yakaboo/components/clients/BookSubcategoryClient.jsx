"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import Link from "next/link";
import Image from "next/image";

export const BookSubcategoryClient = () => {
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState(null)
    const [doubleSubcategories, setDoubleSubcategories] = useState([]);
    const [subcategoryBooks, setSubcategoryBooks] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef(null);

    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];
    const categorySlug = pathname.split("/")[2];

    useEffect(() => {
        fetchData(Endpoints.CATEGORY_BY_SLUG(categorySlug), setCategory)
    }, [])

    useEffect(() => {
        fetchData(Endpoints.SUBCATEGORY_BY_SLUG(subcategorySlug), setSubcategory)
    }, [])

    useEffect(() => {
        if(subcategory){
            fetchData(Endpoints.SUBCATEGORY_BOOKS(subcategorySlug), setSubcategoryBooks)    
        } else {
            return
        }       
    }, [subcategory])

    useEffect(() => {
        if(subcategory){
            fetchData(Endpoints.DOUBLE_SUBCATEGORIES(subcategory.id), setDoubleSubcategories)
        } else {
            return 
        }
    }, [subcategory])

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

    const breadcrumbsLink = {
        Книжки: "/books",
    }

    if(category) {
        breadcrumbsLink[category.title] = `/book-categories/${categorySlug}`
    } else {
        return
    }

    return(
        <div className="subcategory">
            { console.log(doubleSubcategories) }
            <Breadcrumbs linksList={ breadcrumbsLink } />
            { subcategory && (
                <h3 className="subcategory__header-title">
                    { subcategory.title }
                </h3>    
            ) }
            { doubleSubcategories.length > 0 && (
                <>
                    { canScrollLeft && (
                        <button className="books-container__btn container-slider-btn prev-btn category-btn"
                        onClick={ handlePrev }>
                            <Image src="/icons/arrow-left.svg" alt="" width="30" height="30" />
                        </button>     
                    ) }
                       
                    <div className="book-category__subcategories-scroll" ref={ scrollRef }>
                        {doubleSubcategories.map((double_subcategory, index) => (
                            <Link className="book-category__subcategory subcategory" key={ index } 
                            href={`/book-categories/${categorySlug}/${subcategory.slug}/${double_subcategory.slug}`}>
                                { double_subcategory?.images_src?.length > 0 && (
                                    <div className="subcategory__images-container">
                                        { double_subcategory.images_src.map((image, index) => (
                                            <Image src={ image.image_src } key={ index } className="subcategory__image" width="50" height="50" alt="" />
                                        )) }
                                    </div>    
                                ) }
                                
                                <p className="subcategory__title">{double_subcategory.title}</p>
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
            <div className="subcategory__container">
                <Filters needDifficultLevel={ false } needTheme={ false } needCategories={ false }/>

                { subcategoryBooks.length > 0 && (
                    <CardsContainer booksList={ subcategoryBooks } />    
                ) }
            </div>
           
        </div>
    )
}