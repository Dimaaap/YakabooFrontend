"use client"

import React, { useState } from 'react'
import { useUpdateWishlistModalStore, useWishListModalStore } from "../../states";
import Image from 'next/image';
import { FlashMessageWithAgreement, ProductCard, Stars, TopBadge } from '.';
import { UpdateWishlistModal } from '../modals';
import Endpoints from '../../endpoints';
import { fetchData } from '../../services';
import { badgeColors } from '../../site.config';

export const WishlistsMainContainer = ({ wishlists, deleteWishlist, updateWishlist }) => {

    const { setIsWishlistModalOpen } = useWishListModalStore();
    const [selectedWishlistForUpdate, setSelectedWishlistForUpdate] = useState(null);
    const [showFlashMessage, setShowFlashMessage] = useState(false)
    const [wishlistToDelete, setWishlistToDelete] = useState(null)
    const [showBooks, setShowBooks] = useState([])
    const [wishlistBooks, setWishlistBooks] = useState([])

    const { isUpdateWishlistModalOpen, setIsUpdateWishlistModalOpen } = useUpdateWishlistModalStore();

    const handleDeleteClick = wishlist => {
        setWishlistToDelete(wishlist)
        setShowFlashMessage(true)
    }

    const handleConfirmDelete = () => {
        deleteWishlist(wishlistToDelete.id)
        setShowFlashMessage(false)
    }

    const handleUpdateWishlistButton = wishlist => {
        setSelectedWishlistForUpdate(wishlist);
        setIsUpdateWishlistModalOpen(true)
    }

    const handleCloseFlashMessage = () => {
        setShowFlashMessage(false);
    }


    const setBooksOpen = async wishlistId => {
        fetchData(Endpoints.ALL_WISHLIST_BOOKS(wishlistId), setWishlistBooks, `wishlist_${wishlistId}_books`)
        setShowBooks((prevShowBooks) => [...prevShowBooks, wishlistId])
        return wishlistBooks
    }

    const setBooksClose = wishlistId => {
        setShowBooks((prevShowBooks) => prevShowBooks.filter(container => container !== wishlistId))
    }

 
  return (
    <div className="wishlists__section right-section">
        <div className="wishlists__top-row">
            <h4 className="wishlists__title-section">Бажане</h4>
            <button className="wishlists__create-btn" onClick={() => setIsWishlistModalOpen(true)}>
                Створити список
            </button>   
        </div>
        
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
                                <button className="wishlist__button wishlist-btn"
                                onClick={ () => handleUpdateWishlistButton(wishlist) }>
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
                        { showBooks.includes(wishlist.id) && wishlistBooks.length > 0 && (
                            <div className="wishlist__body">
                                { wishlistBooks.map((book, index) => (
                                    <ProductCard key={ index } productLink={`/book/${book.slug}`}
                                    extraClass="wishlist__body-book"
                                    title={ book.title } brand={book.publishing.title}
                                    imageSrc={ book.images[0].image_url }
                                    badges={
                                        [
                                            book.stars > 0 ? <Stars count={ book.stars } isSmaller={ true } /> : null,
                                            book.is_top && <TopBadge />,
                                            //book.is_in_chart && <Badge text="Добірка" backgroundColor={ badgeColors.green } />
                                        ]
                                    }
                                    productCode={ book.book_info.code }
                                    oldPrice={ book.price }
                                    inStock={ book.book_info.in_stock }
                                    bonusesCount={ book.book_info.bonuses } />
                                )) }
                            </div>
                        ) }
                    </div>
                )) }
                { isUpdateWishlistModalOpen && <UpdateWishlistModal wishlist={ selectedWishlistForUpdate } 
                updateWishlistTitle={ updateWishlist }/> }
                
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

