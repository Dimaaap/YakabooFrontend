"use client"

import React, { useState } from "react";

import { CreateWishListModal, WishlistsMainContainer } from "../../../../components";
import { useWishListModalStore } from "../../../../states";


export default function WishListPage() {

    const { isWishlistModalOpen, setIsWishlistModalOpen } = useWishListModalStore();

    const [wishlists, setWishlists] = useState([])

    const addWishlist = newWishlist => {
        setWishlists((prevWishlists) => [...prevWishlists, newWishlist])
    }

    return(
        <div className="wishlists">
            { isWishlistModalOpen && <CreateWishListModal addWishlist={ addWishlist } /> }
            <div className="wishlists__section left-section">
                <h1 className="wishlists__title">
                    Бажане
                </h1>
                <div className="wishlists__sidebar">
                    <button className="wishlists__create-wishlist-ul btn" type="button"
                    onClick={() => setIsWishlistModalOpen(true)}>
                        Створити список
                    </button>
                    <ul className="wishlists__menu">
                        <li className="wishlists__whishlist">
                            фівіфвіф
                        </li>
                    </ul>
                </div>
            </div>   
            <WishlistsMainContainer />
        </div>
    )
}