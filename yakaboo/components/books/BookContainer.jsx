"use client"

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image"
import { Breadcrumbs, FlashMessage, FlashMessageWithAgreement, Rate } from "../shared"
import Link from "next/link"
import { AddReviewModal, AddToWishlistBtn, ProductImagesModal, ProductInfoModal } from "../dynamic";
import { useAddReviewModalStore, useProductImagesStore } from "../../states";
import { BookCharacteristics } from "../shared/BookCharacteristics";
import { HobbyDescriptionContainer } from "../shared/hobbies/HobbyDescriptionContainer";
import { BookAuthorBlock, BookImagesCarousel, BookInfoBlock, BookPriceBlock, BookReviewsBlock, OtherBookOptions, OtherSeriaBooks, ReviewsList } from ".";
import { useAddToWishlistModalStore } from "../../states/AddToWishlistModalStore";
import { AddBookToWishlistModal } from "../modals/AddBookToWishlist";
import { setFlashMessage, setServerError, setShowFlashMessage, useShowFlashMessageStore } from "../../states/ShowFlashMessageStore";
import Endpoints from "../../endpoints";
import { useWishlistBooksStore } from "../../states/WishlistBooksStore";
import { setActiveBtn } from "../../states/ActiveBtnStore";
import { handleScrollForProductInfoModal, useProductInfoState } from "../../states/hobbies/ProductInfoState";
import { CookiesWorker } from "../../services";


export const BookContainer = ({book, breadcrumbLinks, isGift=false}) => {
    const { isProductImagesOpen, isReadPart, setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();
    const { isAddToWishlistModalOpen } = useAddToWishlistModalStore();
    const { serverError, showFlashMessage, flashMessage } = useShowFlashMessageStore();
    const [isSimpleFlashMessage, setIsSimpleFlashMessage] = useState(false);
    const { removeBookFromWishlist } = useWishlistBooksStore();
    const { isAddReviewModalOpen, setIsAddReviewModalOpen } = useAddReviewModalStore();
    
    const hasTrackedViewRef = useRef(false);

    const showProductInfoModal = useProductInfoState((state) => state.showProductInfoModal)
    const info = isGift ? book.gift_info : book.book_info;
    const images = book.images || [];
    const pageImages = images.filter((img) => img.type === "page");
    const bookInfo = {
        image_src: images[0]?.image_url,
        title: book?.title,
        format: book?.book_info?.format,
        author: book?.authors?.[0]?.first_name + " " + book?.authors[0]?.last_name
    };
    const userEmail = CookiesWorker.get("email") || null;

    useEffect(() => {
        const handleScroll = () => handleScrollForProductInfoModal(90);
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        if(hasTrackedViewRef.current) return;
        if(!userEmail) return;
        if(!book?.id) return;

        hasTrackedViewRef.current = true;

        fetch(Endpoints.ADD_BOOK_TO_USER_SEEN_BOOKS(userEmail, book.id), {
            method: "POST"
        }).catch(() => {})

    }, [book.id])

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
            { isAddReviewModalOpen && (<AddReviewModal bookInfo={ bookInfo } bookId={ book.id } userEmail={ CookiesWorker.get("email") || null } />) }
            { showProductInfoModal && (
                <ProductInfoModal productImage={ book.images[0].image_url }
                productTitle={ book.title }
                productPrice={ book.price }
                isInStock={ book.book_info.in_stock } 
                />
            ) }
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
                        <div className="book-container__authors-block">
                            {book.authors.map((author, index) => (
                                <span key={ index }>
                                    <Link className="book-container__link author-link" href={`/author/view/${author.slug}`}>
                                        {author.first_name} {author.last_name}
                                    </Link>       
                                    { index < book.authors.length - 1 && ", " }    
                                </span>
                            ))} 
                        </div>
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

                { book?.related_books?.length > 0 && (
                    <OtherBookOptions book={ book } />    
                ) }
                
                <BookCharacteristics book={book} isGift={ isGift } />
                { book?.seria && (
                    <OtherSeriaBooks book={ book } />
                ) }
                { !isGift && !book?.is_notebook && book?.authors[0]?.short_description && <BookAuthorBlock book={ book } author={ book.authors[0] } /> }

                <BookReviewsBlock />

                { book?.reviews?.length > 0 && (
                    <ReviewsList reviews={ book.reviews } />
                ) }
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