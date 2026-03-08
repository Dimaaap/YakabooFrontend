import Link from 'next/link'
import React from 'react'

export const BookMainInfo = ({ isGift, book, info }) => {
  return (
     <div className="book-container__blocks"> 
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
  )
}
