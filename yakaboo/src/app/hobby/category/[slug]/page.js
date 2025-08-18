"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../../../../states"
import Link from "next/link";
import Image from 'next/image'
import { fetchData } from "../../../../../services";
import { HobbyCategoryContainer } from "../../../../../components";
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../../../../../components/dynamic";


export default function AllCategoryHobbies() {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const [category, setCategory] = useState([])

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[3];

    useEffect(() => {
        fetchData(`http://localhost:8006/hobby-categories/hobbies/${categorySlug}`, setCategory)
    }, [])

    return (
        <div className="book hobby">
            <div className="hobby__header">
                <Link href="/hobby" className="hobby__link">
                    Творчість, хобі
                </Link>
                { category && (
                    <h2 className="hobby__title">
                        { category?.title }
                    </h2>    
                ) }
            </div>

            { category && (
                <div className="hobby__categories">
                    {
                        category?.subcategories?.map((sub, index) => (
                            <Link className="hobby__categories-category" href={`/hobby/sub-category/${sub.slug}`} key={index}>
                                <div className="hobby-categories__image-container">
                                    {sub.images_src.length > 0 && (
                                        sub?.images_src?.map((image, i) => (
                                            <Image src={image.image_src} key={ i } alt="" width="80" height="80" 
                                            className="hobby-categories__image" />
                                        ))
                                    )}
                                </div>
                                <p className="hobby-categories__title">
                                    { sub.title }
                                </p>
                            </Link>
                        ))    
                    }
                </div>
            ) }

            { category && (
                <HobbyCategoryContainer categories={ category.hobbies } />    
            ) }
            { isLoginModalOpen && <UserLoginModal /> }
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
        </div>
    )

}