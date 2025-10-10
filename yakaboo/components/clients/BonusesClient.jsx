"use client"

import React from 'react'
import Image from "next/image";

import { useProtectedPage } from '../../hooks'; 
import { BonusesHeader, BonusesStatusFeatures, BonusLeftSection, BookCategoriesWithSubcategoriesModal, MenuModal, ProfileSettingsModal, UserLoginModal } from '../dynamic';
import { useBookCategoriesModalStore, useMenuModalStore, useProfileSettingsModalStore } from '../../states';
import BonusesUserStatus from '../bonuses/BonusesUserStatus';
import { BonusHistoryRow } from '../bonuses/BonusHistoryRow';


export const BonusesClient = () => {

  const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();

  if(loading){
    return(
        <Image src="/icons/spinner.svg" 
        width="20" height="20" alt=""
        className="animate-spin"
        />
    )
  }

  if(!isAuthenticated){
    return <UserLoginModal afterClose={ handleCloseModal } />
  }
    
  return (
    <div className="bonuses">
      { isMenuModalOpen && <MenuModal /> }
      { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
      { isProfileSettingsModalOpen && <ProfileSettingsModal /> }  
      
      <BonusLeftSection />

      <div className="bonuses__section right-section">
        <BonusesHeader />
        
        <BonusesUserStatus />

        <BonusesStatusFeatures />

        <div className="bonuses__section__bonuses-history">
            <h4 className="bonuses__section__category-title">
              Історія нарахувань та списань бонусів
            </h4>
            <div className="bonuses__section__bonuses-container-rows">
              <BonusHistoryRow createdDate="2025-09-20" comment="Birthday" countPlus={1000} countMinus={0} expiredIn="2025-04-10" />
            </div>
        </div>
      </div>
    </div>
        
  )
}

