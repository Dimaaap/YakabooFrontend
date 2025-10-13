"use client"

import { useUpdateWishlistModalStore } from "../../states";
import Image from "next/image";
import { setDeleteMode, setWishlistToDelete, setSelectedWishlistForUpdate, setAgreedParams, useWishlists } from "../../states/WishlistsStore";
import { useShowBookStore } from "../../states/ShowBooksStore";
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { useWishlistBooksStore } from "../../states/WishlistBooksStore";
import { ProductCard, Stars, TopBadge } from ".";
import { useEffect } from "react";
import { setShowFlashMessage } from "../../states/ShowFlashMessageStore";


export const WishlistContainer = ({ wishlist }) => {

    const { setIsUpdateWishlistModalOpen } = useUpdateWishlistModalStore();
    const { selectedWishlistForUpdate } = useWishlists();
    const { showBooks, addBookContainer, removeBookContainer } = useShowBookStore();
    const { wishlistBooks, setBooksForWishlist } = useWishlistBooksStore()

    const handleUpdateWishlistButton = wishlist => {
        setSelectedWishlistForUpdate(wishlist);
        setIsUpdateWishlistModalOpen(true)
    }

    useEffect(() => {
    }, [selectedWishlistForUpdate])

     const handleDeleteClick = wishlist => {
        setWishlistToDelete(wishlist)
        setDeleteMode("wishlist")
        setShowFlashMessage(true)
    }

    const setBooksOpen = async wishlistId => {
        await fetchData(
            Endpoints.ALL_WISHLIST_BOOKS(wishlistId), 
            (books) => setBooksForWishlist(wishlistId, books)
        )
        
       addBookContainer(wishlistId)
    }

    const setBooksClose = wishlistId => {
        removeBookContainer(wishlistId)
    }

    const deleteBookFromWishlist = async (bookId, wishlistId) => {
        setAgreedParams({ bookId: bookId, wishlistId: wishlistId })
        setDeleteMode("book")
        setShowFlashMessage(true)
    }
    return (
        <div className="wishlists__wishlist wishlist">
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
                        onClick={ () => setBooksClose(wishlist.id) }>
                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                        </button> }
                </div>
            </div>
            { showBooks.includes(wishlist.id) && wishlistBooks[wishlist.id]?.length > 0 && (
                <div className="wishlist__body">
                    { wishlistBooks[wishlist.id].map((book, index) => (
                        <div className="wishlist__book-container" key={ index }>
                            <ProductCard productLink={`/book/${book.slug}`}
                            extraClass="wishlist__body-book"
                            title={ book.title } brand={book.publishing.title}
                            imageSrc={ book.images[0].image_url }
                            badges={
                                [
                                    book.stars > 0 ? <Stars count={ book.stars } isSmaller={ true } /> : null,
                                    book.is_top && <TopBadge />,
                                ]
                            }
                            productCode={ book.book_info.code }
                            oldPrice={ book.price }
                            inStock={ book.book_info.in_stock }
                            bonusesCount={ book.book_info.bonuses }
                            withAddToWishlist={false}/>

                            <button className="wishlist__body-remove-book-btn" onClick={() => deleteBookFromWishlist(book.id, wishlist.id)}>  
                                <Image src="/icons/red-trash.svg" alt="" width="18" height="18" />
                            </button>
                        </div>
                    )) }
                </div>
            ) }
    </div>
    )
}