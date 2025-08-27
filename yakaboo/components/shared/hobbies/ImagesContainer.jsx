"use client"

import Image from 'next/image'

import { showPrevImage, showNextImage, useImageStore } from '../../../states/hobbies/ImagesStore'
import { useProductImagesStore } from '../../../states';
import { SliderBtn } from '../SliderBtn';
import { ImagesLinks } from '../../../site.config';

export const ImagesContainer = ( { images, hobby } ) => {

    const { setIsProductImagesOpen } = useProductImagesStore();
    const activeImage = useImageStore((state) => state.activeImage)

    return (
        <div className="book-container__images-carousel hobby-page__images-carousel">
            <div className="book-container__main-image hobby-page__main-image">
                { images?.length > 1 && (
                    <SliderBtn onClickHandler={() => showPrevImage(images.length)}/>
                ) }

                <Image src={ images[activeImage] ?? ImagesLinks.DEFAULT_IMAGE } 
                width="200"
                height="350" alt={`${hobby.title}_1`} 
                className="book-container__big-image hobby-page__big-image" 
                onClick={() => setIsProductImagesOpen(true)} />

                 { images.length > 1 && (
                    <SliderBtn onClickHandler={() => showNextImage(images.length)} prevBtn={ true } />
                ) }
            </div>
        </div>    
    )

    
}