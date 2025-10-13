"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useProtectedPage } from "../../hooks";
import { useProfileSettingsModalStore, useWishListModalStore } from "../../states";
import { fetchData, CookiesWorker } from "../../services";
import { UserLoginModal, ProfileSettingsModal, CreateWishListModal, BonusLeftSection } from "../dynamic";
import { FlashMessage, WishlistsMainContainer } from "../shared";
import Endpoints from "../../endpoints";
import { useWishlists, setWishlists } from "../../states/WishlistsStore";


export const WishlistClient = () => {

  const { isWishlistModalOpen } = useWishListModalStore();
  const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

  const [serverError, setServerError] = useState(null);
  const { wishlists } = useWishlists();


  const addWishlist = newWishlist => {
    setWishlists(prev => [...prev, newWishlist])
  }

  const deleteWishlist = async id => {
    try {
        const response = await fetch(Endpoints.DELETE_WISHLIST(id), {
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
            Endpoints.USER_WISHLISTS(userEmail),
            setWishlists
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
            <BonusLeftSection />

            <WishlistsMainContainer 
            wishlists={ wishlists }
            deleteWishlist={ deleteWishlist }
            updateWishlist={ updateWishlistTitle }
            />
        </div>
    </div>
  )
}

