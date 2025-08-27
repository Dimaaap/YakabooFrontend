"use client";

import { useState, useEffect } from 'react';

import { fetchData } from '../../../../services';
import Endpoints from '../../../../endpoints';
import { CardsContainer, Filters, HobbyCategories } from '../../../../components';

export default function AccessoriesPage() {

    const [accessories, setAccessories] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_ACCESSORIES, setAccessories);
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_ACCESSORIES_CATEGORIES, setCategories)
    }, [])

    return (
        <div className="hobby-container accessories">
            { console.log(accessories) }
            <h2 className="hobby-container__title accessories__title">Книжкові аксесуари</h2>
            { categories && <HobbyCategories fetchCategories={ categories } /> }

            <div className="hobby-container__main-content">
                <Filters needPublishers={ false } needLanguages={ false } needBookTypes={ false } needAuthors={ false }
                needAge={ false } needCategories={ false } needBrands={ false } needAccessoriesBrands={ true } />
                { accessories.length > 0 && <CardsContainer booksList={ accessories } isAccessories={ true } /> }
            </div>
        </div>
    )
}