"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Badge, Stars, ProductCard } from '../shared';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';

export const AuthorBooks = ({authorId, periodId=null}) => {

    const [authorsBooks, setAuthorBooks] = useState([])

    useEffect(() => {
        fetchData(Endpoints.AUTHOR_BOOKS(authorId), setAuthorBooks)
    }, [])

  return (
    <div className="author-books">
      <div className="author-books__header">
        <h5 className="author-books__count">331 товар</h5>
        <span className="author-books__select">
            За популярністю 
            <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
        </span>
      </div>
      <div className="author-books__books-container">
        { authorsBooks.length > 0 && (
            authorsBooks.map((book, index) => (
                <ProductCard key={ index } productLink={`/book/${book.slug}`} extraClass="author-books__book"
                title={book.title} brand={book.publishing.title} imageSrc={book.images[0]?.image_url ?? "/images/holli.jpg"}
                badges={
                    [
                        book.stars > 0 && (<Stars count={book.stars} isSmaller={true} />),
                        book.is_top && (<Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />),
                        book.book_info.is_has_cashback && (<Badge text="Кешбек" backgroundColor="rgb(51, 51, 119)" />)
                    ]
                }
                productCode={book.book_info.code}
                oldPrice={book.price}  
                inStock={book.book_info.in_stock}
                bonusesCount={book.book_info.bonuses}
                isEbook={ book.book_info.format === "Електронна" }
                />
            )
        )) }
      </div>
      { authorsBooks.length > 15 && (
        <div className="author-books__bottom-section">
            <button className="author-books__show-more" type="button">
                Показати більше товарів
            </button>
            <div className="author-books__section-footer">
                <button className="author-books__pagination-arrow disabled-btn">
                    <Image src="/icons/pagination-left.svg" alt="" width="15" height="15" />
                </button>

                <div className="author-books__page-numbers">
                    <button className="author-books__page-num active" type="button">
                        1
                    </button>
                    <button className="author-books__page-num" type="button">
                        2
                    </button>
                    <button className="author-books__page-num" type="button">
                        3
                    </button>
                    <button className="author-books__page-num" type="button">
                        4
                    </button>
                    <button className="author-books__page-num" type="button">
                        5
                    </button>
                    <button className="author-books__page-num" type="button">
                        6
                    </button>
                    <button className="author-books__page-num" type="button">
                        7
                    </button>
                </div>

                <button className="author-books__pagination-arrow">
                    <Image src="/icons/pagination-right.svg" alt="" width="15" height="15" />
                </button>
            </div>
        </div>  
      ) }
     
    </div>
  )
}
