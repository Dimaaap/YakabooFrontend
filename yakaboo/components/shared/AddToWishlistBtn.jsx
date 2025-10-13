"use client";

import { useAuth } from "../../hooks";
import { useActiveBtnStore, useUserLoginModalStore } from "../../states";
import { setIsAddToWishlistModalOpen } from "../../states/AddToWishlistModalStore";
import { setFlashMessage, setShowFlashMessage } from "../../states/ShowFlashMessageStore";
import { setActiveBtn } from "../../states/ActiveBtnStore";
import { useEffect } from "react";

const AddToWishlistBtn = ({ book, setIsSimple }) => {

    const isAuthenticated = useAuth();
    const { activeBtn } = useActiveBtnStore();
    const { setIsLoginModalOpen } = useUserLoginModalStore();


    const handleAddToFavBtn = () => {
        if(!isAuthenticated){
            setIsLoginModalOpen(true)
        } else {
            setIsAddToWishlistModalOpen(true)
        }
    }

    useEffect(() => {
        setActiveBtn(book?.wishlists?.length > 0)
    }, [])

    const bookIsInWishlist = () => {
        setShowFlashMessage(true)
        setFlashMessage("Ви впевнені, що хочете видалити книгу із списку бажань")
        setIsSimple(false)
    }
    
    return(
            <button className={`book-container__header-btn add-to-fav ${activeBtn ? "added-btn" : ""}`} 
            onClick={!activeBtn ? () => handleAddToFavBtn() : () => bookIsInWishlist()}>
                { !activeBtn ? (
                    <svg
                        width="20"
                        height="16"
                        viewBox="0 0 16 14"
                        fill="#ffffff"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ui-btn-favorite__img"
                    >
                        <path d="M0.595215 4.64648C0.595215 7.78125 3.21729 10.8721 7.31152 13.5088C7.53857 13.6479 7.80957 13.7871 7.99268 13.7871C8.18311 13.7871 8.4541 13.6479 8.67383 13.5088C12.7681 10.8721 15.3901 7.78125 15.3901 4.64648C15.3901 1.9585 13.5371 0.0834961 11.1348 0.0834961C9.74316 0.0834961 8.65186 0.728027 7.99268 1.69482C7.34814 0.735352 6.24951 0.0834961 4.85059 0.0834961C2.45557 0.0834961 0.595215 1.9585 0.595215 4.64648ZM2.07471 4.64648C2.07471 2.78613 3.29053 1.53369 4.93115 1.53369C6.25684 1.53369 6.99658 2.33936 7.45801 3.04248C7.66309 3.33545 7.80225 3.43066 7.99268 3.43066C8.19043 3.43066 8.30762 3.32812 8.52734 3.04248C9.01807 2.34668 9.74316 1.53369 11.0615 1.53369C12.7021 1.53369 13.918 2.78613 13.918 4.64648C13.918 7.23926 11.2153 10.103 8.13184 12.1538C8.06592 12.1978 8.02197 12.2271 7.99268 12.2271C7.96338 12.2271 7.91943 12.1978 7.85352 12.1538C4.77002 10.103 2.07471 7.23926 2.07471 4.64648Z"></path>
                    </svg>      
                ) : (
                    <svg width="20" height="16" viewBox="0 0 16 14" fill="#333373" xmlns="http://www.w3.org/2000/svg" className="selected ui-btn-favorite__img" data-v-80b81d18=""><path d="M0.595215 4.64648C0.595215 7.78125 3.21729 10.8721 7.31152 13.5088C7.53857 13.6479 7.80957 13.7871 7.99268 13.7871C8.18311 13.7871 8.4541 13.6479 8.67383 13.5088C12.7681 10.8721 15.3901 7.78125 15.3901 4.64648C15.3901 1.9585 13.5371 0.0834961 11.1348 0.0834961C9.74316 0.0834961 8.65186 0.728027 7.99268 1.69482C7.34814 0.735352 6.24951 0.0834961 4.85059 0.0834961C2.45557 0.0834961 0.595215 1.9585 0.595215 4.64648ZM2.07471 4.64648C2.07471 2.78613 3.29053 1.53369 4.93115 1.53369C6.25684 1.53369 6.99658 2.33936 7.45801 3.04248C7.66309 3.33545 7.80225 3.43066 7.99268 3.43066C8.19043 3.43066 8.30762 3.32812 8.52734 3.04248C9.01807 2.34668 9.74316 1.53369 11.0615 1.53369C12.7021 1.53369 13.918 2.78613 13.918 4.64648C13.918 7.23926 11.2153 10.103 8.13184 12.1538C8.06592 12.1978 8.02197 12.2271 7.99268 12.2271C7.96338 12.2271 7.91943 12.1978 7.85352 12.1538C4.77002 10.103 2.07471 7.23926 2.07471 4.64648Z" data-v-80b81d18=""></path></svg>
                ) }
                 
            </button>  
         
    )
    
}

export default AddToWishlistBtn;