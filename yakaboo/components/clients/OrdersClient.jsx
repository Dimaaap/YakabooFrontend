"use client"

import Image from "next/image";

import { OrdersSidebar } from "../shared";
import { UserLoginModal, ProfileSettingsModal, BookCategoriesWithSubcategoriesModal, MenuModal, OrderContainer } from "../dynamic";
import { useProtectedPage } from "../../hooks";
import { useProfileSettingsModalStore, useBookCategoriesModalStore, useMenuModalStore } from "../../states";
import BonusesLeftSection from "../bonuses/BonusesLeftSection";

export const OrdersClient = () => {

  const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();
  const { isMenuModalOpen } = useMenuModalStore();

  if(loading){
    return <Image src="/icons/spinner.svg" 
            width="20" height="20" alt="" className="animate-spin" />
  }

  if(!isAuthenticated){
    return <UserLoginModal afterClose={ handleCloseModal } />
  }

  const orderStatuses = ["Всі", "Скасовані", "Поточні", "Невиконані", "Виконані"]

  return (
    <div className="orders page">
      { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
      { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
      { isMenuModalOpen && <MenuModal /> }
      <div className="orders__container page__container">
        <BonusesLeftSection />
        <div className="orders__section right-section">
            <OrderContainer />
        </div>
      </div>
    </div>
  )
}
