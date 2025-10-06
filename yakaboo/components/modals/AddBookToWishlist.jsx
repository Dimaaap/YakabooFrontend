"use client"

import { useEffect, useState } from "react";
import { CookiesWorker, fetchData } from "../../services";
import { setIsAddToWishlistModalOpen, useAddToWishlistModalStore } from "../../states/AddToWishlistModalStore"
import Endpoints from "../../endpoints";

export const AddBookToWishlistModal = ({ book }) => {

    const { isAddToWishlistModalOpen } = useAddToWishlistModalStore();
    const [userWishlits, setUserWishlists] = useState([])

    const userEmail = CookiesWorker.get("email");

    useEffect(() => {
        fetchData(Endpoints.USER_WISHLISTS(userEmail), setUserWishlists)
    }, [])

    return(
        <div className="menu add-to-wishlist">
            <div className="add-to-wishlist__content">
                <button className="menu__close add-to-wishlist__close" 
                type="button">
                    <Image src="/icons/close-smaller.svg"
                    alt="" 
                    width="22"
                    height="22"
                    onClick={ setIsAddToWishlistModalOpen(false) }
                    />
                </button>
                <div className="add-to-wishlist__container">
                    <h5 className="add-to-wishlist__title">
                        Додавання товару до списку бажань
                    </h5>
                    <div className="add-to-wishlist__checkboxes-form">
                        { userWishlits.length > 0 && (
                            userWishlits.map((wishlist, index) => (
                                <div className="add-to-wishlist__checkbox-row" key={ index }>
                                    <input className="add-to-wishlist__checkbox-field" 
                                    type="checkbox" id={ wishlist.title } name={ wishlist.title } />
                                    <label htmlFor={wishlist.title} className="add-to-wishlist__label custom-label"></label>
                                    <span className="add-to-wishlist__title">{ wishlist.title }</span>
                                </div>
                            ))
                        ) }
                    </div>
                    <div className="add-to-wishlist__add-input">
                        <input type="text" className="add-to-wishlist__add" name="create wishlist" 
                        placeholder="Новий список бажань" maxLength={120} minLength={2} />
                    </div>
                    <div className="add-to-wishlist__buttons-container">
                        <button className="add-to-wishlist__btn save-btn">
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