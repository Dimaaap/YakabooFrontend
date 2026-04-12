"use client";

import Endpoints from '../../../../endpoints';
import { Promotions } from '../../../../components';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../../services/fetch.service';
import { STALE_TIME } from '../../../../site.config';


export default function PromotionsPage() {

    const { data: promos = [] } = useQuery({
      queryKey: ["promotions"],
      queryFn: () => fetcher(Endpoints.ALL_PROMOTIONS),
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME
    })
  return (
    <div className="promotions">
      <h4 className="promotions__title">Акції та знижки</h4>
      <div className="promotions__content">
        <Promotions promos={ promos } />
      </div>
    </div>
  );
}
