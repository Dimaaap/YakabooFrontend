"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useUpdateWishlistModalStore } from '../../states';
import { FlashMessage } from '../shared';

import Image from "next/image";

export const UpdateWishlistModal = ({ wishlist, updateWishlistTitle }) => {
    
    const [newTitle, setNewTitle] = useState(wishlist.title)
    const [serverError, setServerError] = useState(null);

    const { setIsUpdateWishlistModalOpen } = useUpdateWishlistModalStore();

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const handleChange = event => {
        setNewTitle(event.target.value)
    }

    const onSubmit = async() => {
        const fetchBody = {title: newTitle, wishlist_id: wishlist.id}

        try {
            const response = await fetch(`http://localhost:8003/wishlist/${ wishlist.id }`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchBody)
            })

            if(response.ok){
                const updatedWishlist = await response.json();
                updateWishlistTitle(updatedWishlist)
                setIsUpdateWishlistModalOpen(false);
            } else {
                setServerError("Failed to update wishlist")
            }
        } catch(err){
            setServerError(err)
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget){
            setIsUpdateWishlistModalOpen(false);
        }
    }
    
    return (
        <div className="menu login-modal wishlist-modal" onClick={ handleBackdropClick }>
            { serverError && <FlashMessage message={ serverError } onClose={() => setServerError(null)} /> }
            <div className="login-modal__content wishlist-modal__content">
                <button className="menu__close login-modal__close" type="button" 
                onClick={() => setIsUpdateWishlistModalOpen(false)}>
                    <Image src="/icons/close-smaller.svg" alt="" width="22" height="22" />
                </button>
                <p className="wishlist-modal__title">
                    Редагувати список бажань
                </p> 
                <form className="wishlist-modal__input-container">
                    <input type="text" className="wishlist-modal__input" 
                    placeholder="Введіть назву" autoFocus={ false } value={ newTitle }
                    onInput={ handleChange }
                    name="title" id="title" { ...register("title", {
                        required: "Поле обов'язкове для заповнення",
                        minLength: { value: 3, message: "Введіть мінімум 3 символи" },
                        maxLength: { value: 100, message: "Максимально допустима довжина 100 символів" }
                    }) }/>
                    { errors.title && <span className="form__message-text">{ errors.title.message }</span> }
                    <div className="wishlist-modal__btns-row">
                        <button className="wishlist-modal__submit-btn btn"
                        type="submit" onClick={ handleSubmit(onSubmit) }>
                        Зберегти
                        </button>
                        <button className="wishlist-modal__close-btn btn"
                        type="button" onClick={ () => setIsUpdateWishlistModalOpen(false) }>
                        Скасувати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
