"use client";

import React from 'react'
import { AdditionalInfo, Banner, BooksContainer, MainHeader, MainSidebar } from '.'
import { ChatBtn } from '../shared'
import { ChatOptions, MenuModal } from '../modals'
import { useChatModalStore, useMenuModalStore } from '../../states';

export const MainContainer = () => {

  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
  const { isMenuModalOpen } = useMenuModalStore();

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
    </div>
  )
}
