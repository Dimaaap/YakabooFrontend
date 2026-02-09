"use client";

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { ProductCard, Stars, Badge, TopBadge, CommentsCount, ProductCardSkeleton, SortingOrderComponent, Pagination, AuthorsHeader } from '.'
import { badgeColors, ImagesLinks, STALE_TIME } from '../../site.config';
import { useSortingOrderStore } from '../../states';
import { SortingOrdersModal } from '../modals/SortingOrdersModal';
import { getBookAuthor, SORTING_ORDERS } from '../../utils';
import { getDiscount, sortBooks } from '../../services/discount.service';
import { useFilterStore } from '../../states/FilterState';
import Endpoints from '../../endpoints';
import { useQuery } from '@tanstack/react-query';

export const CardsContainer = ({
    source,
    categoryTitle, 
    isHobbies=false, 
    isAccessories=false, 
    isNotebooks=false, 
    isGifts=false, 
    isBoardGames=false,
    giftsBrand=null, 
    booksList=null}) => {

    const searchParams = useSearchParams();

    const LIMIT = 90;
    const page = Number(searchParams.get("page")) || 1;
    const offset = (page - 1) * LIMIT;

    const sortingOrder = searchParams.get("sorting_order") || SORTING_ORDERS[0].label;

    if(booksList?.length > 0){
        return null;
    }

    const { isSortingModalOpen, setIsSortingModalOpen } = useSortingOrderStore();
    const { selectedFilters } = useFilterStore();

    const queryString = searchParams.toString();

    const { data, isLoading } = useQuery({
        queryKey: ["books", source.type, source.slug, source.id, queryString, page],

        queryFn: async() => {
            const res = await fetch(`${getEndpoint(source)}?limit=${LIMIT}&offset=${offset}&${queryString}`)
            
            if (!res.ok) {
                return { count: 0, results: [] };
            }

            return res.json();
        },

        staleTime: STALE_TIME,
        gcTime: STALE_TIME,
        refetchOnWindowFocus: false
    })

    const books = data?.results ?? [];
    const total = data?.count ?? 0;
    const PAGES_COUNT = Math.ceil(total / LIMIT);

    const sortedBooks = useMemo(() => sortBooks(books, sortingOrder), [books, sortingOrder])


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
    const SKELETON_COUNT = 10;

    return (
        <div className="author-books">
            { isSortingModalOpen && <SortingOrdersModal /> }
            { selectedFilters.length > 0 && (
                <SortingOrderComponent />
            ) }
            <AuthorsHeader categoryTitle={ categoryTitle } total={ total } />
           
            <div className="author-books__books-container" onClick={() => setIsSortingModalOpen(false)}>
                { isLoading ? (
                    [...Array(SKELETON_COUNT)].map((_, index) => (
                        <ProductCardSkeleton key={ index } />
                    ))
                ) : (
                    sortedBooks.map((book, index) => (
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
                ))
                ) }
            </div>
            
            { PAGES_COUNT > 1 && (
                <Pagination total={ total } limit={ LIMIT } />   
            ) }
        </div>
    )
}
