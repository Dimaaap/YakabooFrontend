"use client";

import { useEffect, useState } from "react";
import { ImagesLinks } from "../../site.config";
import { useProductImagesStore } from "../../states";
import Image from "next/image";
import { SupportIcons } from "../shared/SupportIcons";

export const BookImagesCarousel = ({ images=[], title, isGift, book }) => {
    const [activeImage, setActiveImage] = useState(0);
    const [hideRestImage, setHideRestImages] = useState(false);
    const { setIsProductImagesOpen } = useProductImagesStore();

    const coverImages = !isGift 
    ? images.filter((img) => img.type === "cover").map(img => img.image_url)
    : images.map(img => img.image_url);

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

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 1441){
                setHideRestImages(true)
            } else {
                setHideRestImages(false)
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return(
        <div className="book-container__images-carousel">
            <div className="book-container__main-image">
                <SupportIcons hasCashback={ book?.book_info?.is_has_cashback } hasWinterSupport={ book?.book_info?.is_has_winter_esupport }
                hasESupport={ book?.book_info?.is_has_esupport } isForWar={ book?.book_info?.is_for_war } />
                { coverImages.length > 1 && (
                    <button className="book-container__slider-btn prev-btn slider-btn"
                    onClick={ showPrevImage }>
                        <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                    </button>
                ) }
                <Image src={coverImages[activeImage] ?? ImagesLinks.DEFAULT_IMAGE}
                width="400"
                height="350"
                alt={`${title}_${activeImage + 1}`} 
                className="book-container__big-image"
                onClick={() => setIsProductImagesOpen(true)}/>

                { coverImages.length > 1 && (
                    <button className="book-container__slider-btn next-btn slider-btn"
                    onClick={ showNextImage }>
                        <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                    </button>
                ) }
            </div>

            {!hideRestImage ? (
                <div className="book-container__rest-images">
                    { images.length > 0 && (
                        images 
                            .map((image, index) => ({image, index}))
                            .filter(({ index }) => index >= activeImage -1 && index <= activeImage + 3)
                            .map(({ image, index }) => image.type === "cover" || isGift ? (
                                <Image key={ index } src={ image.image_url || "" }
                                alt={`${title}_${index + 1}`}
                                width="50" height="50" className={activeImage === index ? "cur-img": ""}
                                onClick={() => setActiveImage(index)}/>
                            ) : null)
                    ) }
                </div>    
            ) : (
                <div className="book-container__rest-images images-block">
                    {[...Array(images.filter((image) => image.type === "cover").length)].map((_, i) => (
                        <div className={`images-block-item ${ i === activeImage ? "active": "" }`} key={ i }
                        onClick={ () => setActiveImage(i) }></div>
                    ))}
                </div>
            )}
            
        </div>
    )
}