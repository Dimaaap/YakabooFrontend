import Link from "next/link"
import { firstParagraph } from "../../services/paragraphSlicer.service"
import Image from "next/image"

export const BookAuthorBlock = ({ book, author }) => {
    return (
        author ? (
            <div className="book-container__block-container">
                
                <h2 className="book-container__header">
                    Про автора
                </h2>
                        
                <div className="book-container__author-desc">
                    <div className="book-container__author-info">
                        <div className="book-container__desc-container" 
                        dangerouslySetInnerHTML={{__html: firstParagraph(book.authors[0]?.description)}} />  

                        <div className="book-container__author-image-container">
                            { author?.images[0] && (
                                <Image src={ author.images[0]?.image_path } className="book-container__author-image" 
                                alt={`${author.first_name} ${author.last_name} Image`} width={80} height={80} />    
                            ) }
                            
                        </div>  
                    </div>
                    {!book?.is_notebook && (
                        <Link href={`/author/view/${book.authors[0]?.slug}`} className="book-container__link extended-link">
                            Детальніше про автора
                        </Link>    
                    )}
                </div>
            </div>    
        ) : null
    )
}