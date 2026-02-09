"use client";

import Image from 'next/image'
import React, { useRef } from 'react'
import { wordDeclension } from '../../services/word-declension.service'
import { useCurrentSortingOrderStore, useSortingOrderStore } from '../../states';

export const AuthorsHeader = ({ categoryTitle, total }) => {
    
    const selectRef = useRef(null);

    const { isSortingModalOpen, setIsSortingModalOpen } = useSortingOrderStore();
    const { currentSortingOrder } = useCurrentSortingOrderStore();

    const toggleSortingOrderModal = () => {
        if(isSortingModalOpen){
            setIsSortingModalOpen(false)
        } else {
            setIsSortingModalOpen(true)
        }
    }

    return (
        <div className="author-books__header">
            <div className="author-books__header-text" onClick={() => setIsSortingModalOpen(false)}>
                <h5 className="author-books__category">
                    { categoryTitle }
                </h5>
                <span className="author-books__book-count" ref={ selectRef }>
                    {`${total} ${wordDeclension(total)}`}
                </span>
            </div>
            <span className="author-books__select" onClick={() => toggleSortingOrderModal() }>
                <Image src="/icons/sort.svg" alt="" width="16" height="16" />
                { currentSortingOrder }
            </span>
        </div>
    )
}
