import Image from 'next/image';
import React from 'react';

const ProductInfoModal = ({
  productImage,
  productTitle,
  productPrice,
  isInStock=true,
  oldPrice=null,
}) => {
  return (
    <div className="product-info">
      <div className="product-info__title">
        <Image src={productImage} alt="" width="50" height="50" />
        <p className="product-info__name">{productTitle}</p>
      </div>
      <div className="product-info__price container-info">
        <div className="product-info__row container-info__row">
          <p className={`container-info__price-container-title ${ isInStock ? "orange-text" : "" }`}>
            {productPrice} грн
          </p>
          { oldPrice && (
            <p className="container-info__old-price cancelled-text">
              {oldPrice} грн
            </p>  
          ) }
          
          <button className={`book-container__pink-buy-btn buy-btn ${isInStock ? "buy-btn-pink" : "notify-btn-gray"}`}>
              { isInStock ? "Купити" : "Сповістити про наявність" }
          </button>
        </div>
        <div className="product-info__row container-info__row">
          <div className="container-info__status">
            { isInStock && (
              <Image src="/icons/truck.svg" alt="" width="15" height="15" />  
            ) }
            
            <p className={`container-info__status-text ${isInStock ? "green-text" : "gray-text"}`}>
              {isInStock ? "В наявності" : "Немає в наявності"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoModal;
