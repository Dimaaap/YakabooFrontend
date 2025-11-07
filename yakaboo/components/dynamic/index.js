import dynamic from 'next/dynamic';

export const BooksContainer = dynamic(() => import('../main/BooksContainer'));
export const MainHeader = dynamic(() => import('../main/MainHeader'));
export const AdditionalInfo = dynamic(() => import('../main/AdditionalInfo'));

export const CartModal = dynamic(() => import('../modals/CartModal'));
export const BookCategoriesWithSubcategoriesModal = dynamic(
  () => import('../modals/BookCategoriesWithSubcategoriesModal')
);
export const ChatOptions = dynamic(() => import('../modals/ChatOptions'));
export const ConfirmationCodeModal = dynamic(
  () => import('../modals/ConfirmationCodeModal')
);
export const MenuModal = dynamic(() => import('../modals/MenuModal'));
export const UserRegisterModal = dynamic(
  () => import('../modals/UserRegisterModal')
);
export const UserLoginModal = dynamic(
  () => import('../modals/UserLoginModal')
);
export const ProfileSettingsModal = dynamic(
  () => import('../modals/ProfileSettingsModal')
);
export const CreateWishListModal = dynamic(
  () => import('../modals/CreateWishListModal')
);
export const ProductImagesModal = dynamic(
  () => import('../modals/ProductImagesModal')
);

export const MainSidebar = dynamic(
  () => import("../main/MainSidebar")
)

export const MainContainer = dynamic(() => import('../user/MainContainer')  );

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

export const AddToWishlistBtn = dynamic(() => import('../shared/AddToWishlistBtn'))

export const BonusesHeader = dynamic(() => import('../bonuses/BonusesHeader'));
export const BonusLeftSection = dynamic(() => import('../bonuses/BonusesLeftSection'));
export const BousesUserStatus = dynamic(() => import('../bonuses/BonusesUserStatus'));
export const BonusesStatusFeatures = dynamic(() => import('../bonuses/BonusesStatusFeatures'));

export const OrderContainer = dynamic(() => import('../orders/OrderContainer'));

export const MobileApp = dynamic(() => import("../shared/MobileApp"));
export const DownloadFile = dynamic(() => import("../shared/DownloadFile"))

export const CartInfo = dynamic(() => import("../shared/CartInfo"))