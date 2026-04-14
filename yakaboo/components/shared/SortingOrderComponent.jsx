"use client";

import Image from 'next/image';
import React from 'react'
import { removeFilter, resetFilters, useFilterStore} from '../../states/FilterState';
import { getFilterLabel, updateQueryParam } from '../../utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { filtersMapping } from '../../site.config';

export const SortingOrderComponent = () => {
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { selectedFilters } = useFilterStore();
    
    let labelForPrice = false;

    const handleRemove = filter => {
        removeFilter(filter);

        const queryKey = filtersMapping[filter.key];
        const currentState = useFilterStore.getState()[filter.key];

        const newQuery = updateQueryParam(
            searchParams,
            queryKey,
            currentState
        )

        router.replace(`${pathname}?${newQuery}`)
    }

     const handleReset = () => {
        resetFilters();
        router.replace(pathname);
    };

    if(!selectedFilters?.length){
        return null
    }

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
                <Image src="/icons/close.svg" alt="" width="14" height="14" onClick={() => handleRemove(key)} />
                </span> 
            }) }
        <button className="author-books__filters-clear-all" onClick={handleReset}>
            Очистити все
        </button>
    </div>
  )
}