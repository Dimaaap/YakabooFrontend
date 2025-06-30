import dynamic from 'next/dynamic';

export const BooksContainer = dynamic(() => import('../main/BooksContainer'));
export const MainHeader = dynamic(() => import('../main/MainHeader'), {
  ssr: false,
});
export const AdditionalInfo = dynamic(() => import('../main/AdditionalInfo'));

export const CartModal = dynamic(() => import('../modals/CartModal'));
export const BookCategoriesWithSubcategoriesModal = dynamic(
  () => import('../modals/BookCategoriesWithSubcategoriesModal'),
  { ssr: false }
);
export const ChatOptions = dynamic(() => import('../modals/ChatOptions'));
export const ConfirmationCodeModal = dynamic(
  () => import('../modals/ConfirmationCodeModal'),
  { ssr: false }
);
export const MenuModal = dynamic(() => import('../modals/MenuModal'));
export const UserRegisterModal = dynamic(
  () => import('../modals/UserRegisterModal'),
  { ssr: false }
);
export const UserLoginModal = dynamic(
  () => import('../modals/UserLoginModal'),
  { ssr: false }
);
export const ProfileSettingsModal = dynamic(
  () => import('../modals/ProfileSettingsModal'),
  { ssr: false }
);
export const CreateWishListModal = dynamic(
  () => import('../modals/CreateWishListModal'),
  { ssr: false }
);
export const ProductImagesModal = dynamic(
  () => import('../modals/ProductImagesModal')
);

export const MainContainer = dynamic(() => import('../user/MainContainer'), {
  ssr: false,
});

export const ProductInfoModal = dynamic(
  () => import('../modals/ProductInfoModal')
);

export const DeliveryInfoModal = dynamic(
  () => import('../modals/DeliveryInfoModal')
);

export const ChatBtn = dynamic(() => import('../shared/ChatBtn'));
export const DescriptionText = dynamic(
  () => import('../board_games/DecriptionText')
);

export const Delivery = dynamic(() => import('../shared/Delivery'));
export const PayByParts = dynamic(() => import('../shared/PayByParts'));
export const BuyBtn = dynamic(() => import('../shared/BuyBtn'));
export const Advertisment = dynamic(
  () => import('../board_games/Advertisment')
);
