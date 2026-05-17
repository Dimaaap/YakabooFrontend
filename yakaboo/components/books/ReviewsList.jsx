"use client";

import Image from "next/image";
import { Review } from "."
import { useState } from "react";

export const ReviewsList = ({ reviews }) => {

    const BASE_COUNT = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [isShowMoreMode, setIsShowMoreMode] = useState(true);

    const countPages = reviews ? Math.ceil(reviews.length / BASE_COUNT) : 0;
    const startIndex = (currentPage - 1) * BASE_COUNT;
    const endIndex = startIndex + BASE_COUNT
    const currentReviews = isShowMoreMode ? reviews.slice(0, currentPage * BASE_COUNT) : reviews.slice(startIndex, endIndex);


    const handleNextPage = () => {
        setIsShowMoreMode(false);

        if(currentPage < countPages){
            setCurrentPage(prev => prev + 1);
        }
    }

    const handlePrevPage = () => {
        setIsShowMoreMode(false);

        if(currentPage > 1){
            setCurrentPage(prev => prev - 1);
        }
    }


    const handleShowMore = () => {
        setIsShowMoreMode(true);

        if(currentPage < countPages){
            setCurrentPage(prev => prev + 1);   
        }
    }

    
    const renderPaginationButtons = () => {
        if(countPages <= 6){
            return Array.from({ length: countPages }).map((_, index) => (
                <button
                    key={ index }
                    className={`book-container__reviews-pagination-btn ${currentPage === index + 1 ? "active": ""} `}
                    type="button"
                    onClick={() => {
                        setIsShowMoreMode(false);
                        setCurrentPage(page);
                    }}
                >
                    { index + 1 }
                </button>
            ))
        } 

        const buttons = [];

        const addPageButton = (page) => {
            buttons.push(
                <button
                    key={ page }
                    className={`book-container__reviews-pagination-btn ${currentPage === page ? "active": ""}`}
                    type="button"
                    onClick={() => {
                        setIsShowMoreMode(false);
                        setCurrentPage(page);
                    }}
                >
                    { page }
                </button>
            )
        }

        const addDots = (key) => {
            buttons.push(
                <button
                    key={ key }
                    className="book-container__reviews-pagination-btn dots"
                    type="button"
                    disabled
                >
                    ...
                </button>
            )
        }

        addPageButton(1);

        if(currentPage <= 4){
            for(let page = 2; page <= 5; page++){
                addPageButton(page);
            }

            addDots("dots");
            addPageButton(countPages);
            return buttons
        }

        if(currentPage >= countPages - 3){
            addDots("dots-start");

            for(let page = countPages - 4; page <= countPages; page++){
                addPageButton(page);
            }

            return buttons
        }

        addDots("dots-start");

        for(
            let page = currentPage - 1;
            page <= currentPage + 1;
            page ++
        )(
            addPageButton(page)
        )

        addDots("dots-end");
        addPageButton(countPages);

        return buttons;
    }

    return(
        <div className="book-container__reviews">
            <div className="book-container__reviews-list">
                { currentReviews.map((review, index) => (
                    <Review review={ review } key={ index } />
                )) }
            </div>    
            { countPages > 1 && (
                <div className="book-container__reviews-pagination">
                    { currentPage < countPages && (
                        <button className="book-container__show-more" type="button" onClick={ handleShowMore }>
                            Показати більше 
                            <Image src="/icons/show-more-btn.svg" alt="" width="20" height="20" />
                        </button>    
                    ) }

                    <div className="book-container__reviews-pagination-btns-row">
                        <button className="book-container__reviews-pagination-btn back" type="button"
                        onClick={ handlePrevPage } disabled={ currentPage === 1 }>
                            <Image src="/icons/arrow-left.svg" alt="" width="12" height="12" />
                            Назад
                        </button>
                        { renderPaginationButtons() }
                        <button className="book-container__reviews-pagination-btn next" type="button"
                        onClick={ handleNextPage }
                        disabled={ currentPage === countPages }>
                            Вперед
                            <Image src="/icons/arrow-left.svg" alt="" width="12" height="12" />
                        </button>
                    </div>
                </div>
            ) }
        </div>
    )
}