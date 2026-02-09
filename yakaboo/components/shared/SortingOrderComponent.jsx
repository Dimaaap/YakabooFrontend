"use client";

import Image from 'next/image';
import React from 'react'
import { removeFilter, toQueryString, useFilterStore } from '../../states/FilterState';
import { getFilterLabel } from '../../utils';
import { useRouter } from 'next/router';

export const SortingOrderComponent = () => {
    
    const router = useRouter();

    const { selectedFilters } = useFilterStore();
    
    let labelForPrice = false;

  return (
    <div className="author-books__filters">
        { selectedFilters.map((key, index) => {
            let filterLabel = null;
            if(labelForPrice && (key.key === "priceFrom" || key.key === "priceTo")){
                return null
            } else if(!labelForPrice && (key.key == "priceFrom" || key.key == "priceTo")){
                filterLabel = getFilterLabel(key, selectedFilters)
                labelForPrice = true;
            } else {
                filterLabel = getFilterLabel(key, selectedFilters)
            }
            return <span className="author-books__filters-filter" key={ index }>
                { filterLabel }
                <Image src="/icons/close.svg" alt="" width="14" height="14" onClick={() => {
                    removeFilter(key);
                    router.replace(`${pathname}?${toQueryString()}`)
                }} />
                </span> 
            }) }
        <button className="author-books__filters-clear-all" onClick={handleResetFilters}>
            Очистити все
        </button>
    </div>
  )
}