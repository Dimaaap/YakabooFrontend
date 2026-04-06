"use client"

import React, { useState } from 'react'
import Image from 'next/image'

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../services/fetch.service';
import Endpoints from '../../endpoints';
import { CommentsCount, ProductCard, Stars, TopBadge } from '.';
import { ImagesLinks, STALE_TIME } from '../../site.config';
import Link from 'next/link';

export const TopSalesSection = () => {

  const [index, setIndex] = useState(0);

  const VISIBLE = 4;

  const { data: books = [] } = useQuery({
    queryKey: ["top-books"],
    queryFn: () => fetcher(Endpoints.TOP_BOOKS),
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    refetchOnWindowFocus: false
  })

  const maxIndex = Math.max(0, books.length - VISIBLE);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  }

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="top-sales-section">
        <div className="top-sales-header">
            <h3>
                Топ продажів 🔥
            </h3>
            <Link className="top-sales-header-show-all-link" href="#">
                <span>
                    Дивитись все 
                    <Image src="icons/chevron-down.svg" width="18" height="19" alt="" 
                    className="top-sales-header-show-all-link-icon"/>
                </span>
            </Link>    
        </div>
        <div className="top-sales-slider">
            { books.length > VISIBLE && (
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
                    { books.length > 0 && (
                        books.map((book) => (
                            <div className="slider-item" key={ book.id }>
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
                        ))
                    ) }
                </div>
            </div>
        </div>
    </div>
  )
}