"use client"

import { useEffect, useState } from "react";
import { CookiesWorker, fetchData, handleBackdropClick } from "../../services";
import { setIsAddToWishlistModalOpen } from "../../states/AddToWishlistModalStore"
import Image from "next/image";
import { useBlockBodyScroll } from "../../hooks";
import Endpoints from "../../endpoints";
import { FlashMessage } from "../shared";

export const AddBookToWishlistModal = ({ book }) => {
    const [userWishlists, setUserWishlists] = useState([])
    const [selectedWishlist, setSelectedWishlist] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [showFlashMessage, setShowFlashMessage] = useState(false)

    const userEmail = CookiesWorker.get("email");

    useEffect(() => {
        fetchData(Endpoints.USER_WISHLISTS(userEmail), setUserWishlists)
    }, [])
    
    useBlockBodyScroll(true)

    const onCheckboxChange = (wishlist) => {
        if(wishlist){
            setSelectedWishlist(wishlist.id);
        }
    }

    const saveBookInWishlist = async () => {
        try {
            const response = await fetch(Endpoints.ADD_BOOK_TO_WISHLIST(selectedWishlist, book.id), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!response.ok){
                const err = await response.json();
                setServerError(err);
                return
            }

            const data = await response.json();
            setIsAddToWishlistModalOpen(false);
            setShowFlashMessage(true)
        } catch(err) {
            setServerError("Помилка додавання книги: ", err)
            return
        }
    }

    const handleCloseFlash = () => {
        setServerError(null);
        setShowFlashMessage(false);
    }

    useEffect(() => {
        console.log(selectedWishlist)
    }, [selectedWishlist])

    return(
        <div className="menu add-to-wishlist" onClick={(e) => handleBackdropClick(e, setIsAddToWishlistModalOpen)}>
            { serverError || showFlashMessage && <FlashMessage message={serverError || `Книгу ${book.title} було додано у список побажань`} 
            onClose={ handleCloseFlash } /> }
            <div className="add-to-wishlist__content">
                <button className="menu__close add-to-wishlist__close" 
                type="button">
                    <Image src="/icons/close-smaller.svg"
                    alt="" 
                    width="22"
                    height="22"
                    onClick={() => setIsAddToWishlistModalOpen(false)}
                    />
                </button>
                <div className="add-to-wishlist__container">
                    <h5 className="add-to-wishlist__title">
                        Додавання товару до списку бажань
                    </h5>
                    <div className="add-to-wishlist__checkboxes-form">
                        { userWishlists.length > 0 ? (
                            userWishlists.map((wishlist, index) => (
                                <div className="add-to-wishlist__checkbox-row" key={ index }>
                                    <label className="add-to-wishlist__form-label filters__form-label custom-checkbox">
                                        <input className="add-to-wishlist__checkbox-field filters__form-checkbox" 
                                        type="checkbox" id={ wishlist.title } name={ wishlist.title } value={wishlist.title}
                                        checked={ selectedWishlist == wishlist.id } onChange={() => onCheckboxChange(wishlist)} />  
                                        <span className="filters__form-custom-box add-to-wishlist__custom-box filters__form-custom-box"></span>
                                        { wishlist.title }      
                                    </label>
                                </div>
                            ))
                        ) : (
                            <div className="add-to-wishlist__skeletons">
                                <div className="add-to-wishlist__skeleton"></div>
                                <div className="add-to-wishlist__skeleton"></div>
                            </div>
                        ) }
                    </div>
                    <div className="add-to-wishlist__add-input">
                        <input type="text" className="add-to-wishlist__add" name="create wishlist" 
                        placeholder="Новий список бажань" maxLength={120} minLength={2} />
                    </div>
                    <div className="add-to-wishlist__buttons-container">
                        <button className="add-to-wishlist__btn save-btn" onClick={() => saveBookInWishlist()}>
                            Зберегти
                        </button>
                        <button className="add-to-wishlist__btn cancel-btn" onClick={() => setIsAddToWishlistModalOpen(false)}>
                            Скасувати
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}