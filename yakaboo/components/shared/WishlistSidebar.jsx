import React from 'react'
import { useWishListModalStore } from '../../states';


export const WishlistSidebar = ({ wishlists }) => {

    const { setIsWishlistModalOpen } = useWishListModalStore();

  return (
    <div className="wishlists__sidebar">
        <button className="wishlists__create-wishlist-ul btn" type="button"
        onClick={() => setIsWishlistModalOpen(true)}>
            Створити список
        </button>
        <ul className="wishlists__menu">
            { wishlists.map((wishlist, index) => (
                <li className="wishlists__whishlist" key={ index }>
                    { wishlist.title }
                </li>
            )) }
        </ul>
    </div>
  )
}

