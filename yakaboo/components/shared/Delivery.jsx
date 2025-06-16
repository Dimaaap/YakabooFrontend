import React from 'react';
import Image from 'next/image';
import { useDeliveryModalStore } from '../../states';

export const Delivery = ({ city = 'Київ' }) => {
  const { setIsDeliveryModalOpen } = useDeliveryModalStore();

  return (
    <div
      className="container-info__delivery board-delivery"
      onClick={() => setIsDeliveryModalOpen(true)}
    >
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
