"use client"

import { useState } from "react";

import Image from "next/image"
import { Breadcrumbs, DeliveryTerms } from "../shared"
import Link from "next/link"
import { Delivery, DeliveryInfoModal } from "../dynamic";
import { useDeliveryCityStore, useDeliveryModalStore } from "../../states";

const MAX_STARS = 5;

export const BookContainer = ({book, breadcrumbLinks}) => {

    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();

    const [showAllInfo, setShowAllInfo] = useState(false);

    const activeStars = Math.round(book.book_info.rate);
    return(
        <div className="book-container">
            <div className="book-container__section left-section">
                <div className="book-container__btns-section">
                    <button className="book-container__header-btn add-to-fav">
                        <svg
                            width="20"
                            height="16"
                            viewBox="0 0 16 14"
                            fill="#333373"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ui-btn-favorite__img"
                        >
                            <path d="M0.595215 4.64648C0.595215 7.78125 3.21729 10.8721 7.31152 13.5088C7.53857 13.6479 7.80957 13.7871 7.99268 13.7871C8.18311 13.7871 8.4541 13.6479 8.67383 13.5088C12.7681 10.8721 15.3901 7.78125 15.3901 4.64648C15.3901 1.9585 13.5371 0.0834961 11.1348 0.0834961C9.74316 0.0834961 8.65186 0.728027 7.99268 1.69482C7.34814 0.735352 6.24951 0.0834961 4.85059 0.0834961C2.45557 0.0834961 0.595215 1.9585 0.595215 4.64648ZM2.07471 4.64648C2.07471 2.78613 3.29053 1.53369 4.93115 1.53369C6.25684 1.53369 6.99658 2.33936 7.45801 3.04248C7.66309 3.33545 7.80225 3.43066 7.99268 3.43066C8.19043 3.43066 8.30762 3.32812 8.52734 3.04248C9.01807 2.34668 9.74316 1.53369 11.0615 1.53369C12.7021 1.53369 13.918 2.78613 13.918 4.64648C13.918 7.23926 11.2153 10.103 8.13184 12.1538C8.06592 12.1978 8.02197 12.2271 7.99268 12.2271C7.96338 12.2271 7.91943 12.1978 7.85352 12.1538C4.77002 10.103 2.07471 7.23926 2.07471 4.64648Z"></path>
                        </svg>
                    </button>
                    <button className="book-container__header-btn read-part">
                        <Image src="/icons/book.svg" alt="" width="25" height="25" />
                        Читати уривок
                    </button>
                </div>

                <div className="book-container__images-carousel">
                    <div className="book-container__main-image">
                        <button className="book-container__slider-btn prev-btn slider-btn">
                            <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                        </button>
                        
                        <Image src={book.images[0]?.image_url ?? "/images/holli.jpg"} width="250" height="350" alt={`${book.title}_1`} />
                        <button className="book-container__slider-btn next-btn slider-btn">
                            <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                        </button>
                    </div>
                    <div className="book-container__rest-images">
                        {book.images.length > 1 && (
                            book.images.map((image, index) => (
                                <Image src={image.image_url} alt={`${book.title}_${index + 2}`} width="50" height="50" key={index} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="book-container__section center-section">
                <Breadcrumbs linksList={ breadcrumbLinks } />
                <div className="book-container__author-block">
                    <h2 className="book-container__book-title">
                        Книга { book.title }
                    </h2>
                    <Link className="book-container__link author-link" href={`/author/view/${book.authors[0]?.slug}`}>
                        {book.authors[0]?.first_name} {book.authors[0]?.last_name}
                    </Link>    
                </div>
                
                {book.book_info.rate && (
                    <div className="book-container__grades">
                        {[...Array(MAX_STARS)].map((_, index) => (
                            <Image 
                            src={index + 1 <= activeStars ? "/icons/active-star.svg" : "/icons/star-inactive.svg"} 
                            alt="" width="12" key={ index }
                            height="12" />
                        ))} 
                        <span className="book-container__grade-count">
                            4
                        </span>
                    </div>     
                )}
                

                <p className="book-container__code">
                    Код товару: {book.book_info.code}
                </p>

                <div className="book-container__block format">
                    <p className="book-container__block-title">
                        Формат
                    </p>    
                    <div className="book-container__tiles-block">
                        <div className={`book-container__tile tile ${book.book_info.format === "Паперова" ? "active": ""}`}>
                            <div className="book-container__tile-header tile__header">
                                <Image src="/icons/book.svg" alt="" width="18" height="18" className={`${book.book_info.format === "Паперова" ? "active-img": ""}`} />
                                <p className="tile__title">
                                    Паперова
                                </p>
                            </div>
                            <h4 className="tile__price">
                                { book.price } грн
                            </h4>
                        </div>

                        <div className={`book-container__tile tile ${book.book_info.format === "Електронна" ? "active": ""}`}>
                            <div className="tile__header">
                                <Image src="/icons/gadget.svg" alt="" width="18" height="18" className={`${book.book_info.format === "Електронна" ? "active-img": ""}`} />
                                <p className="tile__title">
                                    Електронна
                                </p>
                            </div>
                            <h4 className="tile__price">
                                195 грн
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="book-container__blocks">
                    <div className="book-container__block language-block">
                        <p className="book-container__block-title">
                            Мова книги
                        </p>   
                        <div className="book-container__tiles-block">
                            <div className={`book-container__tile tile small-tile ${ book.book_info.language === "Українська" ? "current": "" }`}>
                                <p className="tile__desc">
                                    Українська
                                </p>
                            </div>

                            <div className={`book-container__tile tile small-tile ${ book.book_info.language === "Англійська" ? "current": "" }`}>
                                <p className="tile__desc">
                                    Англійська
                                </p>
                            </div>
                        </div> 
                    </div>

                    <div className="book-container__block publishing-block">
                        <p className="book-container__block-title">
                            Видавництво
                        </p>   
                        <div className="book-container__tiles-block">
                            <div className='book-container__tile tile small-tile current'>
                                <Link className="book-container__link publishing-link" href={`/book_publisher/${book.publishing.slug}`}>
                                    {book.publishing.title}
                                </Link>
                            </div>
                        </div> 
                    </div>
                    
                    {book.book_info.publishing_year && (
                        <div className="book-container__block publishing-block">
                            <p className="book-container__block-title">
                                Рік видання
                            </p>   
                            <div className="book-container__tiles-block">
                                <div className='book-container__tile tile small-tile current'>
                                    <p className="tile__desc">
                                        {book.book_info.publishing_year}
                                    </p>
                                </div>
                            </div> 
                        </div>    
                    )}
                    
                </div>

                { book.book_info.description && (
                    <div className="book-container__block-container">
                        <h3 className="book-container__header">
                            Опис книги
                        </h3>
                        <p className="book-container__text">
                            {book.book_info.description}
                        </p>
                    </div>    
                ) }
                
                <div className="book-container__block-container">
                    <h2 className="book-container__header">
                        Характеристики
                    </h2>

                    <div className="book-container__table-info">
                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Автор</p>
                            </div>
                            <div className="book-container__cell">
                                <Link className="book-container__link author-link" href={`/author/view/${book.authors[0]?.slug}`}>
                                    {book.authors[0]?.first_name} {book.authors[0]?.last_name}
                                </Link>
                            </div>
                        </div>

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Видавництво</p>
                            </div>
                            <div className="book-container__cell">
                               <Link className="book-container__link publishing-link" href={`/book_publisher/${book.publishing.slug}`}>
                                    {book.publishing.title}
                                </Link>
                            </div>
                        </div>

                        <div className="book-container__row">
                            <div className="book-container__cell cell-title">
                                <p>Кількість сторінок</p>
                            </div>
                            <div className="book-container__cell">
                               <p>{ book.book_info.pages_count }</p>
                            </div>
                        </div>

                        { !showAllInfo && (
                            <button className="book-container__show-all btn" type="button"
                            onClick={() => setShowAllInfo(true)}>
                                Показати все 
                                <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                            </button>    
                        ) }
                        

                        { showAllInfo && (
                           <>
                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Рік видання</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.publishing_year }</p>
                                </div>
                            </div>

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Мова</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.language}</p>
                                </div>
                            </div>

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Ілюстрації</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.illustrations || "Немає ілюстрацій"}</p>
                                </div>
                            </div>

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Тип</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.format}</p>
                                </div>
                            </div>

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Тип обкладинки</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.cover_type}</p>
                                </div>
                            </div>

                            { book.book_info.weight && (
                                <div className="book-container__row">
                                    <div className="book-container__cell cell-title">
                                        <p>Вага</p>
                                    </div>
                                    <div className="book-container__cell">
                                        <p>{ book.book_info.weight }</p>
                                    </div>
                                </div>    
                            ) }
                            
                            { book.book_info.original_name && (
                                <div className="book-container__row">
                                    <div className="book-container__cell cell-title">
                                        <p>Оригінальна назва</p>
                                    </div>
                                    <div className="book-container__cell">
                                        <p>{ book.book_info.original_name }</p>
                                    </div>
                                </div>
                            ) }

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>ISBN</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.ISBN}</p>
                                </div>
                            </div>

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Код</p>
                                </div>
                                <div className="book-container__cell">
                                <p>{ book.book_info.code}</p>
                                </div>
                            </div>
                            <button className="book-container__show-all btn"
                            type="button" onClick={() => setShowAllInfo(false)}>
                                Сховати
                                <Image src="/icons/chevron-down.svg"
                                className="book-container__rotated-img"
                                alt="" width="18" height="18" />
                            </button>
                           </> 
                        ) }
                    </div>
                </div>

                <div className="book-container__block-container">
                    <h2 className="book-container__header">
                        Про автора
                    </h2>
                    
                    <div className="book-container__author-desc">
                        <div className="book-container__desc-container">
                            <p className="book-contianer__description">
                                {book.authors[0]?.description}
                            </p>  
                            <Link href={`/author/view/${book.authors[0]?.slug}`} className="book-container__link extended-link">
                                Детальніше про автора
                                <Image src="/icons/chevron-down.svg" alt="" width="20" height="20" />
                            </Link>  
                        </div>
                        
                        <div className="book-container__author-image">
                            <Image src={book.authors[0]?.images[0]?.image_path} alt="" width="80" height="80" />
                        </div>
                    </div>
                </div>

                <div className="book-container__block-container">
                    <div className="book-container__reviews">
                        <h3 className="book-container__header h3-header">
                            Відгуки
                        </h3>

                        <button className="book-container__write-review write-review book-contianer__btn">
                            Залишити відгук
                        </button>

                    </div>
                </div>
            </div>

            <div className="book-container__section right-section">
                <div className="book-container__block price-block">
                    <div className="book-container__price-row">
                        <h2 className="book-container__header book-container__h2">
                            {book.price} грн
                        </h2>
                        { book.book_info.bonuses && (
                            <div className="book-container__bonuses product-bonuses">
                                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
                                <p className="product-bonuses__bonuses-count">+{book.book_info.bonuses} бонусів</p>
                            </div>    
                        ) }
                    </div>
                    <div className="book-container__in-stock-row">
                        <span className={`book-container__book-status ${book.book_info.in_stock ? "green-text": "gray-text"}`}>
                            {book.book_info.in_stock ? "В наявності" : "Немає в наявності"}
                        </span>
                        <div className="book-container__dot-separator" />
                        <span className="book-container__text">
                            { book.book_info.format } книга
                        </span>
                    </div>
                </div>
                
                {book.book_info.is_has_esupport && (
                    <div className="book-container__block collection-block product-collection">
                        <div className="collection-block__blue-badge collection-badge blue-badge">
                            Кешбек
                        </div>
                        <p className="collection-block__info-text">
                            Купити з програмою "Зимова єПідтримка"
                        </p>
                    </div>    
                )}
                <button className="book-container__pink-buy-btn buy-btn buy-btn-pink">
                    Купити
                </button>

                <Delivery />

                { isDeliveryModalOpen && <DeliveryInfoModal /> }

                {deliveryLocation && (
                    <DeliveryTerms deliveryLocation={deliveryLocation} productCode={book.book_info.code} />    
                )}
                
            </div>
        </div>    
    )
    
}