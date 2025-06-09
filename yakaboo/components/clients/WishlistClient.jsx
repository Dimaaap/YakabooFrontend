"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useProtectedPage } from "../../hooks";
import { useProfileSettingsModalStore, useWishListModalStore } from "../../states";
import { fetchData, CookiesWorker } from "../../services";
import { UserLoginModal, ProfileSettingsModal, CreateWishListModal } from "../dynamic";
import { FlashMessage, WishlistSidebar, WishlistsMainContainer } from "../shared";


export const WishlistClient = () => {

  const { isWishlistModalOpen } = useWishListModalStore();
  const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

  const [serverError, setServerError] = useState(null);
  const [wishlists, setWishlists] = useState([])


  const addWishlist = newWishlist => {
    setWishlists(prev => [...prev, newWishlist])
  }

  const deleteWishlist = async id => {
    try {
        const response = await fetch(`http://localhost:8003/wishlist/${id}`, {
            method: "DELETE"
        })

        if(response.ok){
            setWishlists(prev => prev.filter(wishlist => wishlist.id !== id))
        } else {
            setServerError("Не вдалось видалити список бажань")
        }
    } catch(error){
        setServerError("Помилка сервера")
    }
  }

  const updateWishlistTitle = updateWishlist => {
    setWishlists(prev => 
        prev.map(wishlist => (wishlist.id === updateWishlist.id ? updateWishlist : wishlist))
    )
  }

  useEffect(() => {
    const userEmail = CookiesWorker.get("email");
    
    if(userEmail){
        fetchData(
            `http://localhost:8003/wishlist/${userEmail}`,
            setWishlists,
            `${userEmail}_wishlists`
        )
    }
  }, [])

  if(loading){
    return <Image src="/icons/spinner.svg" width={20} height={20} alt="" className="animate-spin" />
  }

  if(!isAuthenticated){
    return <UserLoginModal afterClose={ handleCloseModal } />
  }

  return (
    <div className="wishlists">
        { serverError && <FlashMessage message={ serverError } onClose={() => setServerError(null)} /> }
        
        { isWishlistModalOpen && <CreateWishListModal addWishlist={ addWishlist } /> }
        { isProfileSettingsModalOpen && <ProfileSettingsModal /> }

        <h1 className="wishlists__title">Бажане</h1>

        <div className="wishlists__container">
            { wishlists.length > 0 && (
                <div className="wishlists__section left-section">
                    <WishlistSidebar wishlists={ wishlists } />
                </div>
            ) }

            <WishlistsMainContainer 
            wishlists={ wishlists }
            deleteWishlist={ deleteWishlist }
            updateWishlist={ updateWishlistTitle }
            />
        </div>
    </div>
  )
}

