"use client";

import { useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { getBookAuthor, SORTING_ORDERS } from '../../utils';
import { useSortingOrderStore } from '../../states';
import { useFilterStore } from '../../states/FilterState';
import { sortBooks } from '../../services/discount.service';
import { SortingOrdersModal } from '../modals/SortingOrdersModal';
import { AuthorsHeader, Badge, CommentsCount, Pagination, ProductCard, SortingOrderComponent, Stars, TopBadge } from '.';

export const CardsContainerWithBooksList = ({ booksList, categoryTitle }) => {
    const searchParams = useSearchParams();
    
    const LIMIT = 90;

    const sortingOrder = searchParams.get("sorting_order") || SORTING_ORDERS[0].label;

    if(!booksList || booksList?.length === 0){
        return null;
    }

    const { isSortingModalOpen, setIsSortingModalOpen } = useSortingOrderStore();
    const { selectedFilters } = useFilterStore();

    const PAGES_COUNT = Math.ceil(booksList?.length / LIMIT);

    const sortedBooks = useMemo(() => sortBooks(booksList, sortingOrder), [booksList, sortingOrder])
   
    return (
        <div className="author-books">
            { console.log(booksList) }
            { isSortingModalOpen && <SortingOrdersModal /> }
            { selectedFilters.length > 0 && (
                <SortingOrderComponent />
            ) }

            <AuthorsHeader categoryTitle={ categoryTitle } total={ booksList.length } />

            <div className="author-books__books-container" onClick={() => setIsSortingModalOpen(false)}>
                {sortedBooks.map((book, index) => (
                    <ProductCard
                    key={ index } 
                    productLink={ book?.slug }
                    extraClass="author-books__book" 
                    title={ book?.title } 
                    brand={ `${book.author_first_name} ${book.author_last_name}` }
                    imageSrc={ book.image }
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
                    inStock={ book.in_stock }
                    hasCashback={ book?.is_has_cashback }
                    hasWinterSupport={ book?.is_has_winter_esupport }
                    hasESupport={ book?.is_has_esupport }
                    UKDeliveryTime={ book?.uk_delivery_time }
                    deliveryTime={ book?.delivery_time }
                />
                ))
                }   
            </div>
            { PAGES_COUNT > 1 && (
                <Pagination total={ booksList?.length } limit={ LIMIT } />   
            ) }
        </div>
  )
}
