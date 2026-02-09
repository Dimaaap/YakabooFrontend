"use client";

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

export const Pagination = ({ total, limit }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const PAGES_COUNT = Math.ceil(total / limit);
    const page = Number(searchParams.get("page")) || 1;
    const isFirstPage = page === 1;
    const isLastPage = page === PAGES_COUNT;

    const updatePageInQuery = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="pagination-buttons">                
            <div className="pagination-buttons__page-btns">
                <button className={`pagination-buttons__page-btns-back ${isFirstPage ? "disabled": ""}`} disabed={ isFirstPage } type="button"
                onClick={ ()=> updatePageInQuery(page - 1) }>
                    <span className="pagination-buttons__btn-icon">
                        <Image src="/icons/chevron-down.svg" width="18" height="18" alt="" />
                    </span>
                    Назад
                </button> 
                { [...Array(PAGES_COUNT)].map((_, index) => {
                    const pageNumber = index + 1;
                    return(
                        <button className={`pagination-buttons__page-btns-number ${page === pageNumber ? 'active' : ''}`} 
                        type="button" key={ index } onClick={ () => updatePageInQuery(pageNumber) }>
                            { pageNumber}
                        </button>    
                    );
                })}
                <button className={`pagination-buttons__page-btns-forward ${isLastPage ? "disabled" : ""}`} disabled={ isLastPage } type="button"
                onClick={ () => updatePageInQuery(page + 1) }>
                    Вперед
                    <span className="pagination-buttons__btn-icon">
                        <Image src="/icons/chevron-down.svg" width="18" height="18" alt="" />
                    </span>
                </button>
            </div>
        </div> 
    )
}
