"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { CommentsCount, LoadingCard, ProductCard, Stars, TopBadge } from '.';
import { ImagesLinks } from '../../site.config';
import Link from 'next/link';

export const TopSalesSection = ({ books, isLoading }) => {

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(4);

  const VISIBLE = visible;

  const maxIndex = Math.max(0, books.length - VISIBLE);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  }

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }

  const showSkeleton = isLoading || books.length === 0;

  useEffect(() => {
    const handleResize = () => {
        if(window.innerWidth <= 481){
            setVisible(2);
        } else if(window.innerWidth <= 767) {
            setVisible(3);
        } else {
            setVisible(4);
        }
    }

    handleResize();
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if(showSkeleton){
    return (
        <div className="top-sales-section">
            <div className="top-sales-header">
                <h3>
                    Топ продажів 🔥
                </h3>  
            </div>
            <div className="top-sales-slider">
                <div className="slider-viewport">
                    <div className="slider-track">
                        {[...Array(VISIBLE)].map((_, i) => (
                            <div className="slider-item" key={ i }>
                                <LoadingCard />
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
    )
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
                                productLink={`book/${book.slug}`}
                                badges={[
                                book?.reviews?.length ? <Stars reviews={ book.reviews} isSmaller={ true } /> : <></>,
                                book?.reviews?.length > 0 && <CommentsCount count={ book.reviews.length } />,
                                <TopBadge />]}
                                oldPrice={ book?.price }
                                newPrice={ book?.is_promo ? book?.promo_price : null }
                                bookInfo={ book?.book_info }
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