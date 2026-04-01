"use client"

import React from 'react'
import Image from 'next/image'

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../services/fetch.service';
import Endpoints from '../../endpoints';
import { CommentsCount, ProductCard, Stars, TopBadge } from '.';
import { ImagesLinks, STALE_TIME } from '../../site.config';
import Link from 'next/link';

export const TopSalesSection = () => {

  const { data: books = [] } = useQuery({
    queryKey: ["top-books"],
    queryFn: () => fetcher(Endpoints.TOP_BOOKS),
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    refetchOnWindowFocus: false
  })

  return (
    <div className="books-container__section special-section">
        <div className="books-container__header">
            <h3 className="books-container__title white-text">
                Топ продажів 🔥
            </h3>
            <Link className="books-container__title-link" href="#">
                <span>
                    Показати все 
                    <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                </span>
            </Link>    
        </div>
        <div className="books-container__slider">
            <button className="books-container__btn prev-btn visually-hidden" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
            <div className="book-slider">
                { books.length > 0 && (
                    books.slice(0, 5).map((book) => (
                        <ProductCard title={ book.title } 
                        key={ book.id }
                        brand={`${book?.authors[0]?.first_name} ${book?.authors[0]?.last_name}`} 
                        imageSrc={book.images[0]?.image_url ?? ImagesLinks.DEFAULT_IMAGE}
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
                        />
                    ))
                ) }
            </div>
            <button className="books-container__btn next-btn" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
        </div>
    </div>
  )
}
