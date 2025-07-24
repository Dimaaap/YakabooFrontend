"use client"

import { useState, useMemo } from "react";

import Image from "next/image"
import { Breadcrumbs, DeliveryTerms } from "../shared"
import Link from "next/link"
import { AddToWishlistBtn, Delivery, DeliveryInfoModal, ProductImagesModal } from "../dynamic";
import { useDeliveryCityStore, useDeliveryModalStore, useProductImagesStore } from "../../states";

const MAX_STARS = 5;

export const BookContainer = ({book, breadcrumbLinks}) => {

    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();
    const { isProductImagesOpen, setIsProductImagesOpen } = useProductImagesStore();

    const [readPart, setReadPart] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const [showAllInfo, setShowAllInfo] = useState(false);

    const showNextImage = () => {
        if(activeImage < book.images?.length - 1){
            setActiveImage(activeImage + 1)
        } else {
            setActiveImage(0);
        }
    }

    const showPrevImage = () => {
        if(activeImage > 0){
            setActiveImage(activeImage-1)
        } else {
            setActiveImage(book.images.length - 1)
        }
    }

    const activeStars = useMemo(() => {
        return Math.round(book.book_info.rate)
    }, [book.book_info.rate]);

    const images = useMemo(() => {
        return book.images
    }, [book.images]);


    const pageImages = useMemo(() => {
        return book.images
        .filter(img => img.type === "page")
        .map(img => img.image_url)
    }, [book.images]);

    return(
        <div className="book-container">
            { isProductImagesOpen && <ProductImagesModal productTitle={book.title} isBook={true} bookImages={images } /> }
            { readPart && <ProductImagesModal productTitle={book.title} images={pageImages} withCover={false} /> }
            <div className="book-container__section left-section">
                <div className="book-container__btns-section">
                    <AddToWishlistBtn />
                    {pageImages.length > 0 && (
                        <button className="book-container__header-btn read-part" onClick={() => setReadPart(true)}>
                            <Image src="/icons/book.svg" alt="" width="25" height="25" />
                            Читати уривок
                        </button>    
                    )}
                </div>

                <div className="book-container__images-carousel">
                    <div className="book-container__main-image">
                        {book.images?.length > 1 && (
                            <button className="book-container__slider-btn prev-btn slider-btn" onClick={showPrevImage}>
                                <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                            </button>    
                        )}
                        <Image src={book.images[activeImage]?.image_url ?? "/images/holli.jpg"} width="250" 
                        height="350" alt={`${book.title}_1`} className="book-container__big-image" 
                        onClick={ () => setIsProductImagesOpen(true) }/>
                        
                        {book.images?.length > 1 && (
                            <button className="book-container__slider-btn next-btn slider-btn" onClick={showNextImage}>
                                <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                            </button>    
                        )}
                       
                    </div>
                    <div className="book-container__rest-images">
                        {book.images.length > 1 && (
                            book.images.map((image, index) => (
                                <Image src={image.image_url} alt={`${book.title}_${index + 2}`} width="50" height="50" key={index}
                                className={`${activeImage === index ? "cur-img": ""}`} 
                                onClick={() => setActiveImage(index)}/>
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
                    { console.log(book) }
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

                            {book.literature_period && (
                                <div className="book-container__row">
                                    <div className="book-container__cell cell-title">
                                        <p>Література за періодами</p>
                                    </div>
                                    <div className="book-container__cell">
                                        <Link href={`/literature-periods/view/${book.literature_period.slug}`}
                                        className="book-container__link publishing-link">
                                            {book.literature_period.title}
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <div className="book-container__row">
                                <div className="book-container__cell cell-title">
                                    <p>Ілюстрації</p>
                                </div>
                                <div className="book-container__cell">
                                    <p>{ book.book_info.illustrations || "Немає ілюстрацій"}</p>
                                </div>
                            </div>

                            { book.translators.length > 0 && (
                                <div className="book-container__row">
                                    <div className="book-container__cell cell-title">
                                        <p>Перекладачі</p>
                                    </div>
                                    <div className="book-container__cell flex-cell">   
                                        {book.translators.map((translator, index) => (
                                            <Link href={`/book_translator/view/${translator.slug}`} 
                                            className="book-container__link publishing-link" key={ index }>
                                                {`${translator.first_name} ${translator.last_name}`}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) }

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