import { useDeliveryCityStore, useDeliveryModalStore, useProductImagesStore } from "../../states"
import React, { useState, useMemo, useEffect } from "react";
import { AddToWishlistBtn, Delivery, DeliveryInfoModal } from "../dynamic";
import { Breadcrumbs, DeliveryTerms } from ".";
import { ProductImagesModal } from "../dynamic";

import Image from "next/image";
import Link from "next/link"
import ProductInfoModal from "../modals/ProductInfoModal";

export const HobbyContainer = ({ hobby, breadcrubmbLink }) => {
    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();
    const { isProductImagesOpen, setIsProductImagesOpen } = useProductImagesStore();

    const [activeImage, setActiveImage] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [showAllCharacteristics, setShowAllCharacteristics] = useState(false)
    const [showProductInfoModal, setShowProductInfoModal] = useState(false);

    const SCROLL_OFFSET = 90;
    
    const showNextImage = () => {
        if(activeImage < hobby.images?.length - 1){
            setActiveImage(activeImage + 1)
        } else {
            setActiveImage(0);
        }
    }

    const showPrevImage = () => {
        if(activeImage > 0){
            setActiveImage(activeImage-1)
        } else {
            setActiveImage(hobby.images.length - 1)
        }
    }

    const firstParagraph = useMemo(() => {
        if(!hobby.description) return ""
        const parser = new DOMParser();
        const doc = parser.parseFromString(hobby.description, "text/html");
        const firstP = doc.querySelector("p");
        return firstP ? firstP.outerHTML : ""
    }, [hobby.description])

    const images = useMemo(() => {
        return hobby.images.map(img => img.image_url)
    }, [hobby.images])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if(scrollY > SCROLL_OFFSET){
                setShowProductInfoModal(true)
            } else {
                setShowProductInfoModal(false);
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return(
        <div className="book-container hobby-page">
            { showProductInfoModal && (
                <ProductInfoModal 
                productImage={hobby.images[0].image_url}
                productTitle={hobby.title} 
                productPrice={hobby.price}
                isInStock={hobby.is_in_stock} />    
            ) }
            { isProductImagesOpen && <ProductImagesModal productTitle={ hobby.title } images={ images } /> }

            <div className="book-container__section hobby-page__section left-section">
                <div className="book-container__btns-section hobby-page__btns-section">
                    <AddToWishlistBtn />
                </div>

                <div className="book-container__images-carousel hobby-page__images-carousel">
                    <div className="book-container__main-image hobby-page__main-image">
                        { images?.length > 1 && (
                            <button className="book-container__slider-btn hobby-page__slider-btn prev-brn slider-btn"
                            onClick={ showPrevImage }>
                                <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                            </button>
                        ) }

                        <Image src={ images[activeImage] ?? "images/holli.jpg" } width="250"
                        height="350" alt={`${hobby.title}_1`} className="book-container__big-image hobby-page__big-image" 
                        onClick={() => setIsProductImagesOpen(true)} />

                        { images.length > 1 && (
                            <button className="book-container__slider-btn hobby-page__slider-btn next-btn slider-btn"
                            onClick={ showNextImage }>
                                <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                            </button>
                        ) }
                    </div>

                    <div className="book-container__rest-images hobby-page__rest-images">
                        { images.length > 1 && (
                            images.map((image, index) => (
                                <Image src={ image } alt={`${ hobby.title }_${index + 2}`} width="50"
                                height="50" key={ index } className={`${ activeImage === index ? "cur-img" : "" }`}
                                onClick={ () => setActiveImage(index) } />
                            ))
                        ) }
                    </div>
                </div>
            </div>

            <div className="book-container__section hobby-page__section center-section">
                <Breadcrumbs linksList={ breadcrubmbLink } />
                <div className="book-container__author-block hobby-page__author-block">
                    <h2 className="book-container__book-title hobby-page__hobby-title">
                        { hobby.title }
                    </h2>
                    <Link className="book-container__link hobby-page__link author-link brand-link" href={`/children-brand/${hobby.brand.slug}`}>
                        { hobby.brand.title }
                    </Link>
                    <p className="book-container__code hobby-page__code">
                        Код товару: { hobby.code }
                    </p>
                </div>

                <div className="book-container__block hobby-page__block format">
                    <p className="book-container__block-title hobby-page__block-title">
                        Категорія
                    </p>
                    <Link className="book-container__tile hobby-page__tile tile small-tile"
                    href={`/hobby/categories/${hobby.category.slug}`}>
                        { hobby.category.title }
                    </Link>
                </div>

                { hobby.description && (
                    <div className="book-container__block-container hobby-page__block-container">
                        <h3 className="book-container__header hobby-page__header">
                            Опис товару
                        </h3>
                        <div 
                            className="book-container__text hobby-page__text"
                            dangerouslySetInnerHTML={{__html: showAll ? hobby.description : firstParagraph}} 
                        />
                        { !showAll ? (
                            <button
                                onClick={() => setShowAll(true)}
                                className="hobby-page__show-more"
                            >
                                Показати все
                                <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                            </button>
                        ) : (
                            <button 
                            onClick={() => setShowAll(false)}
                            className="hobby-page__show-more">
                                Показати менше
                                <Image src="/icons/chevron-down.svg" alt="" width="18" height="18"
                                className="rotated" />
                            </button>
                        )}
                    </div>
                ) }

                <div className="book-container__block-container hobby-page__block-container">
                    <h3 className="book-container__header hobby-page__header">
                        Характеристики
                    </h3>
                    <div className="book-container__table-info hobby-page__table-info">

                        <div className="book-container__row hobby-page__row">
                            <div className="book-container__cell cell-title hobby-page__cell">
                                <p>Бренд</p>
                            </div>
                            <div className="book-container__cell hobby-page__cell">
                                <Link className="book-container__link hobby-page__link publishing-link" href={`/children_brand/view/${ hobby.brand.slug }`}>
                                    { hobby.brand.title }
                                </Link>
                            </div>
                        </div>

                        { hobby.article && (
                            <div className="book-container__row hobby-page__row">
                                <div className="book-container__cell hobby-page__cell cell-title">
                                    <p>Артикул</p>
                                </div>
                                <div className="book-container__cell hobby-page__cell">
                                    { hobby.article }
                                </div>
                            </div>    
                        ) }

                        { hobby.theme && (
                            <div className="book-container__row hobby-page__row">
                                <div className="book-container__cell hobby-page__cell cell-title">
                                    <p>Тематика</p>
                                </div>
                                <div className="book-container__cell hobby-page__cell">
                                    { hobby.theme }
                                </div>
                            </div>
                        ) }

                        { hobby.details_count && (
                            <div className="book-container__row hobby-page__row">
                                <div className="book-container__cell hobby-page__cel cell-title">
                                    <p>Кількість елементів</p>
                                </div>
                                <div className="book-container__cell hobby-page__cel">
                                    { hobby.details_count }
                                </div>
                            </div>
                        ) }

                        { !showAllCharacteristics && (
                            <button className="book-container__show-all btn hobby-page__show-all" type="button"
                            onClick={() => setShowAllCharacteristics(true)}>
                                Показати все
                                <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                            </button>
                        ) }

                        { showAllCharacteristics && (
                            <>
                                { hobby.size && (
                                    <div className="book-container__row hobby-page__row">
                                        <div className="book-container__cell hobby-page__cell cell-title">
                                            <p>Розмір товару</p>
                                        </div>
                                        <div className="book-container__cell hobby-page__cell">
                                            { hobby.size }
                                        </div>
                                    </div>
                                ) }

                                { hobby.difficulty_level && (
                                    <div className="book-container__row hobby-page__row">
                                        <div className="book-container__cell hobby-page__cell cell-title">
                                            <p>Рівень складності</p>
                                        </div>
                                        <div className="book-container__cell hobby-page__cell">
                                            { hobby.difficulty_level }
                                        </div>
                                    </div>
                                ) }

                                { hobby.packing && (
                                    <div className="book-container__row hobby-page__row">
                                        <div className="book-container__cell hobby-page__cell cell-title">
                                            <p>Пакування</p>
                                        </div>
                                        <div className="book-container__cell hobby-page__cell">
                                            { hobby.packing }
                                        </div>
                                    </div>
                                ) }

                                { hobby.color && (
                                    <div className="book-container__row hobby-page__row">
                                        <div className="book-container__cell hobby-page__cell cell-title">
                                            <p>Колір</p>
                                        </div>
                                        <div className="book-container__cell hobby-page__cell">
                                            { hobby.color }
                                        </div>
                                    </div>
                                ) }

                                { hobby.type && (
                                    <div className="book-container__row hobby-page__row">
                                        <div className="book-container__cell hobby-page__cell cell-title">
                                            <p>Тип</p>
                                        </div>
                                        <div className="book-container__cell hobby-page__cell">
                                            { hobby.type }
                                        </div>
                                    </div>
                                )}

                                { hobby.ages?.length > 0 && (
                                    <div className="book-container__row hobby-page__row">
                                        <div className="book-container__cell cell-title hobby-page__cell">
                                            <p>Вік</p>
                                        </div>
                                        <div className="book-container__cell flex-cell hobby-page__cell">
                                            { hobby.ages.map((age, index) => (
                                                <React.Fragment key={ index }>
                                                    <Link href={`/age/${age.slug}`}
                                                    className="book-container__link publishing-link hobby-page__link">
                                                        { age.age }
                                                    </Link>
                                                    { index < hobby.ages.length - 1 && ", " }
                                                </React.Fragment>
                                            )) }
                                        </div>
                                    </div>
                                ) }

                                <div className="book-container__row hobby-page__row">
                                    <div className="book-container__cell cell-title hobby-page__cell">
                                        <p>Код</p>
                                    </div>
                                    <div className="book-container__cell hobby-page__cell">
                                        { hobby.code }
                                    </div>
                                </div>

                                <button className="book-container__show-all btn hobby-page__show-all"
                                type="btn" onClick={() => setShowAllCharacteristics(false)}>
                                    Сховати
                                    <Image src="/icons/chevron-down.svg" 
                                    className="book-container__rotated-img"
                                    alt="" width="18" height="18"
                                    />
                                </button>
                            </>
                        ) }
                    </div>
                </div>

                <div className="book-container__block-container hobby-page__block-container">
                    <div className="book-container__reviews hobby-page__reviews">
                        <h3 className="book-container__header h3-header hobby-page__header">
                            Відгуки
                        </h3>

                        <button className="book-container__write-review write-review book-container__btn">
                            Залишити відгук
                        </button>
                    </div>
                </div>
            </div>

            <div className="book-container__section hobby-page__section right-section">
                <div className="book-container__block price-block hobby-page__price-block">
                    <div className="book-container__price-row hobby-page__price-row">
                        { hobby.is_in_stock && (
                            <h2 className="book-container__header book-container__h2 hobby-page__header">
                                { hobby.price } грн
                            </h2>    
                        ) }
                        
                        { hobby.is_in_stock && hobby.bonuses && (
                            <div className="book-container__bonuses hobby-page__bonuses product-bonuses">
                                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
                                <p className="product-bonuses__bonuses-count">+{ hobby.bonuses } бонусів</p>
                            </div>
                        ) }
                    </div>
                    <div className="book-container__in-stock-row">
                        <span className={`book-container__book-status ${hobby.is_in_stock ? "green-text" : "gray-text"}`}>
                            { hobby.is_in_stock ? "В наявності" : "Немає в наявності" }
                        </span>
                    </div>
                    <div className={`book-container__pink-buy-btn buy-btn ${hobby.is_in_stock ? "buy-btn-pink" : "notify-btn-gray"}`}>
                        { hobby.is_in_stock ? "Купити" : "Сповістити про наявність" }
                    </div>
                    { hobby.is_in_stock && (
                        <>
                            <Delivery />

                        { isDeliveryModalOpen && <DeliveryInfoModal /> }

                        { deliveryLocation && (
                            <DeliveryTerms deliveryLocation={ deliveryLocation } productCode={ hobby.code } />
                        ) }
                        </>
                    ) }
                </div>
            </div>
        </div>
    )
}