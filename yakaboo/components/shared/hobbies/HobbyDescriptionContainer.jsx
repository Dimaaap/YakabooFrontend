"use client"

import Image from 'next/image'
import { useHobbyDescriptionStore, setShowAll } from '../../../states/hobbies/HobbyDescriptionStore'

export const HobbyDescriptionContainer = ({ hobby }) => {

    const { firstParagraph, showAll, isSingle } = useHobbyDescriptionStore()
    
    return (
        <div className="book-container__block-container hobby-page__block-container">
            <h3 className="book-container__header hobby-page__header">
                Опис товару
            </h3>
            <div 
                className="book-container__text hobby-page__text"
                dangerouslySetInnerHTML={{__html: showAll ? hobby.description : firstParagraph}} 
            />
            { !isSingle && (
                !showAll ? (
                    <button
                    onClick={() => setShowAll(true)}
                    className="hobby-page__show-more"
                    >
                        Показати все
                        <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                    </button>
                ) : (
                    <button 
                    onClick={() => setShowAll(false)}
                    className="hobby-page__show-more">
                        Показати менше
                        <Image src="/icons/chevron-down.svg" alt="" width="18" height="18"
                        className="rotated" />
                    </button>
                )
            ) }
        </div>  
    )
}