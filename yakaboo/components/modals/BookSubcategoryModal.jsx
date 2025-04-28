"use client";

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { fetchData } from '../../utils';
import { useSubcategoriesModalStore } from '../../states';

export const BookSubcategoryModal = ({ categoryId, categorySlug }) => {

    const [subcategories, setSubcategories] = useState([]);
    const { setIsHoveringSubcategoryModal } = useSubcategoriesModalStore();

    useEffect(() => {
        fetchData(`http://localhost:8003/categories/${categoryId}/subcategories`, 
            setSubcategories, `category_${categoryId}_subcategories`)
    }, [categoryId])
  
    return (
    <div className="subcategories"
    onMouseEnter={() => setIsHoveringSubcategoryModal(true)}
    onMouseLeave={() => setIsHoveringSubcategoryModal(false)}>
        <ul className="subcategories__list">
            <li className="subcategories__point main-point">
                <Link href={ categorySlug } className="subcategories__point-link">
                    Дивитись всі
                </Link>
            </li>
            { subcategories.length > 0 ? (
                subcategories.map((subcategory) => (
                    <li className="subcategories__point" key={subcategory.id}>
                        <Link href={subcategory.slug} className="subcategories__point-link">
                            { subcategory.title }
                        </Link>
                    </li>
                ))
            ) : (<></>)}
        </ul>
    </div>
  )
}
