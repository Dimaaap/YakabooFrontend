import { useDeliveryCityStore, useDeliveryModalStore, useProductImagesStore } from "../../states"
import { useState, useMemo } from "react";
import { AddToWishlistBtn } from "../dynamic";
import { Breadcrumbs } from ".";
import { ProductImagesModal } from "../dynamic";

import Image from "next/image";
import Link from "next/link"

export const HobbyContainer = ({ hobby, breadcrubmbLink }) => {
    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();
    const { isProductImagesOpen, setIsProductImagesOpen } = useProductImagesStore();

    const [activeImage, setActiveImage] = useState(0);
    
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

    const images = useMemo(() => {
        return hobby.images.map(img => img.image_url)
    }, [hobby.images])

    return(
        <div className="book-container hobby-page">
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
                </div>
            </div>
        </div>
    )
}