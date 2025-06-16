'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { handleBackdropClick } from '../../services';
import { ModalCloseBtn } from '../shared';
import { useProductImagesStore } from '../../states';
import { useBlockBodyScroll } from '../../hooks';

const ProductImagesModal = ({ productTitle, images = [] }) => {
  const { isProductImagesOpen, setIsProductImagesOpen } =
    useProductImagesStore();

  const [activeIndex, setActiveIndex] = useState(0);

  useBlockBodyScroll(isProductImagesOpen);

  const imagesRef = useRef([]);
  imagesRef.current = [];

  const setImageRef = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  const handleSmallImageClick = (index) => {
    setActiveIndex(index);
    imagesRef.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className="menu product-images"
      onClick={(e) => handleBackdropClick(e, setIsProductImagesOpen)}
    >
      <div className="menu__content product-images__content">
        {console.log(imagesRef)}
        <ModalCloseBtn
          clickHandler={() => setIsProductImagesOpen(false)}
          extraClasses="product-images__close"
        />
        <p className="product-images__title">{productTitle}</p>
        <div className="product-images__body">
          <div className="product-images__images-container">
            {images.map((image, index) => (
              <div key={index} ref={setImageRef}>
                <Image src={image} alt="" width="500" height="500" />
              </div>
            ))}
          </div>
          <div className="product-images__small-images">
            <p>Обкладинка</p>
            <div className="product-images__images-row">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`product-images__image-wrapper ${activeIndex === index ? 'is-active' : ''}`}
                  onClick={() => handleSmallImageClick(index)}
                >
                  <Image src={image} alt="" width="40" height="40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesModal;
