"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { SORTING_ORDERS } from '../../utils'
import { useCurrentSortingOrderStore, useSortingOrderStore } from '../../states'

export const SortingOrdersModal = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsSortingModalOpen } = useSortingOrderStore();
  const { setCurrentSortingOrder } = useCurrentSortingOrderStore();

  const handleSelect = (id, label) => {
    setCurrentSortingOrder(label)
    const params = new URLSearchParams(searchParams.toString());
    params.set("sorting_order", id);

    const pathname = window.location.pathname;

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    setIsSortingModalOpen(false)
  }

  return (
    <div className="sorting-modal" onMouseDown={(e) => e.stopPropagation()}>
        <ul className="sorting-modal__options">
            { SORTING_ORDERS.map((sorting, index) => (
                <li className="sorting-modal__option" key={ index } 
                onClick={() => handleSelect(sorting.id, sorting.label)}>
                    { sorting.label }
                </li>
            )) }
        </ul>
    </div>
  )
}