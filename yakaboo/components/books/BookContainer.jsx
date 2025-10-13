"use client"

import React, { useMemo, useState } from "react";

import Image from "next/image"
import { Breadcrumbs, FlashMessage, Rate } from "../shared"
import Link from "next/link"
import { AddToWishlistBtn, ProductImagesModal } from "../dynamic";
import { useProductImagesStore } from "../../states";
import { BookCharacteristics } from "../shared/BookCharacteristics";
import { HobbyDescriptionContainer } from "../shared/hobbies/HobbyDescriptionContainer";
import { BookAuthorBlock, BookImagesCarousel, BookInfoBlock, BookPriceBlock, BookReviewsBlock, OtherSeriaBooks } from ".";
import { useAddToWishlistModalStore } from "../../states/AddToWishlistModalStore";
import { AddBookToWishlistModal } from "../modals/AddBookToWishlist";
import { setServerError, setShowFlashMessage, useShowFlashMessageStore } from "../../states/ShowFlashMessageStore";


export const BookContainer = ({book, breadcrumbLinks, isGift=false}) => {
    const { isProductImagesOpen, isReadPart, setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();
    const { isAddToWishlistModalOpen } = useAddToWishlistModalStore();
    const { serverError, showFlashMessage, flashMessage } = useShowFlashMessageStore();
    const [isSimpleFlashMessage, setIsSimpleFlashMessage] = useState(false);
     
    const info = isGift ? book.gift_info : book.book_info;

    const images = useMemo(() => book.images || [], [book.images]);

    const pageImages = images.filter((img) => img.type === "page");

    const viewReadPartClick = () => {
        setIsReadPart(true)
        setIsProductImagesOpen(true)
    }

    const onCloseShowMessage = () => {
        setServerError(null)
        setShowFlashMessage(false)
        setIsSimpleFlashMessage(true)
    }

    return(
        <div className="book-container">
            { (isProductImagesOpen && !isReadPart) && <ProductImagesModal productTitle={book.title} images={ images } />}
            { isReadPart && <ProductImagesModal productTitle={book.title} images={ images } /> }
            { isAddToWishlistModalOpen && <AddBookToWishlistModal book={ book } /> }

            <div className="book-container__section left-section">
                <div className="book-container__btns-section">
                    <AddToWishlistBtn book={ book } setIsSimple={setIsSimpleFlashMessage} />
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
                        { book.title }
                    </h2>
                    { !isGift && book?.authors.length > 0 && (
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
                { book?.seria && (
                    <OtherSeriaBooks book={ book } />
                ) }

                { !isGift && !book?.is_notebook && <BookAuthorBlock book={ book } author={ book.authors[0] } /> }

                <BookReviewsBlock />
            </div>
            { (serverError || showFlashMessage && isSimpleFlashMessage) && (<FlashMessage message={ serverError || flashMessage }
             onClose={onCloseShowMessage} />) }
             {  }
            <BookPriceBlock book={ book } info={ info } isGift={ isGift }/>
        </div>    
    )
    
}