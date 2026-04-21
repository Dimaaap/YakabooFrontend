import React from 'react'
import { CookiesWorker } from '../../services';
import { AddReviewModal, ProductImagesModal, ProductInfoModal } from '../dynamic';
import { useAddReviewModalStore, useProductImagesStore } from '../../states';
import { useProductInfoState } from '../../states/hobbies/ProductInfoState';
import { AddBookToWishlistModal } from '../modals/AddBookToWishlist';
import { useAddToWishlistModalStore } from '../../states/AddToWishlistModalStore';

export const BookPageModals = ({ book, isSmall=false }) => {

    const images = book.images || [];

    const bookInfo = {
        image_src: images[0]?.image_url,
        title: book?.title,
        format: book?.book_info?.format,
        author: book?.authors?.[0]?.first_name + " " + book?.authors[0]?.last_name
    };

    const { isAddReviewModalOpen } = useAddReviewModalStore();
    const { isProductImagesOpen, isReadPart } = useProductImagesStore();
    const { isAddToWishlistModalOpen } = useAddToWishlistModalStore();

    const showProductInfoModal = useProductInfoState((state) => state.showProductInfoModal)

  return (
    <div>
        { isAddReviewModalOpen && (<AddReviewModal bookInfo={ bookInfo } bookId={ book.id } 
        userEmail={ CookiesWorker.get("email") || null } />) }
        { showProductInfoModal && (
            <ProductInfoModal productImage={ book.images[0].image_url } productTitle={ book.title } productPrice={ book.price } 
            isInStock={ book.book_info.in_stock } isSmall={ isSmall }
            />
        ) }
        { (isProductImagesOpen && !isReadPart) && <ProductImagesModal productTitle={book.title} images={ images } />}
        { isReadPart && <ProductImagesModal productTitle={book.title} images={ images } /> }
        { isAddToWishlistModalOpen && <AddBookToWishlistModal book={ book } /> }    
    </div>
     
  )
}
