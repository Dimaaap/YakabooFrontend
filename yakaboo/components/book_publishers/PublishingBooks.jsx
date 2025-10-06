"use client"

import { useEffect, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import { wordDeclension } from "../../services/word-declension.service"
import { Badge, ProductCard, Stars } from "../shared"
import Image from "next/image"

export const PublishingBooks = ({publishingId}) => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_PUBLISHING_BOOKS(publishingId), setBooks)
    }, [])

    return (
        books.length > 0 ? (
        <div className="author-books">
            { console.log(books) }
                <div className="author-books__header">
                    <h5 className="author-books__count">{`${ books.length } ${wordDeclension(books.length)}`}</h5>
                        <span className="author-books__select">
                        За популярністю 
                        <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
                    </span>
                </div>  
                <div className="author-books__books-container">
                    { books.length < 15 && (
                       books.map((book, index) => (
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
                            />
                        ) 
                    )) }
                </div>  
                { books.length >= 15 && (
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
        ) : (<></>)
        
    )

}