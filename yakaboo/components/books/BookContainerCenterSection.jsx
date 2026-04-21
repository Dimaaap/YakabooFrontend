"use client"

import { forwardRef, useEffect, useState } from 'react'
import { Breadcrumbs, DeliveryTerms, Rate } from '../shared'
import Link from 'next/link'
import { BookAuthorBlock, BookInfoBlock, BookReviewsBlock, OtherBookOptions, OtherSeriaBooks, ReviewsList } from '.'
import { HobbyDescriptionContainer } from '../shared/hobbies/HobbyDescriptionContainer'
import { BookCharacteristics } from '../shared/BookCharacteristics'
import { BookMainInfo } from './BookMainInfo'
import { Delivery, DeliveryInfoModal, DownloadFile, MobileApp } from '../dynamic'
import { useDeliveryCityStore, useDeliveryModalStore } from '../../states'

export const BookContainerCenterSection = forwardRef(({ breadcrumbLinks, book, isGift }, ref) => {
    
    const [smallScreen, setSmallScreen] = useState(false)

    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();
    

    const info = isGift ? book.gift_info : book.book_info;

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 1441){
                setSmallScreen(true)
            } else {
                setSmallScreen(false)
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
     <div className="book-container__section center-section">
        { !smallScreen && (
            <Breadcrumbs linksList={ breadcrumbLinks } />    
        ) }

        { !smallScreen && (
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
        ) }

        {book?.reviews?.length > 0 && !smallScreen && (
            <Rate reviews={ book?.reviews } onClick={() => {
                if(ref.current){
                    ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }} />
        )}

        { !smallScreen && (
            <p className="book-container__code">
                Код товару: {info.code}
            </p>    
        ) }

        {!smallScreen && (
            <BookInfoBlock book={ book } isGift={ isGift } withTitle={ false } />    
        )}
        
        <HobbyDescriptionContainer hobby={ !isGift ? book.book_info : book.gift_info } isUnderlined={ smallScreen } /> 
  
        <BookMainInfo book={ book } info={ info } isGift={ isGift }  isUnderlined={ smallScreen } />
            { book?.related_books?.length > 0 && (
                <OtherBookOptions book={ book } />    
            ) }
        <BookCharacteristics book={book} isGift={ isGift } isUnderlined={ smallScreen } />
        { book?.seria && (
            <OtherSeriaBooks book={ book } />
        ) }
                
        { !isGift && !book?.is_notebook && book?.authors[0]?.description && 
        <BookAuthorBlock book={ book } author={ book.authors[0] } smallVersion={ smallScreen } /> }

        { smallScreen && (
            <div className="book-container__delivery-section book-container__underlined-container">
                { info?.format !== "Електронна" ? (<Delivery />) : <MobileApp /> }
                { info?.format === "Електронна" && <DownloadFile />}
                { isDeliveryModalOpen && <DeliveryInfoModal /> }
                { deliveryLocation && <DeliveryTerms deliveryLocation={ deliveryLocation } productCode={ book.code } /> }
            </div>
        ) }

        <BookReviewsBlock ref={ ref } />    
        

        { book?.reviews?.length > 0 && (
            <ReviewsList reviews={ book.reviews } />
        ) }
    </div>
  )
})
