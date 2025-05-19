"use client"

import { ProfileSettingsModal } from "../../../../components/modals/ProfileSettingsModal";
import { useProtectedPage } from "../../../../hooks"
import { useProfileSettingsModalStore } from "../../../../states"

export default function WaitingPage() {

    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage()
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    return(
        <div className="waiting page">
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }

            <h4 className="waiting__page-title page__page-title">
                Список очікування
            </h4>

            <div className="waiting__list">
                Дані відсутні
            </div>
        </div>
    )
}