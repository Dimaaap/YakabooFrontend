import React from 'react'
import Image from "next/image"
import AddToWishlistBtn from '../shared/AddToWishlistBtn'
import { BookImagesCarousel } from '.';
import { useProductImagesStore } from '../../states';

export const BookContainerLeftSection = ({ book, setIsSimpleFlashMessage, isGift }) => {
    
    const images = book.images || [];
    const pageImages = images.filter((img) => img.type === "page");

    const { setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();

    const viewReadPartClick = () => {
        setIsReadPart(true)
        setIsProductImagesOpen(true)
    }


  return (
    <div className="book-container__section left-section">
        <div className="book-container__btns-section">
            <AddToWishlistBtn book={ book } setIsSimple={ setIsSimpleFlashMessage } />
                {pageImages.length > 0 && (
                    <button className="book-container__header-btn read-part" onClick={() => viewReadPartClick()}>
                        <Image src="/icons/book.svg" alt="" width="25" height="25" />
                            Читати уривок
                    </button>    
                )}
        </div>
    
        <BookImagesCarousel images={ images } title={ book.title } isGift={ isGift } book={ book } />
    </div>
  )
}
