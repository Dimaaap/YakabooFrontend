"use client";

import { useEffect } from "react";
import { useBookCategoriesModalStore, useCartModalStore, useChatModalStore, 
    useSubcategoriesModalStore, useMenuModalStore
 } from "../../../states";

import "../../../styles/main.scss";
import { BookCategoriesWithSubcategoriesModal, CartModal, ChatBtn, ChatOptions, MenuModal } from "../../../components/dynamic";



export default function PromotionsLayout({ children }){

    const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
    const { isMenuModalOpen } = useMenuModalStore();
    const { isCartModalOpen } = useCartModalStore();
    const { isCategoriesModalOpen } = useBookCategoriesModalStore();
    const { setIsHoveringCategory, setIsHoveringSubcategoryModal, 
        setIsSubcategoriesModalOpen } = useSubcategoriesModalStore();

    const toggleContactsOpen = () => {
        setIsChatModalOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!setIsHoveringCategory && !setIsHoveringSubcategoryModal) {
          setIsSubcategoriesModalOpen(false);
        }
    }, [setIsHoveringCategory, setIsHoveringSubcategoryModal, setIsSubcategoriesModalOpen]);

    return(
        <>
            {isMenuModalOpen && <MenuModal />}
            {children}
            <ChatBtn onClick={toggleContactsOpen} />
            {isChatModalOpen && <ChatOptions />}
            {isCartModalOpen && <CartModal />}
            {isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal />}
        </>
    )
}