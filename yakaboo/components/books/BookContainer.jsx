"use client"

import React, { useEffect, useRef, useState } from "react";

import { FlashMessage, FlashMessageWithAgreement} from "../shared"
import { setFlashMessage, setServerError, setShowFlashMessage, useShowFlashMessageStore } from "../../states/ShowFlashMessageStore";
import Endpoints from "../../endpoints";
import { useWishlistBooksStore } from "../../states/WishlistBooksStore";
import { setActiveBtn } from "../../states/ActiveBtnStore";
import { handleScrollForProductInfoModal } from "../../states/hobbies/ProductInfoState";
import { CookiesWorker } from "../../services";
import { BookContainerLeftSection } from "./BookContainerLeftSection";
import { BookPageModals } from "./BookPageModals";
import { BookContainerCenterSection } from "./BookContainerCenterSection";
import { BookPriceBlock } from ".";


export const BookContainer = ({book, breadcrumbLinks, isGift=false}) => {
    const { serverError, showFlashMessage, flashMessage } = useShowFlashMessageStore();
    const [isSimpleFlashMessage, setIsSimpleFlashMessage] = useState(false);
    const { removeBookFromWishlist } = useWishlistBooksStore();
    
    const hasTrackedViewRef = useRef(false);
    const reviewsRef = useRef(null);

    const info = isGift ? book.gift_info : book.book_info;
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
            <BookPageModals book={ book } />
            <BookContainerLeftSection ref={ reviewsRef } book={ book } setIsSimpleFlashMessage={ setIsSimpleFlashMessage } 
            isGift={ isGift } breadcrumbLinks={ breadcrumbLinks } />

            <BookContainerCenterSection ref={ reviewsRef } breadcrumbLinks={ breadcrumbLinks } book={ book } isGift={ isGift }/>
            {
             (serverError || showFlashMessage) && isSimpleFlashMessage && (<FlashMessage message={ serverError || flashMessage }
             onClose={onCloseShowMessage} />) }
             { (serverError || showFlashMessage) && !isSimpleFlashMessage && 
             (<FlashMessageWithAgreement message={ serverError || flashMessage } 
             onConfirm={() => confirmDeleteBookFromWishlist(book.id)} 
             onClose={() => confirmCancelMessage()}/>) }
            
            <BookPriceBlock book={ book } info={ info } isGift={ isGift }/>
        </div>    
    )
    
}