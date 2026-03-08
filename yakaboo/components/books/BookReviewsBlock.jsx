"use client";

import { forwardRef } from "react";
import { useAddReviewModalStore } from "../../states";

export const BookReviewsBlock = forwardRef(({}, ref) => {
    const { isAddReviewModalOpen, setIsAddReviewModalOpen } = useAddReviewModalStore();

    const handleOpenModal = (ref) => {
        if(isAddReviewModalOpen){
            setIsAddReviewModalOpen(false)
        } else {
            setIsAddReviewModalOpen(true)
        }
    }
    
    return(
        <div className="book-container__block-container" ref={ ref }>
            <div className="book-container__reviews">
                <h3 className="book-container__header h3-header">
                    Відгуки
                </h3>

                <button className="book-container__write-review write-review book-container__btn"
                onClick={() => handleOpenModal()}>
                    Залишити відгук
                </button>
            </div>
        </div>    
    )
    
})