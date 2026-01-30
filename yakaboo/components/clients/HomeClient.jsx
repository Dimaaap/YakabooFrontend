"use client"

import React, { useEffect } from 'react'

import {  useCartModalStore,useSubcategoriesModalStore, useMenuModalStore, useDeliveryModalStore, useCartStore, useSearchHistoryOpenStore, useSearchTerm, useHistoryStore } from '../../states';
import { CartModal, MenuModal, BooksContainer, MainHeader, AdditionalInfo, MainSidebar, DeliveryInfoModal, CartInfo, SearchHistoryModal} from '../dynamic';
import { Banner } from '../main';
import { PageModals } from '../shared';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../services/fetch.service';
import { STALE_TIME } from '../../site.config';
import Endpoints from '../../endpoints';

export const HomeClient = () => {
  const { isCartModalOpen } = useCartModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isDeliveryModalOpen } = useDeliveryModalStore();
  const { isSearchHistoryModalOpen } = useSearchHistoryOpenStore();
  const { setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen } = useSubcategoriesModalStore();
  const { cartItems } = useCartStore();
  const { history } = useHistoryStore();
  const { searchTerm } = useSearchTerm();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: () => fetcher(Endpoints.MAIN_PAGE_BANNERS),
    staleTime: STALE_TIME,
    gcTime: STALE_TIME
  })

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
          { isSearchHistoryModalOpen && !searchTerm.length && history.length > 0 && <SearchHistoryModal /> }
          <Banner banners={ banners } />
          { cartItems?.items?.length > 0 && (
            <CartInfo itemsCount={ cartItems.items.length } 
            totalPrice={ cartItems.total_price } />
          ) }
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
