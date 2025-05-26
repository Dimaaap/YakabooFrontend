import React from 'react'
import Image from 'next/image'

export const BoardGamesFilters = () => {
  return (
    <div className="filters games-filters">
        <form className="filters__form games-filters__form">
            <p className="filters__form-title">
                Фільтри
            </p>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Знижка
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Хіти продажу
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Національний кешбек
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Зимова єПідтримка
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    єКнига
                </label>
            </div>
        </form>

        <form className="filters__form games-filters__form">
            <p className="filters__form-title">
                Вік
            </p>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Підліткам
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                   Від 9 до 12 років
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Від 6 до 8 років
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Від 3 до 5 років
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Батькам
                </label>
            </div>
            <div className="filters__form-field games-filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    До 2-х років
                </label>
            </div>
        </form>

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
    </div>
  )
}
