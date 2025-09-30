"use client"

import React, { useEffect } from 'react'

import { useChatModalStore, useCartModalStore,useSubcategoriesModalStore, useMenuModalStore, useDeliveryModalStore } from '../../states';
import { CartModal, ChatOptions, MenuModal, ChatBtn, BooksContainer, MainHeader, AdditionalInfo, MainSidebar, DeliveryInfoModal} from '../dynamic';
import { Banner } from '../main';
import { PageModals } from '../shared';

export const HomeClient = () => {

  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
  const { isCartModalOpen } = useCartModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isDeliveryModalOpen } = useDeliveryModalStore();
  const { setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen } = useSubcategoriesModalStore();

  const toggleContactsOpen = () => {
    setIsChatModalOpen(!isChatModalOpen);
  }

  useEffect(() => {
    if (!setIsHoveringCategory && !setIsHoveringSubcategoryModal) {
      setIsSubcategoriesModalOpen(false);
    }
  }, [setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen]);

  return (
    <div className="main-container">
      {isMenuModalOpen && <MenuModal />}

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
      <PageModals />
      {isChatModalOpen && <ChatOptions />}
      {isCartModalOpen && <CartModal />}
      { isDeliveryModalOpen && <DeliveryInfoModal /> }
    </div>
  )
}
