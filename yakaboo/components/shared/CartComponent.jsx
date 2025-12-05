'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { wordDeclension } from '../../services/word-declension.service';
import { useCartStore } from '../../states';
import { CookiesWorker } from '../../services';
import { CartItemQuantityBlock, CartProductCountInput } from '.';

export const CartComponent = () => {

  const userEmail = CookiesWorker.get("email");

  const [editCartMode, setEditCartMode] = useState(false);

  const { cartItems, deleteItemFromCart, changeQuantity } = useCartStore();

  const toggleEditMode = () => {
    if (editCartMode) {
      setEditCartMode(false);
    } else {
      setEditCartMode(true);
    }
  };


  return (
    <div className="checkout__cart-content">
      <div className="checkout__cart-header">
        {cartItems?.items?.length} {wordDeclension(cartItems?.items?.length)} у
        кошику
        <button
          className={`checkout__cart-edit-btn ${editCartMode ? 'edit-cart' : ''}`}
          onClick={() => toggleEditMode()}
          type="button"
        >
          <Image
            src={`/icons/edit${editCartMode ? '-white' : ''}.svg`}
            alt=""
            width="18"
            height="18"
            className={`checkout__cart-edit-img`}
          />
        </button>
      </div>

      <div className="checkout__cart-body">
        {cartItems?.items?.map((item, index) => (
          <div className="checkout__cart-item" key={index}>
            <div className="checkout__cart-item__left-part">
              <Link
                className="checkout__cart-item__image-container"
                href={`/book/${item.slug}`}
              >
                <Image
                  src={item.images[0].image_url}
                  alt={item.title}
                  width="50"
                  height="50"
                />
              </Link>
              <div className="checkout__cart-item-info">
                <p className="checkout__cart-item-title">{item.title}</p>
                <div className="checkout__cart-item-format">
                  <span className="checkout__cart-item-price blue-text">
                    {item.price} грн
                  </span>
                  <div className="separator-dot"></div>
                  <p className="checkout___cart-item-format-status">
                    {item.format}
                  </p>
                </div>
                <div className="checkout__cart-item-format second-row">
                  <div className="checkout__cart-item-in-stock">
                    {item.is_in_stock ? (
                      <Image
                        src="/icons/truck.svg"
                        alt=""
                        width="18"
                        height="18"
                      />
                    ) : (
                      ''
                    )}
                    <span
                      className={`checkout__cart-item-in-stock-text ${item.is_in_stock ? 'green-truck' : ''}`}
                    >
                      {item.is_in_stock ? 'В наявності' : 'Немає в наявності'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout__cart-item__right-part">
              {!editCartMode ? (
                <div className="checkout__cart-quantity">
                  {item.quantity} шт.
                </div>
              ) : (
                <div className="checkout__cart-edit-container">
                  <button
                    className="checkout__cart-delete-item-btn"
                    type="button"
                    onClick={() => deleteItemFromCart(item.book_id, userEmail)}
                  >
                    Видалити
                  </button>
                  <CartItemQuantityBlock item={ item } />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="checkout__cart-footer">
        <p className="checkout__cart-total">
          Разом {cartItems?.total_price} грн
        </p>
      </div>
    </div>
  );
};
