"use client"

import { OrdersSidebar } from "../../../../components";
import { ProfileSettingsModal } from "../../../../components/modals/ProfileSettingsModal";
import { UserLoginModal } from "../../../../components/modals/UserLoginModal";
import { useProtectedPage } from "../../../../hooks"
import { useProfileSettingsModalStore } from "../../../../states";

import Image from "next/image"; 

export default function OffersPage() {
    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    if(loading){
        return <Image src="/icons/spinner.svg" 
                width="20" height="20" alt="" className="animate-spin" />
    }

    if(!isAuthenticated){
        return <UserLoginModal afterClose={ handleCloseModal } />
    }

    const orderStatus = ["Всі", "Скасовані", "Поточні", "Невиконані", "Виконані"]

    return (
        <div className="orders page">
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
            <h4 className="orders__page-title page__page-title">
                Замовлення
            </h4>
            <div className="orders__container page__container">
                <div className="orders__section left-section">
                    <OrdersSidebar listItems={ orderStatus } />
                </div>
                <div className="orders__section right-section">
                    Замовлень ще немає
                </div>
            </div>
        </div>
    )
}