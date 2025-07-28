import Image from 'next/image'

import { ProductCard, Stars, Badge } from '.'

export const CardsContainer = ({booksList}) => {
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
                {booksList.map((book, index) => (
                    <ProductCard key={ index } productLink={`/book/${book.slug}`}
                    extraClass="author-books__book" 
                    title={ book.title } brand={ book.publishing.title }
                    imageSrc={book.images[0]?.image_url ?? "/images/holli.jpg"}
                    badges={
                        [
                            book.stars > 0 && (<Stars count={ book.stars } isSmaller={ true } />),
                            book.is_top && (<Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />),
                            book.book_info.is_has_cashback && (<Badge text="Кешбек" backgroundColor="rgb(51, 51, 119)"/>)    
                        ]
                    }
                    productCode={book.book_info.code}
                    oldPrice={ book.price }
                    inStock={book.book_info.in_stock}
                    bonusesCount={book.book_info.bonuses}
                />
                ))}
            </div>
        </div>
    )
}