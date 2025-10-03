"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import { Badge, BookInfoBadge, ProductCard, Stars, TopBadge } from "../shared"
import { badgeColors } from "../../site.config"

export const OtherSeriaBooks = ({ book }) => {
    const [otherSeriaBooks, setOtherSeriaBooks] = useState([])
    const sliderRef = useRef(null);

    const scroll = direction => {
        console.log(direction)
        if(sliderRef.current){
            const scrollAmount = sliderRef.current.offsetWidth;

            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount: scrollAmount,
                behavior: "smooth"
            })
        }
    }


    useEffect(() => {
        fetchData(Endpoints.ALL_SERIA_BOOKS(book.seria.slug), setOtherSeriaBooks)
    }, [])

    return(
        <div className="books-container">
            <Link className="books-container__badge category-badge blue-badge small-badge" href="#">
                Книга входить в серію
            </Link>

            <div className="books-container__slider">
                { otherSeriaBooks.length > 4 && (
                    <button className={`books-container__btn prev-btn container-slider-btn`} type="button" onClick={() => scroll("left") }>
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>    
                ) }
                
                { otherSeriaBooks.length > 0 && (
                    <div className="books-container__slider book-slider container-slider" ref={ sliderRef }>
                        { otherSeriaBooks.map((book, index) => (
                            <ProductCard key={ index } productLink={ `/book/${book.slug}` }
                            extraClass="container-slider__book"
                            title={ book.title } brand={ book.publishing.title } 
                            imageSrc={ book.images[0].image_url } 
                            badges={
                                [ 
                                    book.stars > 0 ? <Stars count={ book.stars } isSmaller={ true } /> : null,
                                    book.is_top && <TopBadge />,
                                    book.is_in_chart && <Badge text="Добірка" backgroundColor={badgeColors.green} />
                                ]
                            }
                            productCode={ book.book_info.code }
                            oldPrice={ book.price }
                            inStock={ book.book_info.in_stock }
                            bonusesCount={ book.book_info.bonuses }/>
                        )) }
                        
                    </div>    
                ) }
                { otherSeriaBooks.length > 4 && (
                    <button className={`books-container__btn next-btn container-slider-btn`}
                    type="button" onClick={() => scroll("right") }>
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                ) }

            </div>
            <Link href={`/book/seria/${book.seria.slug}`} className="books-container__more-books">
                Перейти до категорії
                <Image src="/icons/arrow-left.svg" width="20" height="20" alt="" />
            </Link>
        </div>
    )
}