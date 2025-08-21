"use client"

import Image from 'next/image'
import { setActiveImage, useImageStore } from '../../../states/hobbies/ImagesStore'

export const RestImagesContainer = ({ images, hobby }) => {

    const activeImage = useImageStore((state) => state.activeImage)

    return (
        <div className="book-container__rest-images hobby-page__rest-images">
            { images.length > 1 && (
                images.map((image, index) => (
                    <Image 
                    src={ image } 
                    alt={`${ hobby.title }_${index + 2}`} width="50"
                    height="50"
                    key={ index } 
                    className={`${ activeImage === index ? "cur-img" : "" }`}
                    onClick={ () => setActiveImage(index) } />
                ))
            ) }
        </div>
    )
}