"use client"

import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../states"
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../dynamic";

export const PageModals = () => {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    return (<>
        { isLoginModalOpen && <UserLoginModal /> }
        { isRegisterModalOpen && <UserRegisterModal /> }
        { isConfirmationModalOpen && <ConfirmationCodeModal /> }
        { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
    </>)
}