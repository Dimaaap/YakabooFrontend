"use client";

import { CartProductCountInput } from ".";
import { CookiesWorker } from "../../services";
import { useCartStore } from "../../states";

export const CartItemQuantityBlock = ({ item }) => {

  const { changeQuantity } = useCartStore();
  const userEmail = CookiesWorker.get("email");

  return (
    <div className="checkout__cart-change-quantity cart-body__quantity">
      <div
        className="checkout__cart-change-quantity-feature cart-body__quantity-feature minus"
        onClick={() => changeQuantity(item.book_id, 'minus', userEmail)}
      >
        <div className="checkout__cart-change-quantity-minus cart-body__minus"></div>
      </div>

      <CartProductCountInput item={item} />

      <div
        className="checkout__cart-change-quantity-feature cart-body__quantity-feature plus"
        onClick={() => changeQuantity(item.book_id, 'add', userEmail)}
      >
        <div className="checkout__cart-change-quantity-plus"></div>
      </div>
    </div>
  );
};
