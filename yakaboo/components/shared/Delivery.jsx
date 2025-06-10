import React from 'react';
import Image from 'next/image';

export const Delivery = ({ city = 'Київ' }) => {
  return (
    <div className="container-info__delivery delivery">
      <Image src="/icons/location.svg" alt="20" height="20" width="20" />
      <div className="delivery__text">
        <p className="delivery__city-title">{city}</p>
        <p className="delivery__city-description">
          Нижче наведені умови доставки
        </p>
      </div>
    </div>
  );
};
