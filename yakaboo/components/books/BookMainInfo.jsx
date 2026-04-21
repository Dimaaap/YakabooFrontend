import Link from 'next/link'
import React from 'react'

export const BookMainInfo = ({ isGift, book, info, isUnderlined=false }) => {
  return (
    <div className={`book-container__all-blocks`}>
        <div className={`book-container__blocks`}> 
            <div className="book-container__block language-block">
                <p className="book-container__block-title">{!isGift ? "Мова книги" : "Мова"}</p>
                    <div className="book-container__tiles-block">
                        <div className={`book-container__tile tile ${info?.language === "Українська" ? "current" : ""}`}>
                            <p className="tile__desc">Українська</p>
                        </div>
                    </div>
            </div>
            {!isGift && (
                <div className="book-container__block publishing-block">
                    <p className="book-container__block-title">Видавництво</p>
                    <div className="book-container__tiles-block">
                        <div className="book-container__tile tile small-tile current">
                            <Link className="book-container__link publishing-link" href={`/book_publisher/view/${book?.publishing?.slug}`}>
                                {book?.publishing?.title}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {!isGift && info?.publishing_year !== 0 && (
                <div className="book-container__block publishing-block">
                    <p className="book-container__block-title">Рік видання</p>
                    <div className="book-container__tiles-block">
                        <div className="book-container__tile tile small-tile current">
                            <p className="tile__desc">{info?.publishing_year}</p>
                        </div>
                    </div>
                </div>
            )}
            {isGift && (
                <Link className="book-container__block publishing-block" href={`/gifts/category/${book?.gift_category?.slug}`}>
                    <p className="book-container__block-title">Категорія</p>
                    <div className="book-container__tiles-block">
                        <div className="book-container__tile tile">
                            <p className="tile__desc">{book?.gift_category?.title}</p>
                        </div>
                    </div>
                </Link>
            )}
        </div>
        { (!!book?.categories || !!book?.subcategories|| !!book?.double_subcategories) && (
                <div className={`book-container__block category-block ${isUnderlined ? "book-container__underlined-container" : ""}`}>
                    <p className="book-container__block-title">Категорії</p>
                    <div className="book-container__tiles-block grid-block">
                        { book?.categories?.map((category, index) => (
                            <Link className="book-container__tile tile small-tile" 
                            href={`/book-categories/${category.slug}` } key={ index }>
                                <p className="tile__desc">{ category.title }</p>
                            </Link>
                        )) }
                        { book?.subcategories?.map((subcategory, index) => (
                            <Link className="book-container__tile tile small-tile" 
                            href={`/book-categories/${subcategory.category.slug}/${subcategory.slug}` } key={ index }>
                                <p className="tile__desc">{ subcategory.title }</p>
                            </Link>
                        )) }

                        { book?.double_subcategories?.map((doubleSubcategory, index) => (
                            <Link className="book-container__tile tile small-tile" 
                            href={`/book-categories/${doubleSubcategory.subcategory.category.slug}/${doubleSubcategory.subcategory.slug}/${doubleSubcategory.slug}`}
                            key={ index }>
                                <p className="tile__desc">{ doubleSubcategory.title }</p>
                            </Link>
                        )) }
                    </div>
                </div>    
            ) }    
    </div>
    
  )
}
