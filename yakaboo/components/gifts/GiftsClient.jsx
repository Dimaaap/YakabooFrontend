"use client"

import { useState, useEffect } from "react";
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { SliderBtn } from "../shared/SliderBtn";
import { SliderCategories } from "../shared";
import { GiftsContainer } from "./GiftsContainer";

export const GiftsClient = () => {
    const [giftCategories, setGiftCategories] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    
    const VISIBLE_COUNT = 7;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0))
    }

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, giftCategories.length - VISIBLE_COUNT))
    }

    useEffect(() => {
        fetchData(Endpoints.ALL_GIFT_CATEGORIES, setGiftCategories)
    }, [])

    return (
        <div className="hobby-container extended-container">
            { startIndex > 0 && (
                <SliderBtn prevBtn={ true } onClickHandler={ handlePrev } />
            ) }
            <SliderCategories giftCategories={ giftCategories } startIndex={ startIndex } />
            { startIndex + VISIBLE_COUNT < giftCategories.length && (
                <SliderBtn onClickHandler={ handleNext } />
            ) }
            <GiftsContainer />
        </div>
    )

}