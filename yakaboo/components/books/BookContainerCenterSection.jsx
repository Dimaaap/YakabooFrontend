import React, { forwardRef } from 'react'
import { Breadcrumbs, Rate } from '../shared'
import Link from 'next/link'
import { BookAuthorBlock, BookInfoBlock, BookReviewsBlock, OtherBookOptions, OtherSeriaBooks, ReviewsList } from '.'
import { HobbyDescriptionContainer } from '../shared/hobbies/HobbyDescriptionContainer'
import { BookCharacteristics } from '../shared/BookCharacteristics'
import { BookMainInfo } from './BookMainInfo'

export const BookContainerCenterSection = forwardRef(({ breadcrumbLinks, book, isGift }, ref) => {
    
    const info = isGift ? book.gift_info : book.book_info;

    return (
     <div className="book-container__section center-section">
        <Breadcrumbs linksList={ breadcrumbLinks } />
            <div className="book-container__author-block">
                <h3 className="book-container__book-title">
                    <span className="book-container__book-title-template">
                        {book?.book_info?.format === "Електронна" ? "Електронна книга" : "Книга"}
                    </span>
                    { book.title }
                </h3>
                { !isGift && book?.authors.length > 0 && (
                    <div className="book-container__authors-block">
                        {book.authors.map((author, index) => (
                            <span key={ index }>
                                <Link className="book-container__link author-link" href={`/author/view/${author.slug}`}>
                                    {author.first_name} {author.last_name}
                                </Link>       
                                { index < book.authors.length - 1 && ", " }    
                            </span>
                        ))} 
                    </div>
                ) }     
            </div>
            {book?.reviews?.length > 0 && (
                <Rate reviews={ book?.reviews } onClick={() => {
                    if(ref.current){
                        ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                }} />
            )}
            <p className="book-container__code">
                Код товару: {info.code}
            </p>
            <BookInfoBlock book={ book } info={ info } isGift={ isGift } />

            <HobbyDescriptionContainer hobby={ !isGift ? book.book_info : book.gift_info } /> 

            <BookMainInfo book={ book } info={ info } isGift={ isGift } />
            { book?.related_books?.length > 0 && (
                <OtherBookOptions book={ book } />    
            ) }
            <BookCharacteristics book={book} isGift={ isGift } />
                { book?.seria && (
                    <OtherSeriaBooks book={ book } />
                ) }
                
                { !isGift && !book?.is_notebook && book?.authors[0]?.short_description && 
                <BookAuthorBlock book={ book } author={ book.authors[0] } /> }

                <BookReviewsBlock ref={ ref } />

                { book?.reviews?.length > 0 && (
                    <ReviewsList reviews={ book.reviews } />
                ) }
            </div>
  )
})
