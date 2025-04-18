"use client";

import React, { useState } from 'react'
import { AdditionalInfo, Banner, BooksContainer, MainHeader, MainSidebar } from '.'
import { ChatBtn, Footer } from '../shared'
import { ChatOptions } from '../modals'
import { useChatModalStore } from '../../states';

export const MainContainer = () => {

  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();

  const toggleContactsOpen = () => {
    if(isChatModalOpen){
      setIsChatModalOpen(false);
    } else {
      setIsChatModalOpen(true)
    }
  }

  return (
    <div className="main-container">
      <div className="main-container__top">
        <MainSidebar />
        <div className="main-container__right">
          <MainHeader />
          <Banner />
          <BooksContainer />
          <AdditionalInfo />
        </div>  
      </div>
      <Footer />
      <ChatBtn onClick={toggleContactsOpen} />
      { isChatModalOpen && <ChatOptions /> }
      
    </div>
  )
}
