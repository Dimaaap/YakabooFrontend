import React from 'react'
import Image from 'next/image'
import { FilterForm } from '../shared'

export const BoardGamesFilters = () => {
  return (
    <div className="filters games-filters">

        <FilterForm 
        fields={["Знижка", "Хіти продажу", "Національний кешбек", "Зимова єПідтримка", 
        "єКнига"
        ]}
        formTitle="Фільтри"
        />

        <FilterForm 
        fields={["Підліткам", "Від 9 до 12 років", "Від 6 до 8 років", "Від 3 до 5 років", 
        "Батькам", "До 2-х років"
        ]}
        formTitle="Вік"
        />

        <form className="filters__form">
                <p className="filters__form-title">
                    Бренд
                </p>
                <div className="filters__search-container">
                    <input type="text" className="filters__search" 
                    placeholder="Пошук бренду"/> 
                    <Image src="/icons/search.svg" alt="" width="17" height="17" />   
                </div>
                
                <div className="filters__form-field">
                    <label className="filters__form-label custom-checkbox">
                    <input type="checkbox" className="filters__form-checkbox" />
                    <span className="filters__form-custom-box"></span>
                        Winning Moves
                    </label>
                </div>
                <div className="filters__form-field">
                    <label className="filters__form-label custom-checkbox">
                    <input type="checkbox" className="filters__form-checkbox" />
                    <span className="filters__form-custom-box"></span>
                        Djeco
                    </label>
                </div>
                <div className="filters__form-field">
                    <label className="filters__form-label custom-checkbox">
                    <input type="checkbox" className="filters__form-checkbox" />
                    <span className="filters__form-custom-box"></span>
                        Ravensburger
                    </label>
                </div>
                <div className="filters__form-field">
                    <label className="filters__form-label custom-checkbox">
                    <input type="checkbox" className="filters__form-checkbox" />
                    <span className="filters__form-custom-box"></span>
                        Strateg
                    </label>
                </div>
                <div className="filters__form-field">
                    <label className="filters__form-label custom-checkbox">
                    <input type="checkbox" className="filters__form-checkbox" />
                    <span className="filters__form-custom-box"></span>
                        Energy Plus
                    </label>
                </div>
                <button className="filters__show-all">
                    Показати всі 
                <Image src="/icons/arrow-left.svg" alt="" 
                width="15" height="15" />
            </button>
        </form>

        <FilterForm 
        fields={["Waddingtons No.1", "Чарівний світ", "MemoBox", "Top Trump Quiz", "FunBox",
        "Guess Who", "National Geographic dinosaur 3D puzzle", "Create & Play", "Розумні ігри", 
        "Одягалка Fashion Look", "TV Series Classic Board Game", "Розкажи історію", "Hello Kitty",
        "Warhammer 40,000", "3D Animals", "Monopoly", "Game of Thrones"
        ]}
        formTitle="Серія іграшок"
        isScroll={ true }
        /> 

        <FilterForm 
        fields={["Українська", "Російська", "Англійська", "Французька", "Німецька", 
        "Чеська", "Словацька", "Іспанська", "Румунська", "Польська", "Угорська"]}
        formTitle="Мова"
        isScroll={ true }
        />

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
