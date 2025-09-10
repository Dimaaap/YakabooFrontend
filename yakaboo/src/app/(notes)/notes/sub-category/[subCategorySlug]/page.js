"use client"

import { usePathname } from "next/navigation";
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../../../../../states";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../services";
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../../../../../../components/dynamic";
import { HobbySubcategoryContainer } from "../../../../../../components/hobbies/SubcategoryContainer";

export default function AllSubcategoryBooks() {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore()
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];

    const [subCategory, setSubCategory] = useState(null);

    const breadcrumbsObject = {
        "Блокноти": "/notes",
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/subcategory/notebooks/${subcategorySlug}`, setSubCategory)
    }, [])

    return(
        <div className="book hobby hobby-subcategory">
            { subCategory && <HobbySubcategoryContainer subCategory={ subCategory } 
            breadcrumbsLink={ breadcrumbsObject } subCategoryLink={`/notes/sub-category/${subcategorySlug}`} isNotebooks={ true } /> }
            { isLoginModalOpen && <UserLoginModal />}
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>
    )
    
}