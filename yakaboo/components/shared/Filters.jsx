import Image from 'next/image'
import React from 'react'

export const Filters = () => {
  return (
    <div className="filters">
      <form className="filters__form">
        <p className="filters__form-title">
            Фільтри
        </p>
        <div className="filters__form-field">
            <label className="filters__form-label custom-checkbox">
            <input type="checkbox" className="filters__form-checkbox" />
            <span className="filters__form-custom-box"></span>
                Новинки
            </label>
        </div>
        <div className="filters__form-field">
            <label className="filters__form-label custom-checkbox">
            <input type="checkbox" className="filters__form-checkbox" />
            <span className="filters__form-custom-box"></span>
                Хіти продажу
            </label>
        </div>
        <div className="filters__form-field">
            <label className="filters__form-label custom-checkbox">
            <input type="checkbox" className="filters__form-checkbox" />
            <span className="filters__form-custom-box"></span>
                В очікуванні
            </label>
        </div>
        <div className="filters__form-field">
            <label className="filters__form-label custom-checkbox">
            <input type="checkbox" className="filters__form-checkbox" />
            <span className="filters__form-custom-box"></span>
                Зимова єПідтримка
            </label>
        </div>
        <div className="filters__form-field">
            <label className="filters__form-label custom-checkbox">
            <input type="checkbox" className="filters__form-checkbox" />
            <span className="filters__form-custom-box"></span>
                єКнига
            </label>
        </div>
      </form>

      <form className="filters__form">
        <p className="filters__form-title">
            Категорія
        </p>
        <div className="filters__form-scroll">
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Добірки Yakaboo
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Комплекти книжок
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Книги іноземними мовами
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Вибір читачів
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Художня література
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Бізнес, гроші, економіка
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Саморозвиток. Мотивація
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Дитяча література
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Суспільство. Держава. Філософія
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Історія
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Біографії й мемуари
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Вивчення мов світу
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Комікси і графічні романи
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Кулінарія. Їжа та напої
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Медична література
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Релігії світу
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                    Езотерика і окультизм
                </label>
            </div>
        </div>
      </form>

      <form className="filters__form">
        <p className="filters__form-title">
            Тип книги
        </p>
        <div className="filters__form-field">
        <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Паперова
                </label>
            </div>
        </div>
        <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Електронна
                </label>
            </div>
      </form>

      <form className="filters__form">
        <p className="filters__form-title">
            Наявність
        </p>
        <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Товари в наявності
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Готові до відправки
                </label>
            </div>
      </form>

      <form className="filters__form">
        <p className="filters__form-title">
            Видавництво
        </p>
        <div className="filters__search-container">
            <input type="text" className="filters__search" 
            placeholder="Пошук видавництва"/> 
            <Image src="/icons/search.svg" alt="" width="17" height="17" />   
        </div>
        
        <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Книжковий клуб "Клуб Сімейного Дозвілля"
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Taylor & Francis
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Idea & Design Works
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Hodder
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Orion
                </label>
            </div>
        <button className="filters__show-all">
            Показати всі 
            <Image src="/icons/arrow-left.svg" alt="" 
            width="15" height="15" />
        </button>
      </form>

      <form className="filters__form">
        <p className="filters__form-title">
            Мова
        </p>
        <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Українська
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Англійська
                </label>
            </div>
            <div className="filters__form-field">
                <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                Російська
                </label>
            </div>
      </form>

      <form className="filters__form">
        <p className="filters__form-title">
            Ціна
        </p>
        <div className="filters__field-row">
            <div className="filters__row">
                <span className="filters__price-label">
                    Від
                </span>
                <input type="text" 
                className="filters__price-field" />    
            </div>
            <div className="filters__row">
                <span className="filters__price-label">
                    До
                </span>
                <input type="text" 
                className="filters__price-field" /> 
            </div>
        </div>

        <button className="filters__form-button"
        type="submit" disabled>
            Застосувати
        </button>
      </form>
    </div>
  )
}
