"use client";

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { ProductCard, Stars, Badge, TopBadge } from '.'
import { wordDeclension } from '../../services/word-declension.service'
import { badgeColors, ImagesLinks } from '../../site.config';

export const CardsContainer = ({booksList, isHobbies=false, isAccessories=false, isNotebooks=false, isGifts=false, giftsBrand=null}) => {

    const searchParams = useSearchParams();

    const filters = useMemo(() => {
        const getArray = (name) => {
            const value = searchParams.get(name)
            return value ? value.split(',') : []
        }

        return {
            categories: getArray("categories"),
            brands: getArray("brands"),
            publishers: getArray("publishers"),
            languages: getArray("languages"),
            bookTypes: getArray("book_types"),
            authors: getArray("authors"),
            themes: getArray("themes"),
            filters: getArray("filters"),
            ages: getArray("ages"),
            accessoriesBrands: getArray("accessories_brands"),
            difficultyLevels: getArray("difficulty_level").map(Number),
            inStockOnly: searchParams.get("in_stock") === "true",
            priceFrom: searchParams.get("price_min") || "",
            priceTo: searchParams.get("price_max") || ""
        }
    }, [searchParams.toString()])

    const filterBooks = useMemo(() => {
        console.log(booksList)
        return booksList?.filter(book => {
            if(filters.categories.length && !filters.categories.includes(book.category_slug)) return false 
            if(filters.brands.length && !filters.brands.includes(book?.brand?.title)) return false 
            if(filters.publishers.length && !filters.publishers.includes(book?.publishing?.title)) return false 
            if(filters.languages.length && !filters.languages.includes(book?.book_info?.languages)) return false 
            if(filters.bookTypes.length && !filters.bookTypes.includes(book?.book_info?.format)) return false 
            if(filters.themes.length && !filters.themes.includes(book?.theme)) return false
            if(filters.accessoriesBrands.length && !filters.accessoriesBrands.includes(book?.brand?.title)) return false
            if(filters.ages.length && !book?.ages.some(a => filters.ages.includes(a.age))) return false
            if(filters.difficultyLevels.length && !filters.difficultyLevels.includes(Number(book?.difficulty_level))) return false 
            if(filters.inStockOnly && !(book?.book_info?.in_stock || book.is_in_stock || book?.gift_info?.in_stock)) return false
            if(filters.priceFrom && book.price < Number(filters.priceFrom)) return false
            if(filters.priceTo && book.price > Number(filters.priceTo)) return false
            return true
        })
    }, [booksList, filters])

    const returnLink = (slug) => {
        if(isAccessories) {
            return `/knyzhkovi-aksesuary/${slug}`
        } else if(isHobbies){
            return `/hobby/${slug}`
        } else if(isNotebooks){
            return `/notes/${slug}`
        } else if(isGifts){
            return `/gifts/${slug}`
        } 
        else {
            return `/book/${slug}`
        }
    }

    return (
        <div className="author-books">
            <div className="author-books__header">
                <h5 className="author-books__count">{`${ filterBooks?.length } ${wordDeclension(filterBooks?.length)}`}</h5>
                <span className="author-books__select">
                    За популярністю 
                    <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
                </span>
            </div>
            <div className="author-books__books-container">
                {filterBooks && filterBooks.map((book, index) => (
                    <ProductCard 
                    key={ index } 
                    productLink={ returnLink(book.slug) }
                    extraClass="author-books__book" 
                    title={ book?.title } 
                    brand={ book?.publishing?.title || book?.brand?.title || giftsBrand}
                    imageSrc={ book.images[0]?.image_url ?? ImagesLinks.DEFAULT_IMAGE }
                    badges={
                        [
                            book.stars ? <Stars count={ book.stars } isSmaller={ true } />: <></>,
                            (book?.is_top || book.is_in_top) && (<TopBadge />),
                            book.is_new && (<Badge text="Новинка" backgroundColor={ badgeColors.green } /> ),
                            book?.book_info?.is_has_cashback && (<Badge text="Кешбек" backgroundColor={ badgeColors.blue }/>)    
                        ]
                    }
                    productCode={book?.book_info?.code || book.code || book?.gift_info?.code}
                    oldPrice={ book.price }
                    inStock={book?.book_info?.in_stock || book.is_in_stock || book?.gift_info?.in_stock || false}
                    bonusesCount={book?.book_info?.bonuses || book.bonuses}
                />
                ))}
            </div>
        </div>
    )
}