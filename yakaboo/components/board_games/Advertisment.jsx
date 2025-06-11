import React from 'react';
import Link from 'next/link';

export const Advertisment = ({ href = '#' }) => {
  return (
    <Link href={href} className="container-info__ad advertisment">
      <div className="advertisment__red-badge">Акція</div>
      <p className="advertisment-text">
        Безплатна доставка Meest ПОШТА для замовлень від 349₴
      </p>
    </Link>
  );
};
