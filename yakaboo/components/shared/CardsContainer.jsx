"use client";

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef } from 'react'

import { ProductCard, Stars, Badge, TopBadge, CommentsCount } from '.'
import { wordDeclension } from '../../services/word-declension.service'
import { badgeColors, bookTypesFields, filtersFields, ImagesLinks, STALE_TIME } from '../../site.config';
import { useCurrentSortingOrderStore, useSortingOrderStore } from '../../states';
import { SortingOrdersModal } from '../modals/SortingOrdersModal';
import { SORTING_ORDERS } from '../../utils';
import { getDiscount } from '../../services/discount.service';
import { removeFilter, resetFilters, toQueryString, useFilterStore } from '../../states/FilterState';
import Endpoints from '../../endpoints';
import { useInfiniteQuery } from '@tanstack/react-query';

export const CardsContainer = ({
    source,
    categoryTitle, 
    isHobbies=false, 
    isAccessories=false, 
    isNotebooks=false, 
    isGifts=false, 
    giftsBrand=null}) => {

    const searchParams = useSearchParams();
    const selectRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    let labelForPrice = false

    const { isSortingModalOpen, setIsSortingModalOpen } = useSortingOrderStore();
    const { currentSortingOrder } = useCurrentSortingOrderStore();
    const { selectedFilters } = useFilterStore();

    const LIMIT = 100;

    const getEndpoint = () => {
        switch(source.type){
            case "all":
                return Endpoints.ALL_BOOKS
            case "category":
                return Endpoints.CATEGORY_BOOKS_BY_SLUG(source?.slug)
            case "subcategory":
                return Endpoints.SUBCATEGORY_BOOKS(source?.slug)
            case "double_subcategory":
                return Endpoints.DOUBLE_SUBCATEGORY_BOOK(source?.slug)
            case "author":
                return Endpoints.AUTHOR_BOOKS(source.id)
            case "series":
                return Endpoints.ALL_SERIA_BOOKS(source.slug)
            case "publishing":
                return Endpoints.ALL_PUBLISHING_BOOKS(source.id)
            case "translator":
                return Endpoints.TRANSLATOR_BOOKS(source?.id);
            case "illustrator":
                return Endpoints.ILLUSTRATOR_BOOK(source?.id);
        }
    }

    const queryString = searchParams.toString();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["books", source, queryString],
        queryFn: async({ pageParam=0 }) => {
            const res = await fetch(`${getEndpoint()}?limit=${LIMIT}&offset=${pageParam}&${queryString}`)
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            lastPage.has_more ? lastPage.offset + lastPage.limit : undefined
        },
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    const booksList = data?.pages.flatMap(p => p.results) ?? [];
    const books = booksList
    const total = data?.pages[0]?.count ?? 0;

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    };

    const sortingOrder = searchParams.get("sorting_order") || SORTING_ORDERS[0].label;

    const sortedBooks = useMemo(() => {

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
    }, [books, sortingOrder])


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
        return `${book?.authors[0]?.first_name} ${book?.authors[0]?.last_name}`;
    }
    
    const toggleSortingOrderModal = () => {
        if(isSortingModalOpen){
            setIsSortingModalOpen(false)
        } else {
            setIsSortingModalOpen(true)
        }
    }

    const handleResetFilters = () => {
        resetFilters();
        router.replace(pathname)
    }

    const getFilterLabel = (key, selectedFilters) => {
        let filterLabel = null;
        
        if(key.key === "filters") {
            const found = filtersFields.find(val => val.value === key.value);
            filterLabel = found?.label;
        } else if(key.key === "bookTypes"){
            const found = bookTypesFields.find(val => val === key.value);
            filterLabel = found;
        } else if(key.key === "inStockOnly"){
            filterLabel = "В наявності"
        } else if( key.key === "priceFrom" || key.key === "priceTo"){
            filterLabel = `${selectedFilters.find(item => item.key === "priceFrom")?.value || 0} грн - 
            ${selectedFilters.find(item => item.key === "priceTo")?.value || 3000} грн`
        } else {
            filterLabel = key.value;
        }

        return filterLabel
    }

    return (
        <div className="author-books">
            { isSortingModalOpen && <SortingOrdersModal /> }
            { selectedFilters.length > 0 && (
                <div className="author-books__filters">
                    { selectedFilters.map((key, index) => {
                        let filterLabel = null;
                        if(labelForPrice && (key.key === "priceFrom" || key.key === "priceTo")){
                            console.log("here")
                            return null
                        } else if(!labelForPrice && (key.key == "priceFrom" || key.key == "priceTo")){
                            filterLabel = getFilterLabel(key, selectedFilters)
                            console.log("here")
                            labelForPrice = true;
                        } else {
                            filterLabel = getFilterLabel(key, selectedFilters)
                        }
                        return <span className="author-books__filters-filter" key={ index }>
                            { filterLabel }
                            <Image src="/icons/close.svg" alt="" width="14" height="14" onClick={() => {
                                removeFilter(key);
                                router.replace(`${pathname}?${toQueryString()}`)
                            }} />
                        </span>
                    }) }
                    <button className="author-books__filters-clear-all" onClick={handleResetFilters}>
                        Очистити все
                    </button>
                </div>
            ) }
            <div className="author-books__header">
                <div className="author-books__header-text" onClick={() => setIsSortingModalOpen(false)}>
                    <h5 className="author-books__category">
                        { categoryTitle }
                    </h5>
                    <span className="author-books__book-count" ref={ selectRef }>
                        {`${total} ${wordDeclension(total)}`}
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
                    productLink={ returnLink(book?.slug) }
                    extraClass="author-books__book" 
                    title={ book?.title } 
                    brand={ getBookAuthor(book) || book?.publishing?.title || book?.brand?.title || giftsBrand}
                    imageSrc={ book?.images[0]?.image_url ?? ImagesLinks.DEFAULT_IMAGE }
                    badges={
                        [
                            book?.stars ? <Stars count={ book.stars } isSmaller={ true } />: <></>,
                            book?.reviews?.length > 0 ? <CommentsCount count={ book.reviews.length } /> : <CommentsCount count={0} />, 
                            (book?.is_top || book?.is_in_top) && (<TopBadge />),
                            book?.is_new && (<Badge text="Новинка" backgroundColor={ badgeColors.green } /> ),   
                        ]
                    }
                    productCode={book?.book_info?.code || book?.code || book?.gift_info?.code}
                    oldPrice={ book?.price }
                    newPrice={ book?.is_promo ? book?.promo_price : null }
                    inStock={book?.book_info?.in_stock || book?.is_in_stock || book?.gift_info?.in_stock || false}
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