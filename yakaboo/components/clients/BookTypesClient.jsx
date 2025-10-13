"use client"

import Image from "next/image";

import { OrdersSidebar } from "../shared"
import { ProfileSettingsModal, UserLoginModal, BookCategoriesWithSubcategoriesModal, MenuModal, BonusLeftSection } from "../dynamic"
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
            <div className="library__container">
                <BonusLeftSection />
                <div className="library__section right-section">
                    <div className="library__content-block">
                        <h4 className="library__title">
                            Бібліотека
                        </h4>
                        <ul className="library__types">
                            { bookTypes.map((type, index) => (
                                <li className={`library__point ${index === 0 ? "active" : ""}`} key={ index }>
                                    { type }
                                </li>
                            )) }
                        </ul>
                        <div className="library__block">
                            <span className="library__no-data">
                                Книги відсутні
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}