"use client"

import React, { useMemo, useState } from "react";

import Image from "next/image"
import { Breadcrumbs, FlashMessage, FlashMessageWithAgreement, Rate } from "../shared"
import Link from "next/link"
import { AddToWishlistBtn, ProductImagesModal } from "../dynamic";
import { useProductImagesStore } from "../../states";
import { BookCharacteristics } from "../shared/BookCharacteristics";
import { HobbyDescriptionContainer } from "../shared/hobbies/HobbyDescriptionContainer";
import { BookAuthorBlock, BookImagesCarousel, BookInfoBlock, BookPriceBlock, BookReviewsBlock, OtherBookOptions, OtherSeriaBooks } from ".";
import { useAddToWishlistModalStore } from "../../states/AddToWishlistModalStore";
import { AddBookToWishlistModal } from "../modals/AddBookToWishlist";
import { setFlashMessage, setServerError, setShowFlashMessage, useShowFlashMessageStore } from "../../states/ShowFlashMessageStore";
import Endpoints from "../../endpoints";
import { useWishlistBooksStore } from "../../states/WishlistBooksStore";
import { setActiveBtn } from "../../states/ActiveBtnStore";


export const BookContainer = ({book, breadcrumbLinks, isGift=false}) => {
    const { isProductImagesOpen, isReadPart, setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();
    const { isAddToWishlistModalOpen } = useAddToWishlistModalStore();
    const { serverError, showFlashMessage, flashMessage } = useShowFlashMessageStore();
    const [isSimpleFlashMessage, setIsSimpleFlashMessage] = useState(false);
    const { removeBookFromWishlist } = useWishlistBooksStore() 

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

    const confirmDeleteBookFromWishlist = async (bookId) => {
        const wishlistId = book.wishlists[0].id
        try {
            const response = await fetch(Endpoints.DELETE_BOOK_FROM_WISHLIST(wishlistId, bookId), {
                method: "DELETE"
            })

            if(response.ok){
                removeBookFromWishlist(wishlistId, bookId)
                setFlashMessage(`Книгу ${book.title} видалено із списку бажань`)
                setIsSimpleFlashMessage(true)
                setActiveBtn(false)
            } else {
                setServerError("Не вдалось видалити книгу з списку бажань")
                setIsSimpleFlashMessage(true)
            }
        } catch(err){
            setServerError("Помилка сервера")
            setIsSimpleFlashMessage(true)
        }
    }
    
    const confirmCancelMessage = () => {
        setShowFlashMessage(false);
        setServerError(null);
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
                    <h3 className="book-container__book-title">
                        { book?.book_info?.format === "Електронна" ? `Електронна книга ${book.title}` : `${book.title}` }
                    </h3>
                    { !isGift && book?.authors.length > 0 && (
                        <Link className="book-container__link author-link" href={`/author/view/${book.authors[0].slug}`}>
                            {book.authors[0].first_name} {book.authors[0].last_name}
                        </Link>       
                    ) }
                     
                </div>
                
                {info?.rate > 0 && (
                    <Rate rate={ info.rate } />
                )}
                

                <p className="book-container__code">
                    Код товару: {info.code}
                </p>

                <BookInfoBlock book={ book } info={ info } isGift={ isGift } />

                <HobbyDescriptionContainer hobby={ !isGift ? book.book_info : book.gift_info } /> 

                <OtherBookOptions book={ book } />
                
                <BookCharacteristics book={book} isGift={ isGift } />
                { book?.seria && (
                    <OtherSeriaBooks book={ book } />
                ) }

                { !isGift && !book?.is_notebook && <BookAuthorBlock book={ book } author={ book.authors[0] } /> }

                <BookReviewsBlock />
            </div>
            { (serverError || showFlashMessage) && isSimpleFlashMessage && (<FlashMessage message={ serverError || flashMessage }
             onClose={onCloseShowMessage} />) }
             { (serverError || showFlashMessage) && !isSimpleFlashMessage && 
             (<FlashMessageWithAgreement message={ serverError || flashMessage } 
             onConfirm={() => confirmDeleteBookFromWishlist(book.id)} 
             onClose={() => confirmCancelMessage()}/>) }
            <BookPriceBlock book={ book } info={ info } isGift={ isGift }/>
        </div>    
    )
    
}