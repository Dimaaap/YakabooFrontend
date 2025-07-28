'use client';

import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { fetchData } from "../../../../services";
import { BookContainer} from "../../../../components";
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../../../states";
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../../../../components/dynamic";


export default function BookPage() {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const [book, setBook] = useState(null);

    const pathname = usePathname();
    const bookSlug = pathname.split('/')[2];

    const breadcrumbsObject = {
        Автор: '/author/view/stiven-king',
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/books/${bookSlug}`, setBook)
    }, [])

    return(
        <div className="book">
            { book && <BookContainer book={ book } breadcrumbLinks={breadcrumbsObject} /> }
            { isLoginModalOpen && <UserLoginModal /> }
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>
    )
}