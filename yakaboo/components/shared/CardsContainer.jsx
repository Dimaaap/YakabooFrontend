import Image from 'next/image'

import { ProductCard, Stars, Badge } from '.'
import { wordDeclension } from '../../services/word-declension.service'

export const CardsContainer = ({booksList, isHobbies=false}) => {
    return (
        <div className="author-books">
            { console.log(booksList) }
            <div className="author-books__header">
                <h5 className="author-books__count">{`${ booksList.length } ${wordDeclension(booksList.length)}`}</h5>
                <span className="author-books__select">
                    За популярністю 
                    <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
                </span>
            </div>
            <div className="author-books__books-container">
                {booksList && booksList.map((book, index) => (
                    <ProductCard key={ index } productLink={!isHobbies ? `/book/${book.slug}` : `/hobby/${book.slug}`}
                    extraClass="author-books__book" 
                    title={ book?.title } brand={ book?.publishing?.title || book?.brand?.title}
                    imageSrc={book.images[0]?.image_url ?? "/images/holli.jpg"}
                    badges={
                        [
                            book.stars > 0 && (<Stars count={ book.stars } isSmaller={ true } />),
                            book.is_top && (<Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />),
                            book?.book_info?.is_has_cashback && (<Badge text="Кешбек" backgroundColor="rgb(51, 51, 119)"/>)    
                        ]
                    }
                    productCode={book?.book_info?.code || book.code}
                    oldPrice={ book.price }
                    inStock={book?.book_info?.in_stock || book.is_in_stock}
                    bonusesCount={book?.book_info?.bonuses || book.bonuses}
                />
                ))}
            </div>
        </div>
    )
}