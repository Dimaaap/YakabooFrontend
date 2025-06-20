import React from 'react';
import Image from 'next/image';
import { useDeliveryCityStore, useDeliveryModalStore } from '../../states';

export const Delivery = () => {
  const { setIsDeliveryModalOpen } = useDeliveryModalStore();
  const { deliveryCity } = useDeliveryCityStore();

  return (
    <div
      className="container-info__delivery board-delivery"
      onClick={() => setIsDeliveryModalOpen(true)}
    >
      <div className="board-delivery__image-wrapper">
        <Image src="/icons/location.svg" alt="" height="40" width="40" />
      </div>
      <div className="board-delivery__text">
        <p className="board-delivery__city-title">
          {deliveryCity ? deliveryCity : 'Вказати місто доставки'}
        </p>
        <p className="board-delivery__city-description">
          {deliveryCity
            ? 'Нижче наведені умови доставки'
            : 'Щоб бачити точні умови доставки'}
        </p>
      </div>
    </div>
  );
};
