"use client"

import React, { useState } from 'react'
import { useWishListModalStore } from "../../states";
import Image from 'next/image';
import { FlashMessageWithAgreement } from '.';

export const WishlistsMainContainer = ({ wishlists, deleteWishlist, updateWishlist }) => {

    const { setIsWishlistModalOpen } = useWishListModalStore();
    const [selectedWishlistForUpdate, setSelectedWishlistForUpdate] = useState(null);
    const [showFlashMessage, setShowFlashMessage] = useState(false)
    const [wishlistToDelete, setWishlistToDelete] = useState(null)
    const [showBooks, setShowBooks] = useState([])

    const handleDeleteClick = wishlist => {
        setWishlistToDelete(wishlist)
        setShowFlashMessage(true)
    }

    const handleConfirmDelete = () => {
        deleteWishlist(wishlistToDelete.id)
        setShowFlashMessage(false)
    }

    const handleCloseFlashMessage = () => {
        setShowFlashMessage(false);
    }

    const setBooksOpen = wishlistId => {
        setShowBooks((prevShowBooks) => [...prevShowBooks, wishlistId])
    }

    const setBooksClose = wishlistId => {
        setShowBooks((prevShowBooks) => prevShowBooks.filter(container => container !== wishlistId))
    }

 
  return (
    <div className="wishlists__section right-section">
        { wishlists.length === 0 ? (
            <div className="wishlists__text-container">
                <p className="wishlists__title">
                    Ваш список бажань порожній.
                </p>
                <p className="wishlists__description">
                    Створюйте нові списки та додавайте в них товари, які вам цікаві.
                </p>
                <button className="wishlists__create-wishlist blue-btn" type="button"
                onClick={() => setIsWishlistModalOpen(true)}>
                    Створити список
                </button>
            </div>
        ) : (
            <div className="wishlists__wishlist-container">
                { wishlists.map((wishlist, index) => (
                    <div className="wishlists__wishlist wishlist" key={ index }>
                        <div className="wishlist__header">
                            <p className="wishlist__title">
                                { wishlist.title }
                            </p>
                            <div className="wishlist__buttons-row">
                                <button className="wishlist__button wishlist-btn">
                                    <Image src="/icons/pen.svg" alt="" width="16" height="16" />
                                </button>
                                <button className="wishlist__button wishlist-btn"
                                onClick={() => handleDeleteClick(wishlist)}>
                                    <Image src="/icons/trash.svg" alt="" width="18" height="18" />
                                </button>
                                { !showBooks.includes(wishlist.id) ? (
                                    <button className="wishlist__button wishlist-btn up-btn rotated"
                                    onClick={() => setBooksOpen(wishlist.id)}>
                                        <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                    </button>  
                                ) : <button className="wishlist__button wishlist-btn up-btn"
                                    onClick={() => setBooksClose(wishlist.id)}>
                                        <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                    </button> }
                            </div>
                        </div>
                        { showBooks.includes(wishlist.id) && (
                            <div className="wishlist__body">
                                <span className="wishlist__no-text">
                                    У цьому списку немає товарів
                                </span>
                            </div>
                        ) }
                    </div>
                )) }
                 { showFlashMessage && (
                    <FlashMessageWithAgreement 
                        message="Ви впевнені, що хочете видалити всі книги зі списку бажань?" 
                        onConfirm={ handleConfirmDelete }
                        onClose={ handleCloseFlashMessage }
                    />
                ) }
            </div>
        ) }
    </div>
  )
}

