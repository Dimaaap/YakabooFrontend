import Image from 'next/image'
import React from 'react'
import { Badge, CommentsCount, ProductCard, Stars, TopBadge } from '.'

export const SeenBooks = ({ books }) => {
  return (
    <div className="books-container seen-books">
        { console.log(books) }
        <div className="books-container__section seen-books-section">
            <div className="books-container__header seen-books-header">
                <h3 className="books-container__title">
                    Раніше ви дивилися
                </h3>
            </div>
            <div className="books-container__slider seen-books-slider">
                <button className="books-container__btn prev-btn seen-books-btn seen-books-prev" type="btn">
                    <Image src="/icons/arrow-left.svg" alt="prev" width={30} height={30} />
                </button>
                <div className="books-container__slider book-slider seen-books-book-slider">
                    { books.length > 0 && books.map((book, id) => (
                        <ProductCard key={ id } title={ book.book.title } 
                        brand={`${book.book.authors[0]?.first_name} ${book?.book?.authors[0]?.last_name}`} 
                        imageSrc={book?.book?.images[0].image_url} 
                        badges={[book?.book?.stars > 0 && <Stars count={ book?.book?.stars } isSmaller={ true } />, book?.book?.is_in_chart && <TopBadge />, <CommentsCount count={book?.book?.reviews.length} />]}
                        productCode={ book?.book?.book_info.code } productLink={`/book/${book?.book?.slug}`} 
                        oldPrice={book?.book?.price} newPrice={ book?.book?.is_promo ? book?.book?.promo_price : null }
                        inStock={ book?.book?.book_info?.in_stock || book?.book?.is_in_stock || false }
                        hasCashback={ book?.book?.book_info?.is_has_cashback }
                        hasWinterSupport={ book?.book?.book_info?.is_has_winter_esupport }
                        hasESupport={ book?.book?.book_info?.is_has_esupport }
                        deliveryTime={ book?.book?.book_info?.delivery_time }/>
                    )) }
                </div>
                <button className="books-container__btn next-btn seen-books-btn seen-books-next" type="btn">
                    <Image src="/icons/arrow-left.svg" alt="next" width={30} height={30} />
                </button>
            </div>
        </div>
    </div>
  )
}