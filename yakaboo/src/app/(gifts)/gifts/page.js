"use client"

import { useEffect, useState } from "react";
import { fetchData } from "../../../../services";
import Endpoints from "../../../../endpoints";
import Link from "next/link";
import Image from "next/image";
import { SliderBtn } from "../../../../components/shared/SliderBtn";
import { CardsContainer, Filters, HobbiesContainer } from "../../../../components";

export default function GiftPage() {
    const [gifts, setGifts] = useState([])
    const [giftCategories, setGiftCategories] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    
    const VISIBLE_COUNT = 7;
    const ITEM_WIDTH = 230;

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
            <div className="hobby-categories__container extended-container__viewport">
                <div className="extended-container__track" style={{ 
                    transform: `translateX(-${startIndex * ITEM_WIDTH}px)` 
                    }}>
                    { giftCategories.length > 0 && (
                        giftCategories.map((category, index) => (
                            <Link className="hobby-categories__category extended-container__item"
                            href={`/gifts/category/${category.slug}`}
                            key={ index }>
                                <div className="hobby-categories__image-container">
                                    { category?.images_src?.length > 0 && (
                                        category.images_src.map((image, i) => (
                                            <Image src={ image } key={ i } alt={ `${category.title}_${i}` } 
                                            width="80" height="80" className="hobby-categories__image" />
                                        ))
                                    ) }
                                </div>
                                <p className="hobby-categories__title">
                                    { category.title }
                                </p>
                            </Link>
                        ))
                    ) }
                </div>
            </div>
            { startIndex + VISIBLE_COUNT < giftCategories.length && (
                <SliderBtn onClickHandler={ handleNext } />
            ) }

            <div className="hobby-container__main-content">
                <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false }
                needAuthors={ false } needCategories={ false } needGiftBrands={ true }  />
                { gifts.length > 0 && (
                    <CardsContainer booksList={ gifts } isGifts={ true } />
                ) }
            </div>
        </div>
    )
}