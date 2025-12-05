"use client";

import { CookiesWorker } from "../../services";
import { useCartStore } from "../../states";

export const CartProductCountInput = ({ item }) => {

  const MIN_ITEM_QUANTITY = 1;
  const MAX_ITEM_QUANTITY = 999;  
  const userEmail = CookiesWorker.get("email");  
  const { handleFocus, handleQuantityChangeLocal, handleQuantityBlur } = useCartStore();

  return (
    <input
      type="text"
      className="cart-body__quantity-input checkout__cart-change-quantity-input"
      value={item.quantity === 0 ? '' : item.quantity}
      min={ MIN_ITEM_QUANTITY }
      max={ MAX_ITEM_QUANTITY }
      onFocus={() => handleFocus(item.book_id)}
      onChange={(e) => handleQuantityChangeLocal(item.book_id, e.target.value)}
      onBlur={(e) =>
        handleQuantityBlur(item.book_id, e.target.value, userEmail)
      }
    />
  );
};
