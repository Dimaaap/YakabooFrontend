"use client"

import React, { useState, useEffect } from 'react'

import Endpoints from '../../endpoints';
import { fetchData } from '../../services';

import Link from "next/link";


export const PromotionsSidebar = ({ currentCategory=null }) => {

    const [promoCategories, setPromoCategories] = useState([]);

    useEffect(() => {
        fetchData(Endpoints.ALL_PROMO_CATEGORIES, setPromoCategories, "promo_categories");
      }, []);

  return (
    <div className="promotions__left promo-sidebar">
        <div className="promo-sidebar__container">
            <ul className="promo-sidebar__list">
                <li className={`promo-sidebar__item ${ !currentCategory ? "active": "" }`}>
                    <Link href="/promotions" className="promo-sidebar__link">
                        Всі
                    </Link>
                </li>
                {promoCategories.length > 0 ? (
                    promoCategories.map((category, i) => (
                        <li className={`promo-sidebar__item ${ currentCategory === category.slug ? "active": "" }`} key={i}>
                            <Link href={`/promotions/${ category.slug }`} className="promo-sidebar__link">
                                {category.title}
                            </Link>
                        </li>
                    ))
                ) : (
                    [...Array(5)].map((_, i) => (
                        <li className="promo-sidebar__item" key={i}>
                            <div className="skeleton skeleton--text"></div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    </div>
  )
}

