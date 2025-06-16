'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useProductImagesStore } from '../../states';

export const ContainerPhoto = ({ images = null }) => {
  const { setIsProductImagesOpen } = useProductImagesStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="container__left-part container-photo">
      <button className="container-photo__add-to-fav-button">
        <Image src="/icons/heart.svg" alt="" width="20" height="20" />
      </button>

      <div className="container-photo__images">
        <div
          className="container-photo__big-image"
          onClick={() => setIsProductImagesOpen(true)}
        >
          <Image
            src={images[activeImageIndex]}
            alt=""
            width="200"
            height="150"
          />
        </div>
        <div className="container-photo__rest-images">
          {images.map((image, index) => (
            <div
              className={`container-photo__image-container ${index === activeImageIndex ? 'active' : ''}`}
              key={index}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image src={image} width="30" height="20" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
