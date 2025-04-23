import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useBookCategoriesModalStore } from '../../states';

export const BookCategoriesModal = () => {

    const { isCategoriesModalOpen, setIsCategoriesModalOpen } = useBookCategoriesModalStore();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget){
            setIsCategoriesModalOpen(false);
        }
    }

  return (
    <div className="menu categories" onClick={handleBackdropClick}>
      <div className={`menu__content categories__content  ${isCategoriesModalOpen ? 'active': ''}`}>
        <div className="menu__header categories__header">
            <div className="categories__row top-row">
                <p className="categories__subtitle">
                    Категорії книг
                </p>    
                <button className="menu__close" type="button" onClick={() => setIsCategoriesModalOpen(false)}>
                    <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
                </button>
            </div>
            <div className="categories__row">
                <button className="categories__category active" type="button">
                    Всі
                </button>
                <button className="categories__category" type="button">
                    Паперові
                </button>
                <button className="categories__category" type="button">
                    Електронні
                </button>
                <button className="categories__category" type="button">
                    Аудіо
                </button>
            </div>
        </div>
        <ul className="categories__list">
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Добірки Yakaboo
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link>  
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Комплекти книжок
                </li>
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Книги іноземними мовами
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Вибір читачів
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Художня література
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Подарункові книжки
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Бізнес, гроші, економіка
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Саморозвиток. Мотивація
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Дитяча література
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Виховання дітей. Книжки для батьків
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 

            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Навчальна література. Педагогіка
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Суспільство. Держава. Філософія
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Історія
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Біографії й мемуари
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link> 
            <Link href="#" className="categories__list-link">
                <li className="categories__item">
                    Здоров'я. Фітнес. Здорове харчування
                </li>
                <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
            </Link>             
        </ul>
        <div className="categories__footer">
            <div className="categories__info">
                <p>
                    Немає потрібної категорії або 
                    жанру? Спроуйте знайти його через 
                    пошук
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}
