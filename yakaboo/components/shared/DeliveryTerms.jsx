import React from 'react';
import Image from 'next/image';

export const DeliveryTerms = (deliveryLocation) => {
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
      {console.log(deliveryLocation)}
      {yakaboo_shop_price && (
        <div className="delivery-terms__row">
          <div className="delivery-terms__cell">
            <Image src="/icons/yakaboo.svg" alt="" width="16" height="16" />
            <p className="delivery-terms__title">Yakaboo</p>
          </div>
          <div className="delivery-terms__cell">
            <p className="delivery-terms__price">{yakaboo_shop_price}грн</p>
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width="16"
              height="16"
            />
          </div>
        </div>
      )}

      {newPostArray.some((value) => value !== null) && (
        <div className="delivery-terms__row">
          <div className="delivery-terms__cell">
            <Image src="/icons/nova-poshta.svg" alt="" width="16" height="16" />
            <p className="delivery-terms__title">Нова Пошта</p>
          </div>
          <div className="delivery-terms__cell">
            <p className="delivery-terms__price">
              {`${getMinimumPrice(newPostArray) === '0грн' ? '' : getMinimumPrice(newPostArray)} 
              ${getMinimumPrice(newPostArray) !== '0грн' ? '-' : ''} 
              ${getMaximumPrice(newPostArray) || null}`}
            </p>
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width="16"
              height="16"
            />
          </div>
        </div>
      )}

      {meest_post_price && (
        <div className="delivery-terms__row">
          <div className="delivery-terms__cell">
            <Image src="/icons/meest.svg" alt="" width="16" height="16" />
            <p className="delivery-terms__title">Meest</p>
          </div>
          <div className="delivery-terms__cell">
            <p className="delivery-terms__price">{meest_post_price} грн</p>
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width="16"
              height="16"
            />
          </div>
        </div>
      )}

      {ukrPostArray.some((value) => value !== null) && (
        <div className="delivery-terms__row">
          <div className="delivery-terms__cell">
            <Image src="/icons/ukrposhta.svg" alt="" width="16" height="16" />
            <p className="delivery-terms__title">Укрпошта</p>
          </div>
          <div className="delivery-terms__cell">
            <p className="delivery-terms__price">
              {`${getMinimumPrice(ukrPostArray) === '0грн' ? '' : getMinimumPrice(ukrPostArray)} 
              ${getMinimumPrice(ukrPostArray) !== '0грн' ? '-' : ''} 
              ${getMaximumPrice(ukrPostArray) || null}`}
            </p>
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width="16"
              height="16"
            />
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
