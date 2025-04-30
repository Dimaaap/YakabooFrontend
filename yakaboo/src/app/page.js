"use client";

import React, { useEffect } from 'react'
import { ChatBtn } from '../../components/shared'
import { BookCategoriesWithSubcategoriesModal, CartModal, ChatOptions, MenuModal } from '../../components/modals'
import { useBookCategoriesModalStore, useCartModalStore, useChatModalStore,
  useSubcategoriesModalStore,
  useMenuModalStore } from '../../states';
  
import "../../styles/main.scss"
import { AdditionalInfo, Banner, BooksContainer, MainHeader, MainSidebar } from '../../components';

export default function Home() {

  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
    const { isMenuModalOpen } = useMenuModalStore();
    const { isCartModalOpen } = useCartModalStore();
    const { isCategoriesModalOpen } = useBookCategoriesModalStore();
    const { setIsHoveringCategory, setIsHoveringSubcategoryModal,
      setIsSubcategoriesModalOpen
     } = useSubcategoriesModalStore();
  
    const toggleContactsOpen = () => {
      if(isChatModalOpen){
        setIsChatModalOpen(false);
      } else {
        setIsChatModalOpen(true)
      }
    }
  
    useEffect(() => {
      console.log("dadsa")
      if(!setIsHoveringCategory && !setIsHoveringSubcategoryModal){
        setIsSubcategoriesModalOpen(false);
      }
    }, [setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen])

  return (
   <div className=''>
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
          { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
      </div>
   </div>
  );
}
