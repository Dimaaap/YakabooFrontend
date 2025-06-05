"use client";

import React, { useState, useEffect } from 'react';
import { useBookCategoriesModalStore } from '../../states';
import { fetchData, handleBackdropClick } from '../../services';
import Endpoints from '../../endpoints';
import Image from 'next/image';
import Link from 'next/link';
import { useBlockBodyScroll } from '../../hooks';
import { ModalCloseBtn } from '../shared';

const BookCategoriesWithSubcategoriesModal = () => {

    const { isCategoriesModalOpen, setIsCategoriesModalOpen } = useBookCategoriesModalStore();
    useBlockBodyScroll(isCategoriesModalOpen)
    
    const [categories, setCategories] = useState([])
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [isHovering, setIsHovering] = useState(false);

    const buttons = ["Всі", "Паперові", "Електронні", "Аудіо"]

    useEffect(() => {
        fetchData(Endpoints.ALL_BOOK_CATEGORIES, setCategories, "book_categories");
        console.log(categories)
    }, [])


    useEffect(() => {
        if(hoveredCategory){
            fetchData(`http://localhost:8003/categories/${hoveredCategory.id}/subcategories`, 
                setSubcategories, 
                `category_${hoveredCategory.id}_subcategories`)
        } else {
            setSubcategories([])
        }
    }, [hoveredCategory])


    useEffect(() => {
        if(!isHovering){
            const timeout = setTimeout(() => {
                setHoveredCategory(null);
            }, 100);
            return () => clearTimeout(timeout)
        }
    }, [isHovering])


  return (
    isCategoriesModalOpen && (
        <div className="menu categories" onClick={ e => handleBackdropClick(e, setIsCategoriesModalOpen) }>
            <div className={`menu__content categories__content ${!hoveredCategory ? "hidden-modal": ""}`}>
                <div className={`categories__modal left-modal ${!hoveredCategory ? "hidden-modal__left": ""}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                    <div className="menu__header categories__header"
                    onMouseEnter={() => {
                        setHoveredCategory(null);
                        setIsHovering(false);
                    }}>
                        <div className="categories__row top-row">
                            <p className="categories__subtitle">
                                Категорії книг
                            </p>
                            <ModalCloseBtn clickHandler={() => setIsCategoriesModalOpen(false)} />
                        </div>
                        <div className="categories__row">
                            { buttons.map((btn, index) => (
                                <button key={index} 
                                className={`categories__category ${ index === 0 ? "active": "" }`} 
                                type="button">
                                    { btn }
                                </button>
                            )) }
                        </div>
                    </div> 
                    <ul className="categories__list">
                        { categories.length > 0 ? (
                            categories.map((category, i) => (
                                <Link href={ category.slug } key={ category.id }
                                className="categories__list-link"
                                onMouseEnter={() => {
                                    setHoveredCategory(category);
                                    setIsHovering(true)
                                }}>
                                    <li className="categories__item">
                                        { category.title }
                                    </li>
                                    {i !== 1 ? <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />: <></>}
                                </Link>
                            ))
                        ) : <></> }
                    </ul>   
                </div>
                <div className={`categories__modal right-modal ${!hoveredCategory ? "hidden-modal__right" : ""}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
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


export default BookCategoriesWithSubcategoriesModal