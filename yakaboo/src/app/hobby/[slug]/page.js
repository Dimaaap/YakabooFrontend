"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { fetchData } from "../../../../services"
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../../../states"
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../../../../components/dynamic"
import { HobbyContainer } from "../../../../components/shared/HobbyContainer"

export default function HobbyPage() {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore()
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const pathname = usePathname();
    const hobbySlug = pathname.split("/")[2];

    const [hobby, setHobby] = useState(null);

    const breadcrumbsObject = {
        "Хобі, дозвілля": "/hobby",
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/hobbies/by-slug/${ hobbySlug }`, setHobby)
    }, [])

    return(
        <div className="book hobby">
            { hobby && <HobbyContainer hobby={ hobby } breadcrubmbLink={ breadcrumbsObject } /> }
            { isLoginModalOpen && <UserLoginModal /> }
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal />}
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>
    )
}