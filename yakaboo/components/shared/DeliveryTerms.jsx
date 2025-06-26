'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const DeliveryTerms = (deliveryLocation) => {
  const [openedDeliveryTerms, setOpenedDeliveryTerms] = useState([]);

  try {
    var {
      yakaboo_shop_price,
      new_post_office_price,
      new_post_department_price,
      new_post_courier_price,
      meest_post_price,
      ukrpost_courier_price,
      ukrpost_department_price,
    } = deliveryLocation.deliveryLocation.delivery_terms;

    var newPostArray = [
      new_post_office_price,
      new_post_courier_price,
      new_post_department_price,
    ];

    var ukrPostArray = [ukrpost_courier_price, ukrpost_department_price];
  } catch (err) {
    return;
  }

  const getMinimumPrice = (nums) => {
    return `${Math.min(...nums)}грн`;
  };

  const getMaximumPrice = (nums) => {
    return `${Math.max(...nums)}грн`;
  };

  return (
    <div className="container-info__delivery-terms delivery-terms">
      {yakaboo_shop_price !== null && (
        <div
          className="delivery-terms__row"
          onClick={() =>
            setOpenedDeliveryTerms((prev) =>
              prev.includes(1)
                ? prev.filter((item) => item !== 1)
                : [...prev, 1]
            )
          }
        >
          <div className="delivery-terms__header">
            <div className="delivery-terms__cell">
              <Image src="/icons/yakaboo.svg" alt="" width="16" height="16" />
              <p className="delivery-terms__title">Yakaboo</p>
            </div>
            <div className="delivery-terms__cell">
              <p className="delivery-terms__price">
                {openedDeliveryTerms.includes(1)
                  ? 'показати менше'
                  : yakaboo_shop_price === 0
                    ? 'безкоштовно'
                    : `${yakaboo_shop_price}грн`}
              </p>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width="16"
                height="16"
                className={`${openedDeliveryTerms.includes(1) ? 'rotated-img' : ''}`}
              />
            </div>
          </div>
          <div
            className={`delivery-terms__body ${openedDeliveryTerms.includes(1) ? '' : 'hidden-body'}`}
          >
            <div className="delivery-terms__delivery">
              <div className="delivery-terms__cell">
                <p className="delivery-terms__title">
                  Самовивіз із книгарні Yakaboo, Хрещатик 22, в Головпоштамті
                  (безкоштовно від 400 грн)
                </p>
              </div>
              <div className="delivery-terms__cell">
                <span className="delivery-terms__price">
                  {yakaboo_shop_price === 0
                    ? 'безкоштовно'
                    : `${yakaboo_shop_price}грн`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {newPostArray.some((value) => value !== null) && (
        <div
          className="delivery-terms__row"
          onClick={() =>
            setOpenedDeliveryTerms((prev) =>
              prev.includes(2)
                ? prev.filter((item) => item !== 2)
                : [...prev, 2]
            )
          }
        >
          <div className="delivery-terms__header">
            <div className="delivery-terms__cell">
              <Image
                src="/icons/nova-poshta.svg"
                alt=""
                width="16"
                height="16"
              />
              <p className="delivery-terms__title">Нова Пошта</p>
            </div>
            <div className="delivery-terms__cell">
              <p className="delivery-terms__price">
                {openedDeliveryTerms.includes(2)
                  ? 'показати менше'
                  : `${getMinimumPrice(newPostArray) === '0грн' ? '' : getMinimumPrice(newPostArray)} 
                ${getMinimumPrice(newPostArray) !== '0грн' ? '-' : ''} 
                ${getMaximumPrice(newPostArray) || null}`}
              </p>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width="16"
                height="16"
                className={`${openedDeliveryTerms.includes(2) ? 'rotated-img' : ''}`}
              />
            </div>
          </div>
          <div
            className={`delivery-terms__body ${openedDeliveryTerms.includes(2) ? '' : 'hidden-body'}`}
          >
            {new_post_office_price !== null && (
              <div className="delivery-terms__delivery">
                <div className="delivery-terms__cell delivery-cell">
                  <p className="delivery-terms__title">
                    Поштомат Нова Пошта (безкоштовно від 600 грн)
                  </p>
                </div>
                <div className="delivery-terms__cell delivery-cell">
                  <span className="delivery-terms__price">
                    {new_post_office_price} грн
                  </span>
                </div>
              </div>
            )}

            {new_post_department_price !== null && (
              <div className="delivery-terms__delivery">
                <div className="delivery-terms__cell delivery-cell">
                  <p className="delivery-terms__title">
                    Відділення Нова Пошта (безкоштовно від 799 грн)
                  </p>
                </div>
                <div className="delivery-terms__cell delivery-cell">
                  <span className="delivery-terms__price">
                    {new_post_department_price} грн
                  </span>
                </div>
              </div>
            )}

            {new_post_courier_price !== null && (
              <div className="delivery-terms__delivery">
                <div className="delivery-terms__cell delivery-cell">
                  <p className="delivery-terms__title">Кур'єр Нова Пошта</p>
                </div>
                <div className="delivery-terms__cell delivery-cell">
                  <span className="delivery-terms__price">
                    {new_post_courier_price} грн
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {meest_post_price !== null && (
        <div
          className="delivery-terms__row"
          onClick={() =>
            setOpenedDeliveryTerms((prev) =>
              prev.includes(3)
                ? prev.filter((item) => item !== 3)
                : [...prev, 3]
            )
          }
        >
          <div className="delivery-terms__header">
            <div className="delivery-terms__cell">
              <Image src="/icons/meest.svg" alt="" width="16" height="16" />
              <p className="delivery-terms__title">Meest</p>
            </div>
            <div className="delivery-terms__cell">
              <p className="delivery-terms__price">
                {openedDeliveryTerms.includes(3)
                  ? 'показати менше'
                  : meest_post_price === 0
                    ? 'безкоштовно'
                    : `${meest_post_price}грн`}
              </p>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width="16"
                height="16"
                className={`${openedDeliveryTerms.includes(3) ? 'rotated-img' : ''}`}
              />
            </div>
          </div>
          <div
            className={`delivery-terms__body ${openedDeliveryTerms.includes(3) ? '' : 'hidden-body'}`}
          >
            {meest_post_price !== null && (
              <div className="delivery-terms__delivery">
                <div className="delivery-terms__cell delivery-cell">
                  <p className="delivery-terms__title">
                    Meest ПОШТА (безкоштовно від 349 грн)
                  </p>
                </div>
                <div className="delivery-terms__cell delivery-cell">
                  <span className="delivery-terms__price">
                    {meest_post_price} грн
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {ukrPostArray.some((value) => value !== null) && (
        <div
          className="delivery-terms__row"
          onClick={() =>
            setOpenedDeliveryTerms((prev) =>
              prev.includes(4)
                ? prev.filter((item) => item !== 4)
                : [...prev, 4]
            )
          }
        >
          <div className="delivery-terms__header">
            <div className="delivery-terms__cell">
              <Image src="/icons/ukrposhta.svg" alt="" width="16" height="16" />
              <p className="delivery-terms__title">Укрпошта</p>
            </div>
            <div className="delivery-terms__cell">
              <p className="delivery-terms__price">
                {openedDeliveryTerms.includes(4)
                  ? 'показати менше'
                  : `${getMinimumPrice(ukrPostArray) === '0грн' ? '' : getMinimumPrice(ukrPostArray)} 
                ${getMinimumPrice(ukrPostArray) !== '0грн' ? '-' : ''} 
                ${getMaximumPrice(ukrPostArray) || null}`}
              </p>
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width="16"
                height="16"
                className={`${openedDeliveryTerms.includes(4) ? 'rotated-img' : ''}`}
              />
            </div>
          </div>

          <div
            className={`delivery-terms__body ${openedDeliveryTerms.includes(4) ? '' : 'hidden-body'}`}
          >
            {ukrpost_department_price !== null && (
              <div className="delivery-terms__delivery">
                <div className="delivery-terms__cell delivery-cell">
                  <p className="delivery-terms__title">
                    Відділення Укрпошта (безкоштовно від 79 грн)
                  </p>
                </div>
                <div className="delivery-terms__cell delivery-cell">
                  <span className="delivery-terms__price">
                    {ukrpost_department_price} грн
                  </span>
                </div>
              </div>
            )}

            {ukrpost_courier_price !== null && (
              <div className="delivery-terms__delivery">
                <div className="delivery-terms__cell delivery-cell">
                  <p className="delivery-terms__title">Кур'єр Укрпошта</p>
                </div>
                <div className="delivery-terms__cell delivery-cell">
                  <span className="delivery-terms__price">
                    {ukrpost_courier_price} грн
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="delivery-terms__additional">
        <div className="delivery-terms__seller-info">
          <p className="delivery-terms__cell">Продавець товару</p>
          <p className="delivery-terms__cell">Код товару</p>
        </div>
        <div className="delivery-terms__seller-info">
          <Image src="/icons/logo.svg" alt="" width="80" height="30" />
          <p className="delivery-terms__cell">1245917</p>
        </div>
      </div>
    </div>
  );
};
