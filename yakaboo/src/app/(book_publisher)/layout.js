'use client';

import { useEffect } from 'react';

import '../../../styles/main.scss';
import {
  BookCategoriesWithSubcategoriesModal,
  CartModal,
  ChatBtn,
  ChatOptions,
  MenuModal,
  ProfileSettingsModal,
} from '../../../components/dynamic';
import {
  useBookCategoriesModalStore,
  useCartModalStore,
  useChatModalStore,
  useMenuModalStore,
  useSubcategoriesModalStore,
  useProfileSettingsModalStore,
} from '../../../states';

export default function PromotionsLayout({ children }) {
  const { isChatModalOpen, setIsChatModalOpen } = useChatModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isCartModalOpen } = useCartModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
  const {
    setIsHoveringCategory,
    setIsHoveringSubcategoryModal,
    setIsSubcategoriesModalOpen,
  } = useSubcategoriesModalStore();

  const toggleContactsOpen = () => {
    setIsChatModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!setIsHoveringCategory && !setIsHoveringSubcategoryModal) {
      setIsSubcategoriesModalOpen(false);
    }
  }, [
    setIsHoveringCategory,
    setIsHoveringSubcategoryModal,
    setIsSubcategoriesModalOpen,
  ]);

  return (
    <>
      {isMenuModalOpen && <MenuModal />}
      {children}
      <ChatBtn onClick={toggleContactsOpen} />
      {isChatModalOpen && <ChatOptions />}
      {isCartModalOpen && <CartModal />}
      {isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal />}
      {isProfileSettingsModalOpen && <ProfileSettingsModal />}
    </>
  );
}
