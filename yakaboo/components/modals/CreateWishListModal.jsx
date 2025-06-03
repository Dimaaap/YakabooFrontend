"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useWishListModalStore } from '../../states';
import { CookiesWorker } from '../../services';
import Endpoints from '../../endpoints';
import { FlashMessage } from '../shared';

import Image from 'next/image';

export const CreateWishListModal = ({ addWishlist }) => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isWishlistModalOpen, setIsWishlistModalOpen } = useWishListModalStore();

  const [serverError, setServerError] = useState(null)

  const onSubmit = async (data) => {
    const userEmail = CookiesWorker.get("email");

    if(userEmail){
      data.email = userEmail
      data.is_active = true;
    }

    try {
      const response = await fetch(Endpoints.CREATE_WISHLIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if(response.ok){
        const result = await response.json()
        addWishlist(result)
        setIsWishlistModalOpen(false)
      } else {
        setServerError("Помилка")
      }
    } catch(error){
      setServerError(error)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget){
        setIsWishlistModalOpen(false);
    }
  }

useEffect(() => {
  if(isWishlistModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
    return(() => {
      document.body.style.overflow = ""
    })
  }, [isWishlistModalOpen])
  
  return (
    <div className="menu login-modal wishlist-modal" onClick={ handleBackdropClick }>
      { serverError && <FlashMessage message={ serverError } onClose={() => setServerError(null)} /> }
      <div className="login-modal__content wishlist-modal__content">
        <button className="menu__close login-modal__close" type="button" 
        onClick={() => setIsWishlistModalOpen(false)}>
            <Image src="/icons/close-smaller.svg" alt="" width="22" height="22" />
        </button>
        <p className="wishlist-modal__title">
          Додавання товару до списку бажань
        </p>
        <form className="wishlist-modal__input-container">
          <input type="text" className="wishlist-modal__input" 
          placeholder="Новий список бажань" autoFocus={ false } 
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
            type="button" onClick={ () => setIsWishlistModalOpen(false) }>
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

