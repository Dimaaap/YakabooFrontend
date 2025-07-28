"use client"

import React, { useState } from "react";

import Image from 'next/image'
import Link from 'next/link'

export const BookCharacteristics = ({ book }) => {

    const [showAllInfo, setShowAllInfo] = useState(false);

    return (
        <div className="book-container__block-container">
            <h2 className="book-container__header">
                Характеристики
            </h2>
            <div className="book-container__table-info">
                <div className="book-container__row">
                    <div className="book-container__cell cell-title">
                        <p>Автор</p>
                    </div>
                     <div className="book-container__cell">
                        <Link className="book-container__link author-link" href={`/author/view/${book.authors[0]?.slug}`}>
                            {book.authors[0]?.first_name} {book.authors[0]?.last_name}
                        </Link>
                    </div>
                </div>

                <div className="book-container__row">
                    <div className="book-container__cell cell-title">
                        <p>Видавництво</p>
                    </div>
                    <div className="book-container__cell">
                        <Link className="book-container__link publishing-link" href={`/book_publisher/view/${book.publishing.slug}`}>
                            {book.publishing.title}
                        </Link>
                    </div>
                </div>

                <div className="book-container__row">
                    <div className="book-container__cell cell-title">
                        <p>Кількість сторінок</p>
                    </div>
                    <div className="book-container__cell">
                        <p>{ book.book_info.pages_count }</p>
                    </div>
                </div>

                { !showAllInfo && (
                    <button className="book-container__show-all btn" type="button"
                    onClick={() => setShowAllInfo(true)}>
                        Показати все 
                        <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                    </button>    
                ) }
                { showAllInfo && (
                    <>
                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Рік видання</p>
                            </div>
                            <div className="book-container__cell">
                                <p>{ book.book_info.publishing_year }</p>
                            </div>
                        </div>

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Мова</p>
                            </div>
                            <div className="book-container__cell">
                                <p>{ book.book_info.language}</p>
                            </div>
                        </div>

                        {book.literature_period && (
                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Література за періодами</p>
                                </div>
                                <div className="book-container__cell">
                                    <Link href={`/literature-periods/view/${book.literature_period.slug}`}
                                    className="book-container__link publishing-link">
                                        {book.literature_period.title}
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Ілюстрації</p>
                            </div>
                            <div className="book-container__cell">
                                <p>{ book.book_info.illustrations || "Немає ілюстрацій"}</p>
                            </div>
                        </div>

                        { book.translators.length > 0 && (
                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Перекладачі</p>
                                </div>
                                <div className="book-container__cell flex-cell">   
                                    {book.translators.map((translator, index) => (
                                        <React.Fragment key={ index }>
                                            <Link href={`/book_translator/view/${translator.slug}`} 
                                            className="book-container__link publishing-link">
                                                {`${translator.first_name} ${translator.last_name}`}
                                            </Link>    
                                            { index < book.translators.length - 1 && ", " }
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ) }

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Тип</p>
                            </div>
                            <div className="book-container__cell">
                            <p>{ book.book_info.format}</p>
                            </div>
                        </div>

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Тип обкладинки</p>
                            </div>
                            <div className="book-container__cell">
                            <p>{ book.book_info.cover_type}</p>
                            </div>
                        </div>

                        { book.book_info.weight && book.book_info.weight > 0 && (
                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Вага</p>
                                </div>
                                <div className="book-container__cell">
                                    <p>{ book.book_info.weight }</p>
                                </div>
                            </div>    
                        ) }
                            
                        { book.book_info.original_name && (
                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Оригінальна назва</p>
                                </div>
                                <div className="book-container__cell">
                                    <p>{ book.book_info.original_name }</p>
                                </div>
                            </div>
                        ) }

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>ISBN</p>
                            </div>
                            <div className="book-container__cell">
                            <p>{ book.book_info.ISBN}</p>
                            </div>
                        </div>

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Код</p>
                            </div>
                            <div className="book-container__cell">
                            <p>{ book.book_info.code}</p>
                            </div>
                        </div>
                        <button className="book-container__show-all btn"
                        type="button" onClick={() => setShowAllInfo(false)}>
                            Сховати
                            <Image src="/icons/chevron-down.svg"
                            className="book-container__rotated-img"
                            alt="" width="18" height="18" />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}