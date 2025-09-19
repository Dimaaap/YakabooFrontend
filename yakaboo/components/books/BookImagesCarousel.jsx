"use client";

import { useState } from "react";
import { ImagesLinks } from "../../site.config";
import { useProductImagesStore } from "../../states";
import Image from "next/image";

export const BookImagesCarousel = ({ images=[], title, isGift }) => {
    const [activeImage, setActiveImage] = useState(0);
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

    return(
        <div className="book-container__images-carousel">
            <div className="book-container__main-image">
                { coverImages.length > 1 && (
                    <button className="book-container__slider-btn prev-btn slider-btn"
                    onClick={ showPrevImage }>
                        <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                    </button>
                ) }
                <Image src={coverImages[activeImage] ?? ImagesLinks.DEFAULT_IMAGE}
                width="250"
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
        </div>
    )
}