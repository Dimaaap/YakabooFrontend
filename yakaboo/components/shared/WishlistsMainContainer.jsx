"use client"

import { useShowFlashMessageStore, useUpdateWishlistModalStore, useWishListModalStore } from "../../states";
import { FlashMessageWithAgreement, WishlistContainer } from '.';
import { UpdateWishlistModal } from '../modals';
import Endpoints from '../../endpoints';
import { setServerError, setShowFlashMessage } from '../../states/ShowFlashMessageStore';
import { useWishlistBooksStore } from '../../states/WishlistBooksStore';
import { useWishlists } from '../../states/WishlistsStore';
export const WishlistsMainContainer = ({ wishlists, deleteWishlist, updateWishlist }) => {

    const { setIsWishlistModalOpen } = useWishListModalStore();

    const { selectedWishlistForUpdate, deleteMode, wishlistToDelete, agreedParams } = useWishlists();
    const { removeBookFromWishlist } = useWishlistBooksStore()
    const { isUpdateWishlistModalOpen } = useUpdateWishlistModalStore();
    const { showFlashMessage } = useShowFlashMessageStore();


    const handleConfirmDelete = () => {
        deleteWishlist(wishlistToDelete.id)
        setShowFlashMessage(false)
    }

    const agreedDeleteBookFromWishlist = async(bookId, wishlistId) => {
        try {
            const response = await fetch(Endpoints.DELETE_BOOK_FROM_WISHLIST(wishlistId, bookId), {
                method: "DELETE"
            })
            
            if(response.ok){
                removeBookFromWishlist(wishlistId, bookId)
            } else {
                setServerError("Не вдалось видалити книгу зі списку бажань")
            }
        } catch(err){
            setServerError("Помилка сервера")
        }
    }

 
  return (
    <div className="wishlists__section right-section">
        {showFlashMessage && (
            <FlashMessageWithAgreement message={deleteMode === "book" ? 
                "Ви впевнені, що хочете видалити книгу зі списку бажань?"
                : "Ви впевнені, що хочете видалити весь список бажань?"
            }
            onConfirm={() => {
                if(deleteMode === "book"){
                    agreedDeleteBookFromWishlist(agreedParams.bookId, agreedParams.wishlistId)
                } else if (deleteMode === "wishlist"){
                    handleConfirmDelete()
                }
                setShowFlashMessage(false)
            }}
            onClose={() => setShowFlashMessage(false)}
            />
        )}
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
                    <WishlistContainer wishlist={ wishlist } key={ index } />
                )) }
                { isUpdateWishlistModalOpen && <UpdateWishlistModal wishlist={ selectedWishlistForUpdate } 
                updateWishlistTitle={ updateWishlist }/> }
                
            </div>
        ) }
    </div>
  )
}

