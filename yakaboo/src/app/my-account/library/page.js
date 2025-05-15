"use client"

import { OrdersSidebar } from "../../../../components";
import { ProfileSettingsModal } from "../../../../components/modals/ProfileSettingsModal";
import { UserLoginModal } from "../../../../components/modals/UserLoginModal";
import { useProtectedPage } from "../../../../hooks"
import { useProfileSettingsModalStore } from "../../../../states";

import Image from 'next/image'

export default function LibraryPage() {
    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    if(loading){
        return <Image src="/icons/spinner.svg" 
                width="20" height="20" alt="" className="animate-spin" />
    }

    if(!isAuthenticated){
        return <UserLoginModal afterClose={ handleCloseModal } />
    }

    const bookTypes = ["Всі", "Аудіокнига", "Електронна"]

    return (
        <div className="library page">
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
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