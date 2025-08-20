"use client";

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation"
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from '../../../../../states';
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from '../../../../../components/dynamic';
import { HobbyContainer } from '../../../../../components/shared/HobbyContainer';
import { HobbySubcategoryContainer } from '../../../../../components/hobbies/SubcategoryContainer';
import { fetchData } from '../../../../../services';

export default function AllSubcategoryHobbies() {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore()
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const pathname = usePathname()
    const subcategorySlug = pathname.split("/")[3]

    const [subCategory, setSubcategory] = useState(null);

    const breadcrumbsObject = {
        "Хобі, дозвілля": "/hobby",
        "Активний відпочинок": "/hobby/category/aktyvnyi-vidpochynok",
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/hobby-subcategories/hobbies/${subcategorySlug}`, setSubcategory)
    }, [])
    
    return (
        <div className="book hobby hobby-subcategory">
            { subCategory && <HobbySubcategoryContainer subCategory={ subCategory } breadcrumbsLink={ breadcrumbsObject } /> }
            { isLoginModalOpen && <UserLoginModal />}
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>
    )
}