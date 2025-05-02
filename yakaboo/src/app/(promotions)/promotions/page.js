"use client";

import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../../utils';
import Endpoints from '../../../../endpoints';
import { PromotionsSidebar, Promotions } from '../../../../components';


export default function PromotionsPage() {

    const [promos, setPromos] = useState([]);

    useEffect(() => {
        fetchData(Endpoints.ALL_PROMOTIONS, setPromos, "promotions");
    }, []);

  return (
    <div className="promotions">
      <h4 className="promotions__title">Акції та знижки</h4>
      <div className="promotions__content">
        <PromotionsSidebar />
        <Promotions promos={ promos } />
      </div>
    </div>
  );
}
