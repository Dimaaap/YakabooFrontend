"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import Endpoints from "../../endpoints"
import { Badge, ProductCard, Spinner, Stars, TopBadge } from "../shared"
import { badgeColors, STALE_TIME } from "../../site.config"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../../services/fetch.service"

export const OtherSeriaBooks = ({ book }) => {
    const sliderRef = useRef(null);

    const scroll = direction => {
        if(sliderRef.current){
            const scrollAmount = sliderRef.current.offsetWidth;

            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount: scrollAmount,
                behavior: "smooth"
            })
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["seria-books", book?.seria?.slug],
        queryFn: () => fetcher(`${Endpoints.ALL_SERIA_BOOKS(book.seria.slug)}?limit=100&offset=0`),
        enabled: !!book?.seria?.slug,
        staleTime: STALE_TIME
    })
    
    const books = data?.results ?? [];

    if(isLoading || isError) return <Spinner />

    return(
        <div className="books-container seria-container">
            <div className="books-container__header">
                <h3 className="books-container__header-title">
                    Книга входить в серію
                </h3>
                <Link className="books-container__header-view-all"
                href={`/book/seria/${book.seria.slug}`}>
                    Показати все 
                    <Image src="/icons/arrow-left.svg" alt="" width="12" height="12" />
                </Link>
            </div>

            <div className="books-container__slider seria-slider">
                { books?.length > 4 && (
                    <button className={`books-container__btn prev-btn container-slider-btn`} type="button" onClick={() => scroll("left") }>
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>    
                ) }
                
                { books?.length > 0 && (
                    <div className="books-container__slider book-slider seria-slider container-slider" ref={ sliderRef }>
                        { books.map((book, index) => (
                            <ProductCard key={ index } productLink={ `/book/${book.slug}` }
                            extraClass="container-slider__book"
                            title={ book.title }
                            imageSrc={ book.images[0].image_url } 
                            brand={`${book.authors[0].first_name} ${book.authors[0].last_name}`}
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
                            bonusesCount={ book.book_info.bonuses }
                            isEbook={ book.book_info.format === "Електронна" }/>
                        )) }
                        
                    </div>    
                ) }
                { books?.length > 4 && (
                    <button className={`books-container__btn next-btn container-slider-btn`}
                    type="button" onClick={() => scroll("right") }>
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                ) }

            </div>
        </div>
    )
}