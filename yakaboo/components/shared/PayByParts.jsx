import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PayByParts = () => {
  return (
    <div className="container-info__pay-by-parts pay-by-parts">
      <p className="pay-by-parts__title">
        Сплачуйте частинами
        <span className="pay-by-parts__additional">
          <Image
            src="/icons/additional-info.svg"
            alt=""
            width="15"
            height="15"
          />
        </span>
      </p>
      <div className="pay-by-parts__banks">
        <div className="pay-by-parts__bank">
          <Image src="/icons/mono.svg" alt="" width="35" height="35" />
          <div className="pay-by-parts__text">
            <p className="pay-by-parts__bank-title">Monobank</p>
            <Link href="#" className="pay-by-parts__count">
              2-3 платежі
            </Link>
          </div>
        </div>
        <div className="pay-by-parts__bank">
          <Image src="/icons/privatbank.svg" alt="" width="35" height="35" />
          <div className="pay-by-parts__text">
            <p className="pay-by-parts__bank-title">ПриватБанк</p>
            <Link href="#" className="pay-by-parts__count">
              2-4 платежі
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayByParts;
