"use client";

import React from 'react'
import Image from 'next/image';

import { useProtectedPage } from '../../hooks';
import { useProfileSettingsModalStore, useBookCategoriesModalStore, useMenuModalStore } from '../../states';

import { UserLoginModal, ProfileSettingsModal, MainContainer, BookCategoriesWithSubcategoriesModal, MenuModal, BonusLeftSection } from '../dynamic';

export const MyAccountClient = () => {

  const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();
  const { isMenuModalOpen } = useMenuModalStore();

  if(loading){
    return <Image src="/icons/spinner.svg" width={20} height={20} alt="" className="animate-spin" />
  }

  if(!isAuthenticated){
    return <UserLoginModal afterClose={ handleCloseModal } />
  }

  return (
    <>
        { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
        { isMenuModalOpen && <MenuModal /> }
        <div className="my-account">
            <BonusLeftSection />
            <div className="my-account__main">
                <h1 className="my-account__page-title">
                    Налаштування
                </h1>
                <div className="my-account__flex-container">
                    <MainContainer />
                </div>
            </div>
        </div>
    </>
  )
}
