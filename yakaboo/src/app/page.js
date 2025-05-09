"use client";

import React, { useEffect } from 'react'
import { ChatBtn } from '../../components/shared'
import { BookCategoriesWithSubcategoriesModal, CartModal, ChatOptions, ConfirmationCodeModal, MenuModal, 
  UserRegisterModal } from '../../components/modals'
import { useBookCategoriesModalStore, useCartModalStore, useChatModalStore,
  useSubcategoriesModalStore,
  useMenuModalStore, 
  useUserLoginModalStore, useConfirmationCodeStore,
  useProfileSettingsModalStore} from '../../states';
  
import "../../styles/main.scss"
import { AdditionalInfo, Banner, BooksContainer, MainHeader, MainSidebar } from '../../components';
import { UserLoginModal } from '../../components/modals/UserLoginModal';
import { ProfileSettingsModal } from '../../components/modals/ProfileSettingsModal';

export default function Home() {

  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
  const { isConfirmationModalOpen } = useConfirmationCodeStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isCartModalOpen } = useCartModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();
  const { setIsHoveringCategory, setIsHoveringSubcategoryModal,
    setIsSubcategoriesModalOpen
  } = useSubcategoriesModalStore();

  const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore()
  
  const toggleContactsOpen = () => {
    if(isChatModalOpen){
      setIsChatModalOpen(false);
    } else {
      setIsChatModalOpen(true)
    }
  }
  
  useEffect(() => {
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
          { isLoginModalOpen && <UserLoginModal /> }
          { isRegisterModalOpen && <UserRegisterModal /> }
          { isConfirmationModalOpen && <ConfirmationCodeModal /> }
          { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
      </div>
   </div>
  );
}
