import Image from 'next/image';
import React from 'react';

const ProductInfoModal = ({
  productImage,
  productTitle,
  productPrice,
  oldPrice,
}) => {
  return (
    <div className="product-info">
      <div className="product-info__title">
        <Image src={productImage} alt="" width="50" height="50" />
        <p className="product-info__name">{productTitle}</p>
      </div>
      <div className="product-info__price container-info">
        <div className="product-info__row container-info__row">
          <p className="container-info__price-container-title orange-text">
            {productPrice} грн
          </p>
          <p className="container-info__old-price cancelled-text">
            {oldPrice} грн
          </p>
          <button className="product-info__buy-btn">
            <Image src="/icons/cart.svg" alt="" width="18" height="18" />
            Купити
          </button>
        </div>
        <div className="product-info__row container-info__row">
          <div className="container-info__status">
            <Image src="/icons/truck.svg" alt="" width="15" height="15" />
            <p className="container-info__status-text green-text">
              В наявності
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoModal;
