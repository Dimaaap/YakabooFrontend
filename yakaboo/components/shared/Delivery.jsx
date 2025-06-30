import React from 'react';
import Image from 'next/image';
import { useDeliveryCityStore, useDeliveryModalStore } from '../../states';

const Delivery = () => {
  const { setIsDeliveryModalOpen } = useDeliveryModalStore();
  const { deliveryLocation } = useDeliveryCityStore();

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
          {deliveryLocation ? deliveryLocation.title : 'Вказати місто доставки'}
        </p>
        <p className="board-delivery__city-description">
          {deliveryLocation
            ? 'Нижче наведені умови доставки'
            : 'Щоб бачити точні умови доставки'}
        </p>
      </div>
    </div>
  );
};

export default Delivery;
