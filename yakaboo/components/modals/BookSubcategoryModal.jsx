import Link from 'next/link'
import React from 'react'

export const BookSubcategoryModal = ({ categoryId, categorySlug }) => {
  return (
    <div className="subcategories">
        <ul className="subcategories__list">
            <li className="subcategories__point main-point">
                <Link href="#" className="subcategories__point-link">
                    Дивитись всі
                </Link>
            </li>
            <li className="subcategories__point">
                <Link href="#" className="subcategories__point-link">
                    Подих весни: душевне читання для гарного настрою
                </Link>
            </li>
            <li className="subcategories__point">
                <Link href="#" className="subcategories__point-link">
                    Вибрана українська класика
                </Link>
            </li>
            <li className="subcategories__point">
                <Link href="#" className="subcategories__point-link">
                    70 мастрідів до Дня детективного роману
                </Link>
            </li>
            <li className="subcategories__point">
                <Link href="#" className="subcategories__point-link">
                    Головні англомовні релізи року
                </Link>
            </li>
            <li className="subcategories__point">
                <Link href="#" className="subcategories__point-link">
                    Хітова манга: класика та бестселери
                </Link>
            </li>
            <li className="subcategories__point">
                <Link href="#" className="subcategories__point-link">
                    Квітневі промінчики: дітям про весну
                </Link>
            </li>
        </ul>
    </div>
  )
}
