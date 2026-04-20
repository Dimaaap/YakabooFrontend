import Link from "next/link"
import Image from 'next/image'

export const BookInfoBlock = ({ book, isGift, withTitle=true }) => {

    const filteredRelatedBooks = book?.related_books ? Object.values(
        book.related_books.reduce((acc, b) => {
            const fmt = b?.book_info?.format 
            
            if(!fmt) return acc 

            if(!acc[fmt]){
                acc[fmt] = b
            }

            else if(b.price < acc[fmt].price){
                acc[fmt] = b
            }

            return acc
        }, {})
    ) : []

    return(
         <>
            {!isGift && (
                <div className="book-container__block format">
                    { withTitle && (
                        <p className="book-container__block-title">Формат</p>    
                    ) }
                    <div className="book-container__tiles-block">
                    { filteredRelatedBooks.length > 0 && (
                        filteredRelatedBooks.map((b, index) => (
                            b.book_info.format === book.book_info.format ? (
                                <div className="book-container__tile tile format-tile active" key={ index }>
                                    <div className="book-container__tile-header tile__header">
                                        <Image src={`${b.book_info?.format === "Паперова" ? "/icons/book.svg" : "/icons/mobile-phone-pink.svg"}`}
                                        alt="" width="18" height="18" />
                                        <p className="tile__header">{ b.book_info.format }</p>
                                    </div>
                                    <div className="book-container__tile-price tile-price">
                                        { book.price }
                                    </div>
                                </div>
                            ) : (
                                <Link className="book-container__tile tile format-tile" key={ index } href={`/book/${b.slug}`}>
                                    <div className="book-container__tile-header tile__header">
                                        <Image src={`${b?.book_info?.format === "Паперова" ? "/icons/book.svg" : "/icons/mobile-phone-pink.svg"}`}
                                        alt="" width="18" height="18" />
                                        <p className="tile__title">{ b.book_info.format }</p>
                                    </div>
                                    <h4 className="tile__price">{ b.price } грн</h4>    
                                </Link>
                            )  
                        ))
                    ) }

                    { filteredRelatedBooks.length < 1 && (
                        <div className="book-container__tile tile format-tile active">
                            <div className="book-container__tile-header tile__header">
                                <Image src={`${book.book_info?.format === "Паперова" ? "/icons/book.svg" : "/icons/mobile-phone-pink.svg"}`}
                                alt="" width="18" height="18" />
                                <p className="tile__header">{ book.book_info.format }</p>
                            </div>
                            <div className="book-container__tile-price tile-price">
                                { book.price } грн
                            </div>
                        </div>
                    ) }
                    </div>
                </div>
                )}
        </>
    )
}