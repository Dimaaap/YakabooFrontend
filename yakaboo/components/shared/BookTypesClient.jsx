"use client"

import Image from "next/image";

import { OrdersSidebar } from "."
import { ProfileSettingsModal, UserLoginModal, BookCategoriesWithSubcategoriesModal, MenuModal } from "../dynamic"
import { useProtectedPage } from "../../hooks"
import { useProfileSettingsModalStore, useMenuModalStore, useBookCategoriesModalStore } from "../../states"

export function BookTypesClient() {
    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
    const { isCategoriesModalOpen } = useBookCategoriesModalStore();
    const { isMenuModal } = useMenuModalStore();

    if(loading){
        return <Image src="/icons/spinner.svg" 
        width="20" height="20" alt="" className="animate-spin"/>
    }

    if(!isAuthenticated){
        return <UserLoginModal afterClose={ handleCloseModal } />
    }

    const bookTypes = ["Всі", "Аудіокниги", "Електронна"]

    return (
        <div className="library page">
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
            { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
            { isMenuModal && <MenuModal /> }
            <h4 className="library__page-title page__page-title">
                Бібліотека
            </h4>
            <div className="library__container page__container">
                <div className="library__section page__section left-section">
                    <OrdersSidebar listItems={ bookTypes } />
                </div>
                <div className="libary__section right-section">
                    <div className="page__books-container"></div>
                </div>
            </div>
        </div>
    )
}