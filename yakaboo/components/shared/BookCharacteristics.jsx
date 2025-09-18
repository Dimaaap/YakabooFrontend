"use client"

import React, { useState } from "react";

import Image from 'next/image'
import { Row } from "./Row";
import { baseFields, extraFields } from "../../services/characteristicsMap.service";

export const BookCharacteristics = ({ book, isGift=false }) => {

    const [showAllInfo, setShowAllInfo] = useState(false);

    return (
        <div className="book-container__block-container">
            <h2 className="book-container__header">
                Характеристики
            </h2>
            <div className="book-container__table-info">
                { baseFields.map(({ key, title, show, render }) => 
                    show(book, isGift) ? (
                        <Row key={ key } title={ title }>
                            {render(book, isGift)}
                        </Row>
                    ): null) }
                
                { !showAllInfo && (
                    <button className="book-container__show-all btn" type="button"
                    onClick={() => setShowAllInfo(true)}>
                        Показати все 
                        <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                    </button>    
                ) }
                { showAllInfo && (
                    <>
                        { extraFields.map(({ key, title, show, render }) => 
                            show(book, isGift) ? (
                                <Row key={ key } title={ title }>
                                    { render(book, isGift) }
                                </Row>
                            ) : null) }


                        <button className="book-container__show-all btn"
                        type="button" onClick={() => setShowAllInfo(false)}>
                            Сховати
                            <Image src="/icons/chevron-down.svg"
                            className="book-container__rotated-img"
                            alt="" width="18" height="18" />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}