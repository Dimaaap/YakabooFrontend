"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useBookCategoriesModalStore, useSubcategoriesModalStore } from '../../states';
import { fetchData } from '../../utils';
import Endpoints from '../../endpoints';

export const BookCategoriesModal = () => {

    const { isCategoriesModalOpen, setIsCategoriesModalOpen } = useBookCategoriesModalStore();
    const { setIsSubcategoriesModalOpen, setCurrentCategoryId, 
        setCurrentCategorySlug } = useSubcategoriesModalStore();

    const [categories, setCategories] = useState([]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget){
            setIsCategoriesModalOpen(false);
        }
    }

    const handleShowSubcategoriesModal = (category, modalOpen) => {
        if(modalOpen) {
            setCurrentCategoryId(category.id);
            setCurrentCategorySlug(category.slug);  
        } else {
            setCurrentCategoryId(null);
            setCurrentCategorySlug(null);
        }
        setIsSubcategoriesModalOpen(modalOpen);  
        
    }

    useEffect(() => {
        fetchData(Endpoints.ALL_BOOK_CATEGORIES, setCategories, "book_categories")
    }, [])

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
            { categories.length > 0 ? (
                categories.map((category, i) => (
                    <Link href={ category.slug } className="categories__list-link" key={ i }
                    onMouseEnter={ () => handleShowSubcategoriesModal(category, true) }
                    onMouseLeave={ () => handleShowSubcategoriesModal(category, false) }>
                        <li className="categories__item">
                            { category.title }
                        </li>
                        {i !== 1 ? <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" /> : <></>}
                    </Link>
                ))
            ) : <></> }
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
