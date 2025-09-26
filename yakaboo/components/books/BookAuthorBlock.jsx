import Link from "next/link"

export const BookAuthorBlock = ({ book, author }) => {
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
                        {!book?.is_notebook && (
                            <Link href={`/author/view/${book.authors[0]?.slug}`} className="book-container__link extended-link">
                                Детальніше про автора
                            </Link>    
                        )}
                          
                    </div>
                </div>
            </div>    
        ) : null
    )
}