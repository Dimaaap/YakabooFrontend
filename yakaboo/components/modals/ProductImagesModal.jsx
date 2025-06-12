'use client';

import React, { useState } from 'react';
import { handleBackdropClick } from '../../services';
import { ModalCloseBtn } from '../shared';

export const ProductImagesModal = ({ productTitle }) => {
  const [productImagesModalOpen, setProductImagesModalOpen] = useState(false);

  return (
    <div
      className="menu product-images"
      onClick={(e) => handleBackdropClick(e, setProductImagesModalOpen)}
    >
      <div className="product-images__content">
        <ModalCloseBtn clickHandler={() => setProductImagesModalOpen(false)} />
        <p className="product-images__title">{productTitle}</p>
        <div className="product-images__body">
          <div className="product-images__images-container">
            <Image
              src="/https://static.yakaboo.ua/media/catalog/product/i/m/img_52333.jpg"
              alt=""
              width="600"
              height="600"
            />
            <Image
              src="https://static.yakaboo.ua/media/catalog/product/i/m/img_52332.jpg"
              alt=""
              width="600"
              height="600"
            />
            <Image
              src="https://static.yakaboo.ua/media/catalog/product/i/m/img_52361.jpg"
              alt=""
              width="600"
              height="600"
            />
            <Image
              src="https://static.yakaboo.ua/media/catalog/product/i/m/img_52362.jpg"
              alt=""
              width="600"
              height="600"
            />
          </div>
          <div className="product-images__small-images">
            <p>Обкладинка</p>
            <div className="product-images__images-row">
              <div className="product-images__image-wrapper">
                <Image
                  src="/https://static.yakaboo.ua/media/catalog/product/i/m/img_52333.jpg"
                  alt=""
                  width="40"
                  height="40"
                />
              </div>

              <div className="product-images__image-wrapper">
                <Image
                  src="https://static.yakaboo.ua/media/catalog/product/i/m/img_52332.jpg"
                  alt=""
                  width="40"
                  height="40"
                />
              </div>

              <div className="product-images__image-wrapper">
                <Image
                  src="https://static.yakaboo.ua/media/catalog/product/i/m/img_52361.jpg"
                  alt=""
                  width="40"
                  height="40"
                />
              </div>

              <div className="product-images__image-wrapper">
                <Image
                  src="https://static.yakaboo.ua/media/catalog/product/i/m/img_52362.jpg"
                  alt=""
                  width="40"
                  height="40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
