import Image from 'next/image'
import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { AddToCartFlashMessage, BooksSection, CommentsCount, FlashMessage, NewBanners, ProductCard, Stars, TopBadge, TopSalesSection } from '../shared'
import Endpoints from '../../endpoints'
import { STALE_TIME } from '../../site.config'
import { fetcher } from '../../services/fetch.service'
import { getDiscountedBooks } from '../../services'
import { useCartFlashMessageOpenStore, useCartStore } from '../../states'

const BooksContainer = () => {

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: () => fetcher(`${Endpoints.ALL_BOOKS}?limit=500&offset=0`),
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false
  })

  const { cartItems } = useCartStore();
  const { isAddToCartModalOpen } = useCartFlashMessageOpenStore();

  const res = books.results ?? [];

  const TOP_BOOKS = res.filter(book => !!book.is_top);
  const YAKABOO_PUBLISHING_BOOKS = res.filter(book => book.publishing.title === "Yakaboo Publishing") || []
  const ENGLISH_LANGUAGE_BOOKS = res.filter(book => book.book_info?.language === "Англійська") || []
  const DISCOUNTED_BOOKS = getDiscountedBooks(res)

  return (
    <div className="categories">
        { isAddToCartModalOpen && <AddToCartFlashMessage itemsCount={ cartItems.items.length } price={ cartItems.total_price } /> }
        <div className="books-container">

            <TopSalesSection books={ TOP_BOOKS } isLoading={ isLoading } />

            <NewBanners />

            <BooksSection categoryTitle="Yakaboo Publishing" books={ YAKABOO_PUBLISHING_BOOKS } isLoading={ isLoading } />

            <div className="books-container__section">
                <div className="books-container__header">
                    <h3 className="books-container__title">
                        Вас може зацікавити
                    </h3>
                </div>
                <div className="books-container__slider">
                    <button className="books-container__btn prev-btn visually-hidden" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                    <div className="books-container__slider book-slider">
                        <ProductCard title="Стіни в моїй голові. Жити з тривожністю і депресією"
                        brand="Володимир Станчишин" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/s/t/stanchyshyn_-_1500__1.png" 
                        badges={[<CommentsCount count={ 2 } />, <TopBadge />]}
                        productCode="1231" productLink="#" oldPrice={ 295 } bonusesCount={ 148 } inStock={ true } isAudio={ true }/>

                        <ProductCard title="Танець недоумка" brand="Ілларіон Павлюк" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_178_73.jpg"
                        badges={[<CommentsCount count={ 32 } />, <TopBadge />]}
                        productCode="1231" productLink="#" oldPrice={ 270 } bonusesCount={ 135 } inStock={ true } isEbook={ true } />

                        <ProductCard title="Я бачу, вас цікавить пітьма" brand="Ілларіон Павлюк" 
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_67890_1.jpg"
                        badges={[<CommentsCount count={ 116 } />, <TopBadge />]}
                        productCode="1241" productLink="#" oldPrice={ 600 } bonusesCount={ 300 } inStock={ false } 
                        waitSince={"31.12.25"} hasCashback={ true } hasWinterSupport={ true } />

                        <ProductCard title="За маму, за тата" brand="Каріна Саварина"
                        imageSrc="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/z/a/za_mamy_za_tata_new_copy.png"
                        badges={[<CommentsCount count={ 8 } />, <TopBadge />]}
                        productCode="121" productLink='#' oldPrice={ 350 } newPrice={ 323 } bonusesCount={ 162 } inStock={ true } />
                    </div>  
                    <button className="books-container__btn next-btn" type="btn">
                        <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
                    </button>
                </div>
            </div>  

            <BooksSection categoryTitle="Читаємо англійською цієї весни" books={ ENGLISH_LANGUAGE_BOOKS } />

            <BooksSection categoryTitle="Найбільші знижки" books={ DISCOUNTED_BOOKS } />
        </div>
    </div>
  )
}


export default BooksContainer