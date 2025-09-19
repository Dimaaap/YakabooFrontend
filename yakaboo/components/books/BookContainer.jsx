"use client"

import React, { useMemo } from "react";

import Image from "next/image"
import { Breadcrumbs, Rate } from "../shared"
import Link from "next/link"
import { AddToWishlistBtn, ProductImagesModal } from "../dynamic";
import { useProductImagesStore } from "../../states";
import { BookCharacteristics } from "../shared/BookCharacteristics";
import { HobbyDescriptionContainer } from "../shared/hobbies/HobbyDescriptionContainer";
import { BookAuthorBlock, BookImagesCarousel, BookInfoBlock, BookPriceBlock, BookReviewsBlock } from ".";


export const BookContainer = ({book, breadcrumbLinks, isGift=false}) => {
    const { isProductImagesOpen, isReadPart, setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();
    
    const info = isGift ? book.gift_info : book.book_info;
    
    const images = useMemo(() => book.images || [], [book.images]);

    const pageImages = images.filter((img) => img.type === "page");

    const viewReadPartClick = () => {
        setIsReadPart(true)
        setIsProductImagesOpen(true)
    }

    return(
        <div className="book-container">
            { (isProductImagesOpen && !isReadPart) && <ProductImagesModal productTitle={book.title} images={ images } />}
            { isReadPart && <ProductImagesModal productTitle={book.title} images={ images } /> }

            <div className="book-container__section left-section">
                <div className="book-container__btns-section">
                    <AddToWishlistBtn />
                    {pageImages.length > 0 && (
                        <button className="book-container__header-btn read-part" onClick={() => viewReadPartClick()}>
                            <Image src="/icons/book.svg" alt="" width="25" height="25" />
                            Читати уривок
                        </button>    
                    )}
                </div>

                <BookImagesCarousel images={ images } title={ book.title } isGift={ isGift } />
            </div>

            <div className="book-container__section center-section">
                <Breadcrumbs linksList={ breadcrumbLinks } />

                <div className="book-container__author-block">
                    <h2 className="book-container__book-title">
                        { !isGift ? `Книга ${book.title}` : `${book.title}` }
                    </h2>
                    { !isGift && (
                        <Link className="book-container__link author-link" href={`/author/view/${book.authors[0].slug}`}>
                            {book.authors[0].first_name} {book.authors[0].last_name}
                        </Link>       
                    ) }
                     
                </div>
                
                {info?.rate && (
                    <Rate rate={ info.rate } />
                )}
                

                <p className="book-container__code">
                    Код товару: {info.code}
                </p>

                <BookInfoBlock book={ book } info={ info } isGift={ isGift } />

                <HobbyDescriptionContainer hobby={ !isGift ? book.book_info : book.gift_info } />    
                
                <BookCharacteristics book={book} isGift={ isGift } />

                { !isGift && <BookAuthorBlock author={ book.authors[0] } /> }

                <BookReviewsBlock />
            </div>

            <BookPriceBlock book={ book } info={ info } isGift={ isGift }/>
        </div>    
    )
    
}