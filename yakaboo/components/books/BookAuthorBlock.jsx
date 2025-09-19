import Image from "next/image"
import Link from "next/link"

export const BookAuthorBlock = ({ author }) => {
    return (
        author ? (
            <div className="book-container__block-container">
                <h2 className="book-container__header">
                    Про автора
                </h2>
                        
                <div className="book-container__author-desc">
                    <div className="book-container__desc-container">
                        <p className="book-contianer__description">
                            {book.authors[0]?.description}
                        </p>  
                        <Link href={`/author/view/${book.authors[0]?.slug}`} className="book-container__link extended-link">
                            Детальніше про автора
                            <Image src="/icons/chevron-down.svg" alt="" width="20" height="20" />
                        </Link>  
                    </div>
                            
                    <div className="book-container__author-image">
                        <Image src={book.authors[0]?.images[0]?.image_path} alt="" width="80" height="80" />
                    </div>
                </div>
            </div>    
        ) : null
    )
}