"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FilterForm } from '../shared'
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';

export const BoardGamesFilters = () => {

    const [boardGameAge, setBoardGameAge] = useState([])
    const [boardGameBrands, setBoardGameBrands] = useState([])
    const [boardGameSeries, setBoardGameSeries] = useState([])
    const [boardGameLanguages, setBoardGameLanguages] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_BOARD_GAME_AGES, setBoardGameAge, "game_ages")
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_BOARD_GAME_BRANDS, setBoardGameBrands, "game_brands")
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_BOARD_GAME_SERIES, setBoardGameSeries, "game_series")
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_BOARD_GAME_LANGUAGES, setBoardGameLanguages, "game_languages")
    }, [])

  return (
    <div className="filters games-filters">
        { console.log(boardGameAge) }

        <FilterForm 
        fields={["Знижка", "Хіти продажу", "Національний кешбек", "Зимова єПідтримка", 
        "єКнига"
        ]}
        formTitle="Фільтри"
        />

        { boardGameAge.length > 0 && <FilterForm 
            fields={ boardGameAge.map(item => item.age) }
            formTitle={"Вік"}
        /> }

        { boardGameBrands.length > 0 && (
            <form className="filters__form">
                <p className="filters__form-title">
                    Бренд
                </p>
                <div className="filters__search-container">
                    <input type="text" className="filters__search" 
                    placeholder="Пошук бренду"/> 
                    <Image src="/icons/search.svg" alt="" width="17" height="17" />   
                </div>

                { boardGameBrands.map((brand, index) => (
                    <div className="filters__form-field" key={ index }>
                        <label className="filters__form-label custom-checkbox">
                            <input type="checkbox" className="filters__form-checkbox" />
                            <span className="filters__form-custom-box"></span>
                            { brand.title }
                        </label>
                    </div>
                )) }
                
                <button className="filters__show-all">
                    Показати всі 
                <Image src="/icons/arrow-left.svg" alt="" 
                width="15" height="15" />
            </button>
        </form>
        ) }

        { boardGameSeries.length > 0 && (
            <FilterForm 
            fields={ boardGameSeries.map(item => item.title) }
            formTitle="Серія іграшок"
            isScroll={ true }
        /> 
        ) }


        { boardGameLanguages.length > 0 && (
            <FilterForm fields={ boardGameLanguages } 
            formTitle="Мова"
            isScroll={ true }
            />
        ) }


        <FilterForm 
        fields={["Товари в наявності", "Готові до відправки"]}
        formTitle="Наявність"
        />

        <FilterForm 
        fields={["Сімейні", "Карткові", "Розвиваючі", "Для вечірки", "Логічні", 
        "Економічні", "На спритність", "Ходилки", "Азартні", "Романтичні", "Рольові", 
        "Для офісу"]}
        formTitle="Тип"
        isScroll={true}
        />


        <FilterForm 
        fields={["Guess Who?", "Cluedo", "Веселі", "Стратегічні", "Навчальні", 
        "Інтелектуальні", "Активні", "Монополія", "Дорожні", "Військові", 
        "Лото", "Доміно", "Дженга"]} 
        formTitle="Вид" 
        isScroll={true} />

        <FilterForm 
        fields={["Для 2-х", "Від 2 до 4", "Від 2 до 5", 
        "Від 1 до 8", "Від 3 до 16", "Від 3 до 12", "Від 4 до 16", 
        "Від 7-ми", "Від 2 до 6", "Від 3 до 8"]} 
        formTitle="Кількість гравців" 
        isScroll={true} />
    </div>
  )
}
