"use client";

import React from 'react'
import { AdditionalInfo, Banner, BooksContainer, MainHeader, MainSidebar } from '.'
import { ChatBtn } from '../shared'
import { BookCategoriesModal, CartModal, ChatOptions, MenuModal } from '../modals'
import { useBookCategoriesModalStore, useCartModalStore, useChatModalStore, 
  useMenuModalStore } from '../../states';

export const MainContainer = () => {

  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isCartModalOpen } = useCartModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore()

  const toggleContactsOpen = () => {
    if(isChatModalOpen){
      setIsChatModalOpen(false);
    } else {
      setIsChatModalOpen(true)
    }
  }

  return (
    <div className="main-container">
      { isMenuModalOpen && <MenuModal /> }
      
      <div className="main-container__top">
        <MainSidebar />
        <div className="main-container__right">
          <MainHeader />
          <Banner />
          <BooksContainer />
          <AdditionalInfo />
        </div>  
      </div>
      <ChatBtn onClick={toggleContactsOpen} />
      { isChatModalOpen && <ChatOptions /> }
      { isCartModalOpen && <CartModal /> }
      { isCategoriesModalOpen && <BookCategoriesModal /> }
    </div>
  )
}
