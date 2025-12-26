"use client";

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useMemo, useRef, useEffect } from 'react'

import { ProductCard, Stars, Badge, TopBadge, CommentsCount } from '.'
import { wordDeclension } from '../../services/word-declension.service'
import { badgeColors, ImagesLinks } from '../../site.config';
import { useCurrentSortingOrderStore, useSortingOrderStore } from '../../states';
import { SortingOrdersModal } from '../modals/SortingOrdersModal';
import { SORTING_ORDERS } from '../../utils';
import { getDiscount } from '../../services/discount.service';

export const CardsContainer = ({booksList, categoryTitle, 
    isHobbies=false, isAccessories=false, isNotebooks=false, isGifts=false, giftsBrand=null}) => {

    const searchParams = useSearchParams();
    const selectRef = useRef(null);

    const { isSortingModalOpen, setIsSortingModalOpen } = useSortingOrderStore();
    const { currentSortingOrder } = useCurrentSortingOrderStore();

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
            bookTypes: getArray("bookTypes"),
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
        return booksList?.filter(book => {
            if(filters.categories.length && !filters.categories.includes(book.category_slug)) return false 
            if(filters.brands.length && !filters.brands.includes(book?.brand?.title)) return false 
            if(filters.publishers.length && !filters.publishers.includes(book?.publishing?.title)) return false 
            if(filters.languages.length && !filters.languages.includes(book?.book_info?.language)) return false 
            if(filters.bookTypes.length && !filters.bookTypes.includes(book?.book_info?.format)) return false 
            if(filters.themes.length && !filters.themes.includes(book?.theme)) return false
            if(filters.accessoriesBrands.length && !filters.accessoriesBrands.includes(book?.brand?.title)) return false
            if(filters.ages.length && !book?.ages.some(a => filters.ages.includes(a.age))) return false
            if(filters.difficultyLevels.length && !filters.difficultyLevels.includes(Number(book?.difficulty_level))) return false 
            if(filters.inStockOnly && !(book?.book_info?.in_stock || book.is_in_stock || book?.gift_info?.in_stock)) return false
            if(filters.priceFrom && book.price < Number(filters.priceFrom)) return false
            if(filters.priceTo && book.price > Number(filters.priceTo)) return false
            if(filters.filters.includes("winter-esupport") && !book?.book_info?.is_has_winter_esupport) return false
            if(filters.filters.includes("ebook") && !book?.book_info?.is_has_esupport) return false
            if(filters.filters.includes("national-kashback") && !book?.book_info?.is_has_cashback) return false  
            if(filters.filters.includes("promo") && !book?.is_promo) return false
            return true
        })
    }, [booksList, filters])

    const sortingOrder = searchParams.get("sorting_order") || SORTING_ORDERS[0].label;

    const sortedBooks = useMemo(() => {
        if(!filterBooks) return [];

        const books = [...filterBooks];

        switch(sortingOrder) {
            case "cheap":
                return books.sort((a, b) => a.price - b.price);
            case "expensive":
                return books.sort((a, b) => b.price - a.price);
            case "discount":
                return [...books].sort((a, b) => {
                    const discountA = getDiscount(a);
                    const discountB = getDiscount(b);

                    if(discountA === null && discountB === null) return 0;
                    if(discountA === null) return 1;
                    if(discountB === null) return -1;

                    return discountB - discountA;
                })
            case "popular":
            default:
                return books.sort((a, b) => (b.stars || 0) - (a.stars || 0))
        }
    }, [filterBooks, sortingOrder])


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

    const getBookAuthor = (book) => {
        return `${book?.authors[0].first_name} ${book?.authors[0]?.last_name}`;
    }
    
    const toggleSortingOrderModal = () => {
        if(isSortingModalOpen){
            setIsSortingModalOpen(false)
        } else {
            setIsSortingModalOpen(true)
        }
    }

    return (
        <div className="author-books">
            { isSortingModalOpen && <SortingOrdersModal /> }
            <div className="author-books__header">
                
                <div className="author-books__header-text" onClick={() => setIsSortingModalOpen(false)}>
                    <h5 className="author-books__category">
                        { categoryTitle }
                    </h5>
                    <span className="author-books__book-count" ref={ selectRef }>
                        {`${ filterBooks?.length } ${wordDeclension(filterBooks?.length)}`}
                    </span>
                </div>
                
                <span className="author-books__select" onClick={() => toggleSortingOrderModal() }>
                    <Image src="/icons/sort.svg" alt="" width="16" height="16" />
                    { currentSortingOrder }
                </span>
            </div>
            <div className="author-books__books-container" onClick={() => setIsSortingModalOpen(false)}>
                {sortedBooks && sortedBooks.map((book, index) => (
                    <ProductCard 
                    key={ index } 
                    productLink={ returnLink(book.slug) }
                    extraClass="author-books__book" 
                    title={ book?.title } 
                    brand={ getBookAuthor(book) || book?.publishing?.title || book?.brand?.title || giftsBrand}
                    imageSrc={ book.images[0]?.image_url ?? ImagesLinks.DEFAULT_IMAGE }
                    badges={
                        [
                            book.stars ? <Stars count={ book.stars } isSmaller={ true } />: <></>,
                            book?.reviews?.length > 0 ? <CommentsCount count={ book.reviews.length } /> : <CommentsCount count={0} />, 
                            (book?.is_top || book.is_in_top) && (<TopBadge />),
                            book.is_new && (<Badge text="Новинка" backgroundColor={ badgeColors.green } /> ),   
                        ]
                    }
                    productCode={book?.book_info?.code || book.code || book?.gift_info?.code}
                    oldPrice={ book.price }
                    newPrice={ book?.is_promo ? book?.promo_price : null }
                    inStock={book?.book_info?.in_stock || book.is_in_stock || book?.gift_info?.in_stock || false}
                    bonusesCount={book?.book_info?.bonuses || book.bonuses}
                    hasCashback={ book?.book_info?.is_has_cashback }
                    hasWinterSupport={ book?.book_info?.is_has_winter_esupport }
                    hasESupport={ book?.book_info?.is_has_esupport }
                    UKDeliveryTime={ book?.book_info?.uk_delivery_time }
                    deliveryTime={ book?.book_info?.delivery_time }

                />
                ))}
            </div>
        </div>
    )
}