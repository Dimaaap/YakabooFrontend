"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image"

import { CreateWishListModal, FlashMessage, WishlistSidebar, WishlistsMainContainer } from "../../../../components";
import { useProfileSettingsModalStore, useWishListModalStore } from "../../../../states";
import { fetchData } from "../../../../services";
import { CookiesWorker } from "../../../../services";
import { useProtectedPage } from "../../../../hooks";
import { UserLoginModal } from "../../../../components/modals/UserLoginModal";
import { ProfileSettingsModal } from "../../../../components/modals/ProfileSettingsModal";


export default function WishListPage() {

    const { isWishlistModalOpen } = useWishListModalStore();
    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
    
    const [serverError, setServerError] = useState(null)
    const [wishlists, setWishlists] = useState([])


    const addWishlist = newWishlist => {
        setWishlists((prevWishlists) => [...prevWishlists, newWishlist])
    }

    const deleteWishlist = async(id) => {
        try {
            const response = await fetch(`http://localhost:8003/wishlist/${id}`, {
                method: "DELETE"
            })

            if(response.ok){
                setWishlists((prevWishlists) => prevWishlists.filter(wishlist => wishlist.id !== id))
            } else {
                setServerError("Failed to delete wishlist")
            }
        } catch(error){
            setServerError(error)
        }
    }

    const updateWishlistTitle = updatedWishlist => {
        setWishlists((prevWishlists) => 
            prevWishlists.map((wishlist) => wishlist.id === updatedWishlist.id ? updatedWishlist : wishlist)
        )
    }

    useEffect(() => {
        const userEmail = CookiesWorker.get("email")
        fetchData(`http://localhost:8003/wishlist/${userEmail}`, 
            setWishlists, 
            `${userEmail}_wishlists`
        )
    }, [])

    if(loading){
        return  <Image src="/icons/spinner.svg" width="20" height="20" alt="" className="animate-spin" />
    }

    if(!isAuthenticated){
        return <UserLoginModal afterClose={ handleCloseModal } />
    }

    return(
        <div className="wishlists">
            { serverError && <FlashMessage message={ serverError } onClose={ setServerError(null) } /> }
            { isWishlistModalOpen && <CreateWishListModal addWishlist={ addWishlist } /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
            <h1 className="wishlists__title">
                Бажане
            </h1>
            <div className="wishlists__container">
                { wishlists.length > 0 ? (
                    <div className="wishlists__section left-section">
                        <WishlistSidebar wishlists={ wishlists } />
                    </div> 
                ) : <></> }  
                <WishlistsMainContainer wishlists={ wishlists } 
                deleteWishlist={ deleteWishlist } updateWishlist={ updateWishlistTitle } />
            </div>
        </div>
    )
}