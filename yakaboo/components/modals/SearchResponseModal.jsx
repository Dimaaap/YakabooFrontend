import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const SearchResponseModal = ({ searchResponse }) => {
  return (
    <div className="menu response-modal">
       <div className="menu__content response-modal__content">
            <div className="response-modal__row">
                <p className="response-modal__text">
                    Результати пошуку
                </p>
            </div>
            { searchResponse.books.length > 0 && (
                <div className="response-modal__books-container">
                    { searchResponse.books.map((book, id) => (
                        <Link className="response-modal__book-container search-book" key={ id }
                        href={ book.slug }>
                            <div className="search-book__container">

                                <div className="search-book__left-container">
                                    <div className="search-book__image">
                                        <Image src={book.image} alt={`Книга ${book.title}`} width="120" height="150" />    
                                    </div>
                                    
                                    <div className="search-book__info">
                                        <p className="search-book__boosk-title">
                                            { book.titlte }
                                        </p>
                                        <p className="search-book__author">
                                            {`${book.author_first_name} ${book.author_last_name}`}
                                        </p>
                                        <div className="search-book__info-row">
                                            { book.in_stock && (
                                                <h5 className="search-book__price">
                                                    { book.price } грн
                                                </h5>
                                            ) }
                                            <div className="dot-separator"></div>
                                            { book.in_stock ? (
                                                <span className="search-book__stock-author-green">
                                                    <Image src="/icons/green-truck.svg" alt="" width="18" height="18" />
                                                    В наявності
                                                </span>
                                            ) : (
                                                <span className="search-book__stock-author">
                                                    <Image src="/icons/truck.svg" alt="" width="18" height="19" />
                                                    Немає в наявності
                                                </span>
                                            ) }
                                            <div className="dot-separator"></div>
                                            { book.format === "Електронна" && (
                                                <p className="search-book__text">
                                                    { book.format }
                                                </p>
                                            ) }
                                            <div className="dot-separator"></div>

                                            <p className="search-book__text">
                                                Код { book.code }
                                            </p>
                                        </div>    
                                    </div>
                                </div>

                                <div className="search-book__right-container">
                                    <Image src="/icons/chevron-left.svg" alt="" widht="16" height="16" />
                                </div>
                            </div>
                        </Link>
                    )) }
                </div>    
            ) }

            { searchResponse.authors.lenght > 0 && (
                <div className="response-modal__authors-container authors-container">
                    <div className="authors-container__left">
                        <h5 className="authors-container__title">
                            Автори
                        </h5>
                    </div>
                    <div className="authors-container__right">
                        { searchResponse.authors.map((author, index) => (
                            <Link href={ author.slug } className="authors-container__author" key={ index }>
                                { author.first_name } { author.last_name }
                            </Link>
                        )) }
                    </div>
                </div>
            ) }


            { searchResponse.publishers.length > 0 && (
                <div className="response-modal__publishers-container publishers-container">
                    <div className="publishers-container__left">
                        <h5 className="publishers-container__title">
                            Видавництва
                        </h5>
                    </div>
                    <div className="publishers-container__right">
                        { searchResponse.publishers.map((publisher, index) => (
                            <Link href={ publisher.slug } className="publishers-container__block" key={ index }>
                                { publisher?.logo && (
                                    <Image src={ publisher.logo } alt="" widht="16" height="16" className="publishers-container__logo" />
                                ) }
                                <p className="publishers-container__title">
                                    { publisher.title }
                                </p>
                            </Link>
                        )) }
                    </div>
                </div>
            ) }

            { searchResponse.series.length > 0 && (
                <div className="response-modal__series-container series-container">
                    <div className="series-container__left">
                        <h5 className="series-container__title">
                            Серії книг
                        </h5>
                
                    </div>
                </div>
            ) }
        </div> 
    </div>
  )
}