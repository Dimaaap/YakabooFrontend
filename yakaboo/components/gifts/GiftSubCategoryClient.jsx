"use client"

import { useEffect, useState } from "react"
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../states";
import { usePathname } from "next/navigation";
import { fetchData } from "../../services";
import { HobbySubcategoryContainer } from "../hobbies/SubcategoryContainer";
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../dynamic";

export const GiftSubCategoryClient = () => {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore()
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
    
    const pathname = usePathname();
    const subcategorySlug = pathname.split("/")[3];

    const [subCategory, setSubCategory] = useState(null);

    const breadcrumbsObject = {
        "Подарунки": "/gifts"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/gift-subcategories/gifts/${subcategorySlug}`, setSubCategory)
    }, [])

    return(
        <div className="book hobby hobby-subcategory">
            { subCategory && <HobbySubcategoryContainer subCategory={ subCategory } breadcrumbsLink={ breadcrumbsObject }
            subCategoryLink={`/gits/sub-category/${subcategorySlug}`} isHobbies={ false } isGifts={ true } />  }
            { isLoginModalOpen && <UserLoginModal />}
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>
    )
}