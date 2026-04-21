import Image from 'next/image';
import React from 'react';

const ProductInfoModal = ({
  productImage,
  productTitle,
  productPrice,
  isInStock=true,
  oldPrice=null
}) => {
  return (
    <div className="product-info">
      <div className="product-info__title">
        <Image src={productImage} alt="" width="50" height="50" />
        <p className="product-info__name">{productTitle}</p>
      </div>
      <div className="product-info__price container-info">
        <div className="product-info__row container-info__row">
          <div className="product-info__row container-info__col">
            <p className={`container-info__price-container-title ${ isInStock ? "orange-text" : "" }`}>
              {productPrice} грн
            </p>
            { oldPrice && (
              <p className="container-info__old-price cancelled-text">
                {oldPrice} грн
              </p>  
            ) } 
          </div>

          <button className={`book-container__pink-buy-btn buy-btn ${isInStock ? "buy-btn-pink smaller-pink" : "notify-btn-gray"}`}>
              { isInStock ? "Купити" : "Сповістити про наявність" }
          </button>
        </div>
        <div className="product-info__row container-info__row">
          <div className="container-info__status">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoModal;
