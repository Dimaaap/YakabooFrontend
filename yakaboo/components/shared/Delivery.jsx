import React from 'react';
import Image from 'next/image';

export const Delivery = ({ city = 'Київ' }) => {
  return (
    <div className="container-info__delivery board-delivery">
      <div className="board-delivery__image-wrapper">
        <Image src="/icons/location.svg" alt="" height="40" width="40" />
      </div>
      <div className="board-delivery__text">
        <p className="board-delivery__city-title">{city}</p>
        <p className="board-delivery__city-description">
          Нижче наведені умови доставки
        </p>
      </div>
    </div>
  );
};
