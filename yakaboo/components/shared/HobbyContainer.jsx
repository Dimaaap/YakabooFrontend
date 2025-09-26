import { useProductImagesStore } from "../../states"
import React, { useMemo, useEffect } from "react";
import { AddToWishlistBtn } from "../dynamic";
import { Breadcrumbs } from ".";
import { ProductImagesModal } from "../dynamic";

import Link from "next/link"
import ProductInfoModal from "../modals/ProductInfoModal";
import { setDescription } from "../../states/hobbies/HobbyDescriptionStore";
import { handleScrollForProductInfoModal, useProductInfoState } from "../../states/hobbies/ProductInfoState";
import { ImagesContainer } from "./hobbies/ImagesContainer";
import { RestImagesContainer } from "./hobbies/RestImagesContainer";
import { HobbyDescriptionContainer } from "./hobbies/HobbyDescriptionContainer";
import { HobbyCharacteristics } from "./hobbies/HobbyCharacteristics";
import { PriceContainer } from "./hobbies/PriceContainer";

export const HobbyContainer = ({ hobby, breadcrubmbLink, isAccessory=false }) => {
    const { isProductImagesOpen } = useProductImagesStore();

    const showProductInfoModal = useProductInfoState((state) => state.showProductInfoModal)

    const images = useMemo(() => {
        return hobby?.images?.map(img => img?.image_url)
    }, [hobby?.images])

    useEffect(() => {
        const handleScroll = () => handleScrollForProductInfoModal(90)
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        if(hobby){
            setDescription(hobby.description)    
        }
    }, [hobby.description])

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
                        { images && images?.length > 0 && (
                            <ImagesContainer images={ images } hobby={ hobby } />    
                        ) }
                        
                    </div>
                    { images && images?.length > 0 && (
                        <RestImagesContainer images={ images } hobby={ hobby } />    
                    ) }
                    
                </div>
            </div>

            <div className="book-container__section hobby-page__section center-section">
                <Breadcrumbs linksList={ breadcrubmbLink } />
                <div className="book-container__author-block hobby-page__author-block">
                    <h2 className="book-container__book-title hobby-page__hobby-title">
                        { hobby.title }
                    </h2>
                    <Link className="book-container__link hobby-page__link author-link brand-link" 
                    href={isAccessory ? `/knyzhkovi-aksesuary/brands/view/${hobby?.brand?.slug}` : `/children-brand/${hobby?.brand?.slug}`}>
                        { hobby?.brand?.title }
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
                    href={ !isAccessory ? `/hobby/categories/${hobby?.category?.slug}` 
                    : `/knyzhkovi-aksesuary/category/${hobby?.category?.slug}`}>
                        { hobby?.category?.title }
                    </Link>
                </div>

                { hobby.description && (
                    <HobbyDescriptionContainer hobby={ hobby } />
                ) }

                <HobbyCharacteristics hobby={ hobby } />

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
                <PriceContainer hobby={ hobby } />
            </div>
        </div>
    )
}