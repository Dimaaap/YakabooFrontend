"use client";

import React, { useEffect, useState } from 'react'
import { ChatBtn } from '../../../components/shared'
import { BookCategoriesWithSubcategoriesModal, CartModal, ChatOptions, MenuModal } from '../../../components/modals'
import { useBookCategoriesModalStore, useCartModalStore, useChatModalStore,
  useSubcategoriesModalStore,
  useMenuModalStore } from '../../../states';

import "../../../styles/main.scss"
import Link from 'next/link';
import { fetchData } from '../../../utils';
import Endpoints from '../../../endpoints';
import Image from 'next/image';

export default function PromotionsPage() {

    const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
    const { isMenuModalOpen } = useMenuModalStore();
    const { isCartModalOpen } = useCartModalStore();
    const { isCategoriesModalOpen } = useBookCategoriesModalStore();
    const { setIsHoveringCategory, setIsHoveringSubcategoryModal,
        setIsSubcategoriesModalOpen
    } = useSubcategoriesModalStore();

    const [promoCategories, setPromoCategories] = useState([]);
    const [promos, setPromos] = useState([]);
      
    const toggleContactsOpen = () => {
        if(isChatModalOpen){
        setIsChatModalOpen(false);
        } else {
            setIsChatModalOpen(true)
        }
    }

    useEffect(() => {
        fetchData(Endpoints.ALL_PROMO_CATEGORIES, setPromoCategories, "promo_categories");
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_PROMOTIONS, setPromos, "promotions")
    }, [])

      
    useEffect(() => {
        if(!setIsHoveringCategory && !setIsHoveringSubcategoryModal){
            setIsSubcategoriesModalOpen(false);
        }
    }, [setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen])

    return (
        <div className="promotions">
            { isMenuModalOpen && <MenuModal /> }
            <h4 className="promotions__title">
                Акції та знижки
            </h4>
            <div className="promotions__content">
                <div className="promotions__left promo-sidebar">
                    <div className="promo-sidebar__container">
                        <ul className="promo-sidebar__list">
                            { promoCategories.length > 0 ? (
                                promoCategories.map((category, i) => (
                                    <li className={`promo-sidebar__item ${i === 0 ? "active": ""}`} key={i}>
                                        <Link href={ category.slug } className="promo-sidebar__link">
                                            { category.title }
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                [...Array(5)].map((_, i) => (
                                    <li className="promo-sidebar__item" key={ i } >
                                        <div className="skeleton skeleton--text"></div>
                                    </li>
                                ))
                            ) }
                        </ul>
                    </div>
                </div>

                <div className="promotions__right promo-content">
                    { promos.length > 0 ? (
                        promos.map((promo, i) => (
                            <Link className="promotions__promo-card" key={ i } href={`/promo/${ promo.slug }`}>
                                <Image src={ promo.image } alt = "" className="promotions__promo-image"
                                width="500" height="250" />
                                <div className="promotions__text-container">
                                    <p className="promotions__title">
                                        { promo.title }
                                    </p>
                                    <p className="promotions__desc">
                                        { promo.main_description }
                                    </p>
                                </div>
                                <span className="promotions__date">
                                    { promo.end_date }
                                </span>
                            </Link>
                        ))
                    ): <></> }
                </div>
            </div>

            <ChatBtn onClick={toggleContactsOpen} />
            
            { isChatModalOpen && <ChatOptions /> }
            { isCartModalOpen && <CartModal /> }
            { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
        </div>
  );
}
