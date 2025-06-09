"use client"

import React, { useEffect } from 'react'

import { 
    useChatModalStore, 
    useBookCategoriesModalStore, 
    useCartModalStore,
    useSubcategoriesModalStore,
    useMenuModalStore, 
    useUserLoginModalStore, 
    useConfirmationCodeStore,
    useProfileSettingsModalStore } from '../../states';
import { 
    BookCategoriesWithSubcategoriesModal, 
    CartModal, ChatOptions, 
    ConfirmationCodeModal, 
    ProfileSettingsModal,
    UserRegisterModal, 
    MenuModal,
    UserLoginModal, ChatBtn, 
    BooksContainer, MainHeader, AdditionalInfo} from '../dynamic';
import { Banner, MainSidebar } from '../main';

export const HomeClient = () => {
  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
  const { isConfirmationModalOpen } = useConfirmationCodeStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isCartModalOpen } = useCartModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();
  const { setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen } = useSubcategoriesModalStore();

  const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

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
      {isChatModalOpen && <ChatOptions />}
      {isCartModalOpen && <CartModal />}
      {isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal />}
      {isLoginModalOpen && <UserLoginModal />}
      {isRegisterModalOpen && <UserRegisterModal />}
      {isConfirmationModalOpen && <ConfirmationCodeModal />}
      {isProfileSettingsModalOpen && <ProfileSettingsModal />}
    </div>
  )
}
