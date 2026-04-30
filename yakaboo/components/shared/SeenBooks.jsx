import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { CommentsCount, ProductCard, Stars, TopBadge } from '.'

export const SeenBooks = ({ books }) => {
  
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const sliderRef = useRef(null);

    const scroll = direction => {
        if(!sliderRef.current) return;

        const slider = sliderRef.current;
        const firstCard = slider.children[0];

        if(!firstCard) return;

        const cartWidth = firstCard.getBoundingClientRect().width;

        slider.scrollBy({
            left: direction === "right" ? cartWidth : -cartWidth,
            behavior: "smooth"
        })

        setTimeout(updateScrollButtons, 350);
    }

    const updateScrollButtons = () => {
        if(!sliderRef.current) return;

        const slider = sliderRef.current;

        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

        setCanScrollLeft(slider.scrollLeft > 0);
        setCanScrollRight(slider.scrollLeft < maxScrollLeft - 1);
    }

    if(!books.length){
        return null
    }

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        updateScrollButtons();

        slider.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);

        return () => {
            slider.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, [books.length]);
  
    return (
    <div className="books-container seen-books">
        <div className="books-container__section seen-books-section">
            <div className="books-container__header seen-books-header">
                <h3 className="books-container__title">
                    Раніше ви дивилися
                </h3>
            </div>
            <div className="books-container__slider seen-books-slider">
                { books.length > 5 && canScrollLeft && (
                    <button className="books-container__btn prev-btn seen-books-btn seen-books-prev" type="btn" onClick={() => scroll("left")}>
                        <Image src="/icons/arrow-left.svg" alt="prev" width={30} height={30} />
                    </button>    
                ) }
               
                <div className="books-container__slider book-slider seen-books-book-slider" ref={ sliderRef }>
                    { books.length > 0 && books.map((book, id) => (
                        <ProductCard key={ id } title={ book.book.title } 
                        brand={`${book.book.authors[0]?.first_name} ${book?.book?.authors[0]?.last_name}`} 
                        productLink={`book/${book.slug}`}
                        imageSrc={book?.book?.images[0].image_url}
                        oldPrice={book?.book?.price} 
                        newPrice={ book?.book?.is_promo ? book?.book?.promo_price : null }
                        bookInfo={ book?.book_info }
                        book={ book } />
                        
                    )) }
                </div>

                { books.length > 5 && canScrollRight && (
                    <button className="books-container__btn next-btn seen-books-btn seen-books-next" type="btn" onClick={() => scroll("right")}>
                        <Image src="/icons/arrow-left.svg" alt="next" width={30} height={30} />
                    </button>    
                ) }
                
            </div>
        </div>
    </div>
  )
}