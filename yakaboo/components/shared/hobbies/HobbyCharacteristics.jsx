"use client"

import Image from 'next/image';

import React from "react"

import { useAllCharacteristics, setShowAllCharacteristics } from '../../../states/hobbies/AllCharacteristicsStore';
import { ImagesLinks, HrefsConfig } from '../../../site.config';
import { CharacteristicsRow } from '../CharacteristicsRow';
import { AgesRow } from '../AgesRow';

export const HobbyCharacteristics = ({ hobby }) => {

    const showAllCharacteristics = useAllCharacteristics((state) => state.showAllCharacteristics)

    const baseCharacteristics = [
        ["Бренд", hobby.brand.title, HrefsConfig.childrenBrand(hobby.brand.slug)],
        ["Артикул", hobby.article],
        ["Тематика", hobby?.theme || null],
        ["Кількість елементів", hobby?.details_count || null],
    ]

    const additionalCharacteristics = [
        ["Розмір товару", hobby?.size],
        ["Рівень складності", hobby?.difficulty_level],
        ["Пакування", hobby?.packing],
        ["Колір", hobby?.color],
        ["Тип", hobby?.type],
        ["Код", hobby.code]
    ]

    return (
        <div className="book-container__block-container hobby-page__block-container">
            <h3 className="book-container__header hobby-page__header">
                Характеристики
            </h3>
            <div className="book-container__table-info hobby-page__table-info">

                { baseCharacteristics.map(([title, value, link], index) => 
                    value ? (
                        <CharacteristicsRow key={ index } title={ title } value={ value } link={ link } />
                    ) : null
                ) }

                { !showAllCharacteristics && (
                    <button className="book-container__show-all btn hobby-page__show-all" type="button"
                    onClick={() => setShowAllCharacteristics(true)}>
                        Показати все
                        <Image src={ ImagesLinks.CHEVRON_DOWN } alt="" width="18" height="18" />
                    </button>
                ) }

                { showAllCharacteristics && (
                    <>
                        { additionalCharacteristics.map(([title, value], index) => 
                            value ? <CharacteristicsRow key={ index } title={ title } value={ value } /> : null 
                        )}
                        { hobby.ages?.length > 0 && (
                            <AgesRow hobby={ hobby } />
                        ) }

                        <button className="book-container__show-all btn hobby-page__show-all"
                        type="btn" onClick={() => setShowAllCharacteristics(false)}>
                            Сховати
                            <Image src={ ImagesLinks.CHEVRON_DOWN } 
                            className="book-container__rotated-img"
                            alt="" width="18" height="18"
                            />
                        </button>
                    </>
                ) }
            </div>
        </div>
    )
}