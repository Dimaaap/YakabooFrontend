"use client"

import { useState, useEffect } from "react";
import { CardsContainer, Filters } from "../shared";
import Endpoints from "../../endpoints";
import { fetchData } from "../../services";

export const GiftsContainer = () => {
    const [gifts, setGifts] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_GIFTS, setGifts)
    }, [])

    return (
        <div className="hobby-container__main-content">
            <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
            needAuthors={ false } needCategories={ false } needGiftBrands={ true }  />
                { gifts.length > 0 && (
                    <CardsContainer booksList={ gifts } isGifts={ true } />
            ) }
        </div>
    )
}