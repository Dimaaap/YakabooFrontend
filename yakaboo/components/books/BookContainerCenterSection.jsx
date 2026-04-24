"use client"

import { forwardRef } from 'react'
import { Breadcrumbs, DeliveryTerms, Rate } from '../shared'
import Link from 'next/link'
import { BookAuthorBlock, BookInfoBlock, BookReviewsBlock, OtherBookOptions, OtherSeriaBooks, ReviewsList } from '.'
import { HobbyDescriptionContainer } from '../shared/hobbies/HobbyDescriptionContainer'
import { BookCharacteristics } from '../shared/BookCharacteristics'
import { BookMainInfo } from './BookMainInfo'
import { Delivery, DeliveryInfoModal, DownloadFile, MobileApp } from '../dynamic'
import { useDeliveryCityStore, useDeliveryModalStore, useSimpleFlashMessage } from '../../states'
import { setFlashMessage, setShowFlashMessage } from '../../states/ShowFlashMessageStore'
import { useSmallScreen } from '../../hooks'

export const BookContainerCenterSection = forwardRef(({ breadcrumbLinks, book, isGift }, ref) => {
    const { setIsSimpleFlashMessage } = useSimpleFlashMessage();
    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();
    

    const smallScreen = useSmallScreen(1441);
    const info = isGift ? book.gift_info : book.book_info;

    const copyBookCodeToClipboard = (bookCode) => {
        
        try {
            navigator.clipboard.writeText(bookCode);
            setFlashMessage(`Код товару "${bookCode}" скопійовано в буфер обміну!`);
            setShowFlashMessage(true)
            setIsSimpleFlashMessage(true);
        } catch {
            return;
        }
    }

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
                Код товару: 
                <span className="book-container__book-code"
                onClick={ () => copyBookCodeToClipboard(info.code) }>
                    {info.code}
                </span>
            </p>    
        ) }

        {!smallScreen && (
            <BookInfoBlock book={ book } isGift={ isGift } withTitle={ true } />    
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
