import React from 'react'
import { useWishListModalStore } from "../../states";

export const WishlistsMainContainer = () => {

    const { isWishlistModalOpen, setIsWishlistModalOpen } = useWishListModalStore();

  return (
    <div className="wishlists__section right-section">
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
    </div>
  )
}

