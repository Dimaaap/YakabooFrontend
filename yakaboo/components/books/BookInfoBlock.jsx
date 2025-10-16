import Link from "next/link"
import Image from 'next/image'

export const BookInfoBlock = ({ book, info, isGift }) => {

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
                    <p className="book-container__block-title">Формат</p>
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
                        </div>
                    ) }
                    </div>
                </div>
                )}

            <div className="book-container__blocks">
                <div className="book-container__block language-block">
                    <p className="book-container__block-title">{!isGift ? "Мова книги" : "Мова"}</p>
                    <div className="book-container__tiles-block">
                        <div className={`book-container__tile tile ${info?.language === "Українська" ? "current" : ""}`}>
                            <p className="tile__desc">Українська</p>
                        </div>
                </div>
            </div>

            {!isGift && (
                <div className="book-container__block publishing-block">
                    <p className="book-container__block-title">Видавництво</p>
                    <div className="book-container__tiles-block">
                        <div className="book-container__tile tile small-tile current">
                            <Link className="book-container__link publishing-link" href={`/book_publisher/view/${book?.publishing?.slug}`}>
                                {book?.publishing?.title}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {!isGift && info?.publishing_year !== 0 && (
                <div className="book-container__block publishing-block">
                    <p className="book-container__block-title">Рік видання</p>
                    <div className="book-container__tiles-block">
                        <div className="book-container__tile tile small-tile current">
                            <p className="tile__desc">{info?.publishing_year}</p>
                        </div>
                    </div>
                </div>
            )}

            {isGift && (
                <Link className="book-container__block publishing-block" href={`/gifts/category/${book?.gift_category?.slug}`}>
                    <p className="book-container__block-title">Категорія</p>
                    <div className="book-container__tiles-block">
                        <div className="book-container__tile tile">
                            <p className="tile__desc">{book?.gift_category?.title}</p>
                        </div>
                    </div>
                </Link>
            )}
            </div>
        </>
    )
}