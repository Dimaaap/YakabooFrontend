"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Endpoints from "../../endpoints"
import { CommentsCount, ProductCard, Spinner, Stars, TopBadge } from "../shared"
import { STALE_TIME } from "../../site.config"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../../services/fetch.service"

export const OtherSeriaBooks = ({ book }) => {
    const VISIBLE = 3;

    const [index, setIndex] = useState(0);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["seria-books", book?.seria?.slug],
        queryFn: () => fetcher(`${Endpoints.ALL_SERIA_BOOKS(book.seria.slug)}?limit=100&offset=0`),
        enabled: !!book?.seria?.slug,
        staleTime: STALE_TIME
    })
    
    const books = data?.results ?? [];

    const maxIndex = Math.max(0, books.length - VISIBLE);
    
    const next = () => {
        setIndex((prev) => Math.min(prev + 1, maxIndex));
    }
    
    const prev = () => {
        setIndex((prev) => Math.max(prev - 1, 0))
    }

    if(isLoading || isError) return <Spinner />

    return(
        <div className="top-sales-section top-sales-without-image top-sales-smaller">
            <div className="top-sales-header">
                <h3>
                    Книга входить в серію
                </h3>
                <Link className="top-sales-header-show-all-link" href="#">
                <span>
                    Показати все 
                    <Image src="icons/chevron-down.svg" width="18" height="19" alt="" 
                    className="top-sales-header-show-all-link-icon"/>
                </span>
            </Link>   
            </div>
            <div className="top-sales-slider">
                { books?.length > VISIBLE && (
                     <>
                        <button className={`top-sales-slider-btn prev-btn ${ index === 0 ? "hidden" : ""}`} type="btn" onClick={ prev }>
                            <Image src="/icons/arrow-left.svg" width="30" height="30" alt="Prev" />
                        </button>
                    
                        <button className={`top-sales-slider-btn next-btn ${ index === maxIndex ? "hidden" : ""}`} type="btn" onClick={ next }>
                            <Image src="/icons/arrow-left.svg" width="30" height="30" alt="Next" />
                        </button>
                    </>
                ) }
                <div className="slider-viewport">
                    <div className="slider-track"
                    style={{
                        transform: `translateX(-${index * (100 / VISIBLE)}%)`
                    }}>
                        { books?.length > 0 && (
                            books.map((book => (
                                <div className="slider-item slider-item-smaller" key={ book.id }>
                                    <ProductCard title={ book.title } 
                                    brand={`${book?.authors[0]?.first_name} ${book?.authors[0]?.last_name}`} 
                                    imageSrc={book.images[0]?.image_url ?? ImagesLinks.DEFAULT_IMAGE}
                                    productLink={book.slug}
                                    badges={[
                                        book?.reviews?.length ? <Stars reviews={ book.reviews} isSmaller={ true } /> : <></>,
                                        book?.reviews?.length > 0 && <CommentsCount count={ book.reviews.length } />,
                                        <TopBadge />]}
                                    productCode={ book?.book_info?.code }
                                    oldPrice={ book?.price }
                                    newPrice={ book?.is_promo ? book?.promo_price : null }
                                    inStock={ book?.book_info?.in_stock || book?.is_in_stock || false }
                                    hasCashback={ book?.book_info?.is_has_cashback }
                                    hasWinterSupport={ book?.book_info?.is_has_winter_esupport }
                                    hasESupport={ book?.book_info?.is_has_esupport }
                                    UKDeliveryTime={ book?.book_info?.uk_delivery_time }
                                    deliveryTime={ book?.book_info?.delivery_time }
                                    extraClass="top-sales-card"
                                    changeStyles={ true }
                                    />    
                                </div>
                            )))
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}