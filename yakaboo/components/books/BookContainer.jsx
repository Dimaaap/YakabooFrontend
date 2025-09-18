"use client"

import React, { useState, useMemo } from "react";

import Image from "next/image"
import { Breadcrumbs, DeliveryTerms } from "../shared"
import Link from "next/link"
import { AddToWishlistBtn, Delivery, DeliveryInfoModal, ProductImagesModal } from "../dynamic";
import { useDeliveryCityStore, useDeliveryModalStore, useProductImagesStore } from "../../states";
import { BookCharacteristics } from "../shared/BookCharacteristics";
import { HobbyDescriptionContainer } from "../shared/hobbies/HobbyDescriptionContainer";
import { ImagesLinks } from "../../site.config";

const MAX_STARS = 5;

export const BookContainer = ({book, breadcrumbLinks, isGift=false}) => {

    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();
    const { isProductImagesOpen, isReadPart, setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();

    const [activeImage, setActiveImage] = useState(0);

    const showNextImage = () => {
        if(activeImage < coverImages.length - 1){
            setActiveImage(activeImage + 1)
        } else {
            setActiveImage(0);
        }
    }

    const showPrevImage = () => {
        if(activeImage > 0){
            setActiveImage(activeImage-1)
        } else {
            setActiveImage(coverImages.length - 1)
        }
    }

    const viewReadPartClick = () => {
        setIsReadPart(true)
        setIsProductImagesOpen(true)
    }

    const activeStars = useMemo(() => {
        return Math.round(book?.book_info?.rate)
    }, [book?.book_info?.rate]);

    const images = useMemo(() => {
        return book.images
    }, [book.images]);


    const coverImages = useMemo(() => {
        if(!isGift){
            return book.images
            .filter(img => img.type === "cover")
            .map(img => img.image_url)    
        }
        return book.images.map(img => img.image_url)
    })

    const pageImages = useMemo(() => {
        return book?.images
        ?.filter(img => img.type === "page")
    }, [book?.images]);

    return(
        <div className="book-container">
            { (isProductImagesOpen && !isReadPart) && <ProductImagesModal productTitle={book.title} isBook={true} bookImages={images } />}
            { isReadPart && <ProductImagesModal productTitle={book.title} images={pageImages} withCover={false} /> }
            <div className="book-container__section left-section">
                <div className="book-container__btns-section">
                    <AddToWishlistBtn />
                    {pageImages && pageImages.length > 0 && (
                        <button className="book-container__header-btn read-part" onClick={() => viewReadPartClick()}>
                            <Image src="/icons/book.svg" alt="" width="25" height="25" />
                            Читати уривок
                        </button>    
                    )}
                </div>

                <div className="book-container__images-carousel">
                    <div className="book-container__main-image">
                        {coverImages.length > 1 && (
                            <button className="book-container__slider-btn prev-btn slider-btn" onClick={showPrevImage}>
                                <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                            </button>    
                        )}
                        <Image src={coverImages[activeImage] ?? ImagesLinks.DEFAULT_IMAGE} width="250" 
                        height="350" alt={`${book.title}_1`} className="book-container__big-image" 
                        onClick={ () => setIsProductImagesOpen(true) }/>
                        
                        {coverImages.length > 1 && (
                            <button className="book-container__slider-btn next-btn slider-btn" onClick={showNextImage}>
                                <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                            </button>    
                        )}
                       
                    </div>
                    <div className="book-container__rest-images">
                        { book.images.length > 1 && (
                            book.images 
                            .map((image, index) => ({ image, index }))
                            .filter(({ index }) => {
                                return index >= activeImage - 1 && index <= activeImage + 3;
                            })
                            .map(({ image, index }) => (
                                image.type === "cover" || isGift && (
                                    <Image 
                                        key={index}
                                        src={image.image_url || ""}
                                        alt={`${book.title}_${index + 1}`}
                                        width={50}
                                        height={50}
                                        className={`${activeImage === index ? "cur-img" : ""}`}
                                        onClick={() => setActiveImage(index)}
                                    />
                                )
                            ))
                        ) }
                    </div>
                </div>
            </div>

            <div className="book-container__section center-section">
                <Breadcrumbs linksList={ breadcrumbLinks } />
                <div className="book-container__author-block">
                    <h2 className="book-container__book-title">
                        { isGift ? `Книга ${book.title}` : `${book.title}` }
                    </h2>
                    { !isGift && (
                        <Link className="book-container__link author-link" href={`/author/view/${book.authors[0].slug}`}>
                            {book.authors[0].first_name} {book.authors[0].last_name}
                        </Link>       
                    ) }
                     
                </div>
                
                {book?.book_info?.rate || book?.gift_info?.rate && (
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
                    Код товару: {book?.book_info?.code || book?.gift_info?.code}
                </p>

                { !isGift && (
                    <div className="book-container__block format">
                        <p className="book-container__block-title">
                            Формат
                        </p>    
                        <div className="book-container__tiles-block">
                            <div className={`book-container__tile tile ${book?.book_info?.format === "Паперова" ? "active": ""}`}>
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
                        </div>
                    </div>    
                ) }

                

                <div className="book-container__blocks">
                    <div className="book-container__block language-block">
                        <p className="book-container__block-title">
                            { !isGift ? "Мова книги" : "Мова" }
                        </p>   
                        <div className="book-container__tiles-block">
                            { !isGift ? (
                                <div className={`book-container__tile tile ${ book.book_info.language === "Українська" ? "current": "" }`}>
                                    <p className="tile__desc">
                                        Українська
                                    </p>
                                </div>    
                            ) : (
                               <div className={`book-container__tile tile ${ book.gift_info.language === "Українська" ? "current": "" }`}>
                                    <p className="tile__desc">
                                        Українська
                                    </p>
                                </div> 
                            ) }
                            
                        </div> 
                    </div>
                    
                    { !isGift && (
                        <div className="book-container__block publishing-block">
                            <p className="book-container__block-title">
                                Видавництво
                            </p>   
                            <div className="book-container__tiles-block">
                                <div className='book-container__tile tile small-tile current'>
                                    <Link className="book-container__link publishing-link" href={`/book_publisher/view/${book.publishing.slug}`}>
                                        {book.publishing.title}
                                    </Link>
                                </div>
                            </div> 
                        </div>    
                    ) }
                    
                    { !isGift && book.book_info.publishing_year !== 0 && (
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

                    { isGift && (
                        <Link className="book-container__block publishing-block" 
                        href={`/gifts/category/${book?.gift_category?.slug}`}>
                            <p className="book-container__block-title">
                                Категорія
                            </p>
                            <div className="book-container__tiles-block">
                                <div className="book-container__tile tile">
                                    <p className="tile__desc">
                                        { book?.gift_category?.title }
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ) }
                    
                </div>

                <HobbyDescriptionContainer hobby={ !isGift ? book.book_info : book.gift_info } />    
                
                <BookCharacteristics book={book} isGift={ isGift } />
                
                { !isGift && book.authors.length > 0 && (
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
                ) }
                

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
                        { book?.book_info?.bonuses && book?.gift_info?.bonuses && (
                            <div className="book-container__bonuses product-bonuses">
                                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
                                <p className="product-bonuses__bonuses-count">
                                    +{book?.book_info?.bonuses || book?.gift_info?.bonuses} бонусів
                                </p>
                            </div>    
                        ) }
                    </div>
                    <div className="book-container__in-stock-row">
                        {!isGift ? (
                            <span className={`book-container__book-status ${book.book_info.in_stock ? "green-text": "gray-text"}`}>
                                {book.book_info.in_stock ? "В наявності" : "Немає в наявності"}
                            </span>    
                        ) : (
                           <span className={`book-container__book-status ${book.gift_info.in_stock ? "green-text": "gray-text"}`}>
                                {book.gift_info.in_stock ? "В наявності" : "Немає в наявності"}
                            </span>   
                        )}
                        <div className="book-container__dot-separator" />
                        {!isGift && (
                            <span className="book-container__text">
                                { book.book_info.format } книга
                            </span>    
                        )}
                        
                    </div>
                </div>
                
                {book?.book_info?.is_has_esupport || book?.gift_info?.is_has_esupport && (
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