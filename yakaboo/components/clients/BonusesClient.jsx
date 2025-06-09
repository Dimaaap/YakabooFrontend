"use client"

import React from 'react'
import Image from "next/image";

import { useProtectedPage } from '../../hooks'; 
import { BookCategoriesWithSubcategoriesModal, MenuModal, ProfileSettingsModal, UserLoginModal } from '../dynamic';
import { useBookCategoriesModalStore, useMenuModalStore, useProfileSettingsModalStore } from '../../states';


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
      <div className="bonuses__text-block">
        <p className="bonuses__text-title">Бонуси</p>
        <p className="bonuses__text-count">
            Накопичувальний рахунок містить: 0
        </p>
        <p className="bonuses__text-count">
            Акційний бонусний рахунок містить: 0
        </p>
      </div>

      <table className="bonuses__table">
        <thead>
            <tr className="bonuses__table-row header">
                <th>Баланс</th>
                <th>Нараховано / Списано</th>
                <th>Спливає</th>
                <th>Коментар</th>
                <th>Створено</th>
                <th>Тип</th>
            </tr>
        </thead>
      </table>
      <div className="bonuses__no-data">Дані відсутні</div>
    </div>
  )
}

