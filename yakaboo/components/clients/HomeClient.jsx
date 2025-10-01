"use client"

import React, { useEffect } from 'react'

import {  useCartModalStore,useSubcategoriesModalStore, useMenuModalStore, useDeliveryModalStore } from '../../states';
import { CartModal, MenuModal, BooksContainer, MainHeader, AdditionalInfo, MainSidebar, DeliveryInfoModal} from '../dynamic';
import { Banner } from '../main';
import { PageModals } from '../shared';

export const HomeClient = () => {
  const { isCartModalOpen } = useCartModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isDeliveryModalOpen } = useDeliveryModalStore();
  const { setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen } = useSubcategoriesModalStore();


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
      <PageModals />
      {isCartModalOpen && <CartModal />}
      { isDeliveryModalOpen && <DeliveryInfoModal /> }
    </div>
  )
}
