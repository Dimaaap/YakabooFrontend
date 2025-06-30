import React from 'react';
import Image from 'next/image';

const BuyBtn = () => {
  return (
    <button className="container-info__buy-btn buy-btn">
      <Image src="/icons/cart.svg" alt="" width="18" height="18" />
      Купити
    </button>
  );
};

export default BuyBtn;
