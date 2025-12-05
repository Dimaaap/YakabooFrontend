'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CookiesWorker } from '../../services';
import Endpoints from '../../endpoints';
import { wordDeclension } from '../../services/word-declension.service';
import { useCartStore, useDeliveryOptionsStore, usePromoCodeStore } from '../../states';
import { BonusInfoModal } from '../dynamic';

export const CheckoutPaymentInfo = () => {
  const [addPromo, setAddPromo] = useState(false);
  const [ showBonusInfo, setShowBonusInfo ] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');

  const { usedPromoCode, setUsedPromoCode, priceWithPromoCode } = usePromoCodeStore();
  const { cartItems } = useCartStore();
  const { deliveryPrice } = useDeliveryOptionsStore();

  const FREE_DELIVERY_FROM = 600;

  const toggleAddPromo = () => {
    if (addPromo) {
      setAddPromo(false);
    } else {
      setAddPromo(true);
    }
  };

  const toggleShowBonusInfo = () => {
    if (showBonusInfo) {
      setShowBonusInfo(false);
    } else {
      setShowBonusInfo(true);
    }
  };

  const getRestToFreeDelivery = (cartItemsPrice) => {
    return FREE_DELIVERY_FROM - cartItemsPrice;
  }

  const addPromoCode = async () => {
    const userEmail = CookiesWorker.get('email');
    setPromoCodeError('');

    if (!userEmail) {
      setPromoCodeError(
        'Для використання промокоду потрібно зареєструватись або увійти в акаунт'
      );
      return;
    }

    const promo = document.querySelector('.checkout__add-promo-input').value;

    try {
      const res = await fetch(Endpoints.USE_PROMO_CODE(userEmail, promo), {
        method: 'POST',
      });

      const response = await res.json();

      if (res.ok) {
        const promoId = response.promo_id;
        try {
          await fetchData(
            Endpoints.GET_PROMO_CODE_BY_ID(promoId),
            (promoData) => {
              setUsedPromoCode(promoData);
              CookiesWorker.setForYear('promo_code', JSON.stringify(promoData));
            }
          );
          setPromoCode('');
          setPromoCodeError('');
          setAddPromo(false);
        } catch (err) {
          console.error(err);
        }
      } else {
        setPromoCodeError(response.detail);
      }
    } catch (err) {
      console.log(err);
    }

    document.querySelector('.checkout__add-promo-input').value = '';
    setPromoCode('');
  };

  return (
    <div className="checkout__payment-info">
      <div className="checkout__payment-header">
        {!CookiesWorker.get('promo_code') && (
          <div className="checkout__payment-text-row">
            <p className="checkout__payment-text">
              Подарунковий сертифікат чи промокод
            </p>
            <button
              className="checkout__payment-btn add-btn gray-btn"
              type="button"
              onClick={() => toggleAddPromo()}
            >
              Додати
            </button>
          </div>
        )}
        {addPromo && (
          <div className="checkout__add-promo-block">
            <input
              type="text"
              className="checkout__add-promo-input"
              name="promo"
              placeholder="Промокод чи сертифікат"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              className="checkout__add-promo-button"
              type="button"
              disabled={
                !promoCode.length === 0 || CookiesWorker.get('promo_code')
              }
              onClick={() => addPromoCode()}
            >
              Застосувати
            </button>
          </div>
        )}
        {promoCodeError && (
          <p className="checkout__form-error-message">{promoCodeError}</p>
        )}
        {usedPromoCode.code && (
          <div className="checkout__payment-bill-row">
            <p className="checkout__payment-type">Використаний купон:</p>
            <span className="checkout__payment-total-sum used-promo-tile">
              {usedPromoCode.code}
            </span>
          </div>
        )}
        <p className="checkout__payment-additional-text">
          За наявності бонусів їх використання можливе після{' '}
          <span className="checkout__payment-link">авторизації</span>
        </p>
      </div>

      <div className="checkout__payment-body">
        <div className="checkout__payment-bill-row">
          <h5 className="checkout__payment-total">До сплати</h5>
          <h5 className="checkout__payment-total-sum bold">
            {!priceWithPromoCode
              ? cartItems?.total_price + deliveryPrice
              : priceWithPromoCode}{' '}
            грн
          </h5>
        </div>
        <div className="checkout__payment-bill-row">
          <p className="checkout__payment-type smaller">
            {cartItems?.items?.length}{' '}
            {wordDeclension(cartItems?.items?.length)}
          </p>
          <p className="checkout__payment-total-sum smaller">
            {cartItems?.total_price} грн
          </p>
        </div>
        {deliveryPrice > 0 && (
          <div className="checkout__payment-bill-row">
            <p className="checkout__payment-type smaller">Доставка</p>
            <p className="checkout__payment-total-sum smaller">
              {deliveryPrice} грн
            </p>
          </div>
        )}

        {priceWithPromoCode > 0 && (
          <div className="checkout__payment-bill-row positive">
            <p className="checkout__payment-type smaller positive">
              Знижка з купону
            </p>
            <p className="checkout__payment-total-sum smaller positive">
              {cartItems?.total_price + deliveryPrice - priceWithPromoCode} грн
            </p>
          </div>
        )}

        <div className="checkout__payment-bonuses">
          {showBonusInfo && <BonusInfoModal />}
          <div className="checkout__payment-bill-row">
            <p className="checkout__payment-type">
              Бонуси за замовлення
              <Image
                src="/icons/info.svg"
                alt=""
                width="18"
                height="18"
                onClick={() => toggleShowBonusInfo()}
              />
            </p>
            <p className="checkout__payment-total-sum blue">
              +{Math.ceil(cartItems?.total_price / 2)} бонусів
            </p>
          </div>
        </div>

        <div className="checkout__payment-notes">
          <span className="checkout__payment-notes-text">
            Відправляючи замовлення, я підтверджую, що прочитав і згоден(а) з{' '}
            <Link href="/conditions-of-use" className="checkout__payment-link">
              Умовами використання
            </Link>
          </span>
        </div>

        {deliveryPrice > 0 &&
          getRestToFreeDelivery(cartItems?.total_price) > 0 && (
            <div className="checkout__advert">
              <span className="checkout__advert-text">
                Додайте в кошик ще товарів на{' '}
                {getRestToFreeDelivery(cartItems?.total_price)} грн та отримайте
                безкоштовну доставку
              </span>
            </div>
          )}
      </div>

      <div className="checkout__payment-footer">
        <button
          className="checkout__payment-btn order-btn red-btn"
          type="submit"
        >
          Підтвердити замовлення
        </button>
        <p className="checkout__continue-shopping">Продовжити покупки</p>
      </div>
    </div>
  );
};
