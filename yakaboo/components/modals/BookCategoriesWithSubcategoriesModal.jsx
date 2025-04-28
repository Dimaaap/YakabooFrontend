"use client";

import React, { useState, useEffect } from 'react';
import { useBookCategoriesModalStore } from '../../states';
import { fetchData } from '../../utils';
import Endpoints from '../../endpoints';
import Image from 'next/image';
import Link from 'next/link';

export const BookCategoriesWithSubcategoriesModal = () => {

    const { isCategoriesModalOpen, setIsCategoriesModalOpen } = useBookCategoriesModalStore();
    
    const [categories, setCategories] = useState([])
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetchData(Endpoints.ALL_BOOK_CATEGORIES, setCategories, "book_categories");
    }, [])

    useEffect(() => {
        if(isCategoriesModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return(() => {
            document.body.style.overflow = ""
        })
    }, [isCategoriesModalOpen])


    useEffect(() => {
        if(hoveredCategory){
            fetchData(`http://localhost:8003/categories/${hoveredCategory.id}/subcategories`, 
                setSubcategories, 
                `category_${hoveredCategory.id}_subcategories`)
        } else {
            setSubcategories([])
        }
    }, [hoveredCategory])


    const handleBackdropClick = e => {
        if(e.target === e.currentTarget){
            setIsCategoriesModalOpen(false);
        }
    }


  return (
    isCategoriesModalOpen && (
        <div className="menu categories" onClick={ handleBackdropClick }>
            { console.log(hoveredCategory) }
            <div className={`menu__content categories__content`}>
                <div className="categories__modal left-modal">
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
                                <Link href={ category.slug } key={ category.id }
                                className="categories__list-link"
                                onMouseEnter={() => setHoveredCategory(category)}
                                onMouseLeave={() => setHoveredCategory(null)}>
                                    <li className="categories__item">
                                        { category.title }
                                    </li>
                                    {i !== 1 ? <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />: <></>}
                                </Link>
                            ))
                        ) : <></> }
                    </ul>   
                </div>
                
                <div className={`categories__modal right-modal ${!hoveredCategory ? "hidden" : ""}`}>
                    { subcategories.length > 0 && (
                        <ul className="subcategories__list">
                            <li className="subcategories__point main-point">
                                <Link href="#" className="subcategories__point-link">
                                    Дивитись всі
                                </Link>
                            </li>
                            { subcategories.map((subcategory) => (
                                <li className="subcategories__point" key={ subcategory.id }>
                                    <Link href={ subcategory.slug } className="subcategories__point-link">
                                        { subcategory.title }
                                    </Link>
                                </li>
                            )) }
                        </ul>
                    ) }
                </div>
            </div>
        </div>
    )
  )
}

