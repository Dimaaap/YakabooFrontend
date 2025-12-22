"use client";

import { useBlockBodyScroll } from "../../hooks";
import { useAddReviewModalStore } from "../../states";

export const BookReviewsBlock = () => {
    const { isAddReviewModalOpen, setIsAddReviewModalOpen } = useAddReviewModalStore();

    const handleOpenModal = () => {
        if(isAddReviewModalOpen){
            setIsAddReviewModalOpen(false)
        } else {
            setIsAddReviewModalOpen(true)
        }
    }
    
    return(
        <div className="book-container__block-container">
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
    
}