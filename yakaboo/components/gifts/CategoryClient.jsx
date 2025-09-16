"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react";
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../states";
import { fetchData } from "../../services";
import Link from "next/link";
import Image from "next/image";
import { GiftsContainer } from ".";
import { CardsContainer, Filters } from "../shared";
import { ConfirmationCodeModal, ProfileSettingsModal, UserLoginModal, UserRegisterModal } from "../dynamic";

export const CategoryClient = () => {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[3];

    const [category, setCategory] = useState(null)

    useEffect(() => {
        fetchData(`http://localhost:8006/gift-categories/gifts/${categorySlug}`, setCategory)
    }, [])

    return (
        <div className="book hobby">
            <div className="hobby__header">
                <Link href="/gifts" className="hobby__link">
                    Подарунки
                </Link>
                { category && (
                    <h2 className="hobby__title">
                        { category?.title }
                    </h2>
                ) }
            </div>

            { category && (
                <div className="hobby__categories gift-categories">
                    {
                        category?.subcategories?.map((sub, index) => (
                            <Link className="hobby__categories-category gift-categories__category" href={`/gifts/sub-category/${sub.slug}`} 
                            key={ index }>
                                <div className="hobby-categories__image-container gift-categories__image-container">
                                    { sub.images_src.length > 0 && (
                                        sub?.images_src?.map((image, i) => (
                                            <Image src={ image.image_url } key={ i } alt={`${sub.title}_${i}`}
                                            width="70" height="70" className="hobby-categories__image gift-categories__imagess" />
                                        ))
                                    ) }
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
                <div className="hobby-container__main-content">
                    <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                    needAuthors={ false } needCategories={ false } needGiftBrands={ true }  />
                        { category?.gifts?.length > 0 && (
                            <CardsContainer booksList={ category?.gifts } isGifts={ true } />
                    ) }
                </div>
            ) }

            { isLoginModalOpen && <UserLoginModal/> }
            { isRegisterModalOpen && <UserRegisterModal /> }
            { isConfirmationModalOpen && <ConfirmationCodeModal /> }
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> } 
        </div>
    )
}