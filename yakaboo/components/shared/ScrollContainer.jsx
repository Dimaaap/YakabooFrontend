"use client"

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export const ScrollContainer = ({ category, content, categorySlug, subcategorySlug }) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollRef = useRef(null)

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

    return (
        <div className="wrapper">
            { content.length > 0 && (
                <>
                    { canScrollLeft && (
                        <button className="books-container__btn container-slider-btn prev-btn category-btn"
                        onClick={ handlePrev }>
                            <Image src="/icons/arrow-left.svg" alt="" width="30" height="30" />
                        </button>     
                    ) }
                        
                    <div className="book-category__subcategories-scroll" ref={ scrollRef }>
                        {content.map((item, index) => (
                            <Link className="book-category__subcategory subcategory" key={ index } 
                            href={`/book-categories/${categorySlug}/${subcategorySlug}/${item.slug}`}>
                                { item?.images_src?.length > 0 && (
                                    <div className="subcategory__images-container">
                                        { item.images_src.map((image, index) => (
                                            <Image src={ image.image_src } key={ index } className="subcategory__image" width="50" height="50" alt="" />
                                        )) }
                                    </div>    
                                ) }
                                    
                                <p className="subcategory__title">{item.title}</p>
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
        </div>
       
    )
}