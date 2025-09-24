"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { PromoTimer } from '.';
export const Promotions = ({ promos }) => { 

    const SKELETON_CARDS_COUNT = 4

  return (
    <div className="promotions__right promo-content">
        {promos.length > 0 ? (
            promos.map((promo, i) => (
                <Link className="promotions__promo-card" key={i} href={`/promotion/${promo.slug}`}>
                    <Image
                        src={promo.image}
                        alt=""
                        className="promotions__promo-image"
                        width="500"
                        height="250"
                    />
                    <div className="promotions__text-container">
                        <p className="promotions__title">{promo.title}</p>
                        <p className="promotions__desc">{promo.main_description}</p>
                    </div>
                    <PromoTimer endDate={ promo.end_date } />
                </Link>
            ))
        ) : (
        [...Array(SKELETON_CARDS_COUNT)].map((_, i) => (
            <div className="promotions__promo-card" key={ i }>
                <div className="promotions__promo-image skeleton-image" />
                <div className="promotions__text-container">
                    <div className="promotions__title skeleton-title" />
                    <div className="promotions__desc skeleton-desc" />
                </div>
                <div className="promotions__date skeleton-date" />
            </div>
            ))
        )}
    </div>
  )
}
