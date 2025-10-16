import React from 'react';
import { Badge, BookInfoBadge } from '.';
import Link from 'next/link';
import Image from 'next/image';

export const ProductCard = ({
  title = 'Подорожуємо світом. Гра ходилка',
  brand = 'Авторський проєкт Євгенії Кузнєцової',
  imageSrc = 'https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_52333.jpg',
  badges = [],
  productCode = '1245917',
  productLink = '#',
  oldPrice = 156,
  newPrice = null,
  bonusesCount = 0,
  inStock = true,
  extraClass="",
  withAddToWishlist=true,
  isEbook=false
}) => {
  return (
    <Link className={`product-card ${extraClass}`} href={productLink}>
      <div className="product-card__header">
        <BookInfoBadge text={productCode} backgroundColor="#F4F6F8" />
        { withAddToWishlist && (
          <div className="info-badge" style={{ backgroundColor: '#F4F6F8' }}>
            <svg
              width="20"
              height="16"
              viewBox="0 0 16 14"
              fill="#333373"
              xmlns="http://www.w3.org/2000/svg"
              className="ui-btn-favorite__img"
            >
              <path d="M0.595215 4.64648C0.595215 7.78125 3.21729 10.8721 7.31152 13.5088C7.53857 13.6479 7.80957 13.7871 7.99268 13.7871C8.18311 13.7871 8.4541 13.6479 8.67383 13.5088C12.7681 10.8721 15.3901 7.78125 15.3901 4.64648C15.3901 1.9585 13.5371 0.0834961 11.1348 0.0834961C9.74316 0.0834961 8.65186 0.728027 7.99268 1.69482C7.34814 0.735352 6.24951 0.0834961 4.85059 0.0834961C2.45557 0.0834961 0.595215 1.9585 0.595215 4.64648ZM2.07471 4.64648C2.07471 2.78613 3.29053 1.53369 4.93115 1.53369C6.25684 1.53369 6.99658 2.33936 7.45801 3.04248C7.66309 3.33545 7.80225 3.43066 7.99268 3.43066C8.19043 3.43066 8.30762 3.32812 8.52734 3.04248C9.01807 2.34668 9.74316 1.53369 11.0615 1.53369C12.7021 1.53369 13.918 2.78613 13.918 4.64648C13.918 7.23926 11.2153 10.103 8.13184 12.1538C8.06592 12.1978 8.02197 12.2271 7.99268 12.2271C7.96338 12.2271 7.91943 12.1978 7.85352 12.1538C4.77002 10.103 2.07471 7.23926 2.07471 4.64648Z"></path>
            </svg>
          </div>  
        ) }
      </div>
      <div className="product-card__body">
        <div className="product-card__image-container">
          <Image
            src={imageSrc}
            alt=""
            width="150"
            height="100"
            className={`product-card__image ${isEbook ? "ebook-image": ""}`}
          />
        </div>
        <div className="product-card__badges-container">
          {badges.map((badge, index) => (
            <div className="product-card__badge product-badge" key={index}>
              {badge}
            </div>
          ))}
        </div>
        <p className="product-card__title">{title}</p>
        <span className="product-card__brand">{brand}</span>
        <div className="product-card__price-container">
          {newPrice ? (
            <div className="product-card__prices">
              <span className="product-card__promo-price red-price">
                {newPrice} грн
              </span>
              <span className="product-card__old-price cancelled-price">
                {oldPrice} грн
              </span>
            </div>
          ) : (
            <span className="product-card__default-price blue-price">
              {oldPrice} грн
            </span>
          )}
        </div>
        {bonusesCount > 0 && (
          <div className="product-card__bonuses">
            <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
            <span className="product-card__bonuses-count">
              +{bonusesCount} бонусів
            </span>
          </div>
        )}
        {!isEbook ? (
          <div className={`product-card__in-stock-container ${inStock ? 'in-stock' : 'waiting'} `}>
            <Image src="/icons/truck.svg" alt="" width="15" height="15" />
            <span className="product-card__in-stock-text">
              {inStock ? 'В наявності' : 'Немає в наявності'}
            </span>
          </div>  
        ) : (
          <div className="product-card__in-stock-container ebook">
            <Image src="/icons/mobile-phone.svg" alt="" width="15" height="15" />
            <span className="product-card__ebook-text">
              Електронна книга
            </span>
          </div>
        )}
       
        { inStock ? (
          <button className="product-card__buy-btn">
            <Image src="/icons/cart.svg" alt="" width="16" height="16" />
            Купити
          </button>  
        ) : (
          <button className="product-card__buy-btn inactive-btn">
            Сповістити про наявність
          </button>
        ) }
        
      </div>
    </Link>
  );
};
