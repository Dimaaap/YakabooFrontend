"use client"

import { useEffect } from "react";
import { useBookCategoriesModalStore, useConfirmationCodeStore, useMenuModalStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../states"
import { BookCategoriesWithSubcategoriesModal, ConfirmationCodeModal, MenuModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../dynamic";

export const PageModals = () => {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
    const { isCategoriesModalOpen } = useBookCategoriesModalStore();
    const { isMenuModalOpen } = useMenuModalStore()

    return (<>
        { isLoginModalOpen && <UserLoginModal /> }
        { isRegisterModalOpen && <UserRegisterModal /> }
        { isConfirmationModalOpen && <ConfirmationCodeModal /> }
        { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
        { isMenuModalOpen && <MenuModal /> }
    </>)
}