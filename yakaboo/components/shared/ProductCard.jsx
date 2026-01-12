"use client";

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
  extraClass="",
  withAddToWishlist=true,
  isEbook=false,
  isAudio=false,
  hasCashback=false,
  hasWinterSupport=false,
  hasESupport=false,
  deliveryTime=null,
  UKDeliveryTime=null,
  waitSince=null,
  inStock=true
}) => {
  return (
    <Link className={`product-card ${extraClass}`} href={productLink}>
      { (hasCashback || hasWinterSupport) && (
        <div className="product-card__support">
          { hasCashback && (
            <div className="product-card__cashback-block">
              <Image src="/images/support_programs/natcinoalnyi-cashback.png" alt="Ця книга підтримує програму 'Національний кешбек'"
              width="100" height="100" />
            </div>
          ) }
          { hasWinterSupport && (
            <Image src="/images/support_programs/winter-support.svg" alt="Ця книга підтримує програму 'Зимвова підтримка'" 
            width="40" height="40"/>
          )}
          { hasESupport && (
            <Image src="https://www.yakaboo.ua/dist/e-book.png?a4f2e33a0e5fed77cdf6e0ed6c5a3fc7" alt="Ця книга підтримує програму 'ЄПідтримка'"
            width="40" height="40" />
          ) }
        </div>
      ) }
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
            width="300"
            height="300"
            className={`product-card__image ${isEbook ? "ebook-image": ""} ${isAudio ? "audio-image": ""}`}
          />
        </div>
        <div className="product-card__badges-container">
          {badges.map((badge, index) => (
            <div className="product-card__badge product-badge" key={index}>
              {badge}
            </div>
          ))}
        </div>
        <div className="product-cart__author-container">
          <p className="product-card__title">{title}</p>
          <span className="product-card__brand">{brand}</span>  
        </div>
        <div className="product-card__price-container">
          {newPrice ? (
            <div className="product-card__prices">
              <div className="product-card__discount">
                <span className="product-card__old-price cancelled-price">
                  {oldPrice} грн
                </span>  
                <span className="product-card__discount-percents">
                  -{Math.round(((oldPrice - newPrice) / oldPrice) * 100)}%
                </span>
              </div>
              <span className="product-card__promo-price red-price">
                {newPrice} грн
              </span>
            </div>
          ) : (
            <span className="product-card__default-price">
              {oldPrice} грн
            </span>
          )}

          <button className={`product-card__in-cart ${waitSince ? "blue-disabled" : ""}`} disabled={!!waitSince}>
            <Image src="/icons/cart.svg" alt="" width="25" height="25" />
          </button>
        </div>
        <div className="product-card__bonuses">
          <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
            <span className="product-card__bonuses-count">
              +{newPrice ? Math.ceil(newPrice / 2) : Math.ceil(oldPrice / 2)} бонусів
            </span>
        </div>
        { !inStock && (
          <span className="product-card__info-span red-text">
            Немає в наявності
          </span>
        ) }
        { inStock && !(isEbook || isAudio || UKDeliveryTime || deliveryTime || waitSince) && (
          <span className="product-card__delivery-badge">
            <Image src="/icons/truck.svg" alt="" width="18" height="18" />
              Безкоштовна доставка
          </span>
        ) }
        { isAudio && (
          <span className="product-card__info-span">
            <Image src="/icons/audio.svg" alt="" width="16" height="16" />
            Аудіокнига
          </span>
        ) }

        { inStock && isEbook && (
          <span className="product-card__info-span">
            <Image src="/icons/el_book.svg" alt="" width="16" height="16" />
            Електронна книга
          </span>
        ) }

        { inStock && waitSince && (
          <span className="product-card__info-span pink-text">
            Очікується з { waitSince }
          </span>
        ) }

        { inStock && UKDeliveryTime && (
          <span className="product-card__info-span red-text">
            <Image src="/icons/truck-pink.svg" alt="" width="16" height="16" />
            Доставка з UK {UKDeliveryTime} днів
          </span>
        ) }

        { inStock && deliveryTime && (
          <span className="product-card__info-span red-text">
            <Image src="/icons/truck-pink.svg" alt="" width="16" height="16" />
            Доставка { deliveryTime } днів
          </span>
        ) }
      </div>
    </Link>
  );
};
