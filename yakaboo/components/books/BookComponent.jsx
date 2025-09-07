import { BookContainer } from ".";
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../states";
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../dynamic";

export const BookComponent = ({ book, breadcrumbs }) => {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
    return (
        <div className="book">
            { console.log(book) }
            { <BookContainer book={ book } breadcrumbLinks={ breadcrumbs } /> }
            { isLoginModalOpen && <UserLoginModal /> }
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>    
    )
}