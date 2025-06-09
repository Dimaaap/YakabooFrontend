import React from 'react';
import Image from 'next/image';

export const ContainerPhoto = ({ images = null }) => {
  return (
    <div className="container__left-part container-photo">
      <button className="container-photo__add-to-fav-button">
        <Image src="/icons/heart.svg" alt="" width="20" height="20" />
      </button>

      <div className="container-photo__images">
        <div className="container-photo__big-image">
          <Image src={images[0]} alt="" width="250" height="150" />
        </div>
        <div className="container-photo__rest-images">
          {images.map((image, index) => (
            <div
              className={`container-photo__image-container ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <Image src={image} width="30" height="20" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
