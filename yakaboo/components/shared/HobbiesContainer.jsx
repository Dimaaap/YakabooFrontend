import Image from 'next/image'
import { ProductCard } from '.'
import { wordDeclension } from '../../services/word-declension.service'


export const HobbiesContainer = ({ hobbiesList }) => {
    return (
        <div className="author-books">
            <div className="author-books__header">
                <div className="author-books__count">
                    { hobbiesList.length } { wordDeclension(hobbiesList.length) }
                </div>
                <span className="author-books__select">
                    За популярністю
                    <Image src="/icons/arrow-left.svg" alt=""
                    width="15" height="15" />
                </span>
            </div>
            <div className="author-books__books-container">
                { hobbiesList.map((hobby, index) => (
                    <ProductCard key={ index } productLink={`/hobby/${hobby.slug}`}
                    extraClass='author-books__book'
                    title={ hobby.title } brand={ hobby.brand.title }
                    imageSrc={hobby.images[0]?.image_url ?? "/images/holli.jpg"}
                    productCode={ hobby.code } oldPrice={ hobby.price }
                    inStock={ hobby.is_in_stock }   
                    bonusesCount={ hobby.bonuses || 0 }
                    />
                )) }
            </div>
        </div>
    )
}