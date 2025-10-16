import Image from "next/image"
import Link from "next/link"

export const OtherBookOptions = ({ book }) => {
    return(
        <div className="other-options">
            <h4 className="other-options__title">
                Варіанти інших видань
            </h4>
            <div className="other-options__options-container">
                { book?.related_books?.length > 0 && (
                    book.related_books.map((book, index) => (
                    <Link className="other-options__option option" key={ index } href={`/book/${book.slug}`}>
                        <div className="option__header">
                            <div className="option__image-container">
                                <Image src={book?.images[0]?.image_url}
                                alt="" width="30" height="30" />
                            </div>
                            <div className="option__description-container">
                                <p className="option__book-title">
                                    { book.title }
                                </p>
                                <p className="option__book-price blue-text">
                                    { book.price }
                                </p>
                                <p className="option__book-status">
                                    { book.book_info?.in_stock && (<Image src="/icons/green-truck.svg" alt="" width="15" height="15" />) }
                                    { book.book_info.in_stock ? "В наявності" : "Немає в наявності" }
                                </p>
                            </div>
                        </div>
                        <div className="option__characteristics">
                            <div className="option__cell">
                                <p className="option__cell-title">
                                    Мова книги
                                </p>
                                <p className="option__cell-value">
                                    { book.book_info.language }
                                </p>
                            </div>
                            <div className="option__cell">
                                <p className="option__cell-title">
                                    Формат
                                </p>
                                <p className="option__cell-value">
                                    { book.book_info.format }
                                </p>
                            </div>
                            { book?.book_info?.publishing_year > 0 && (
                                <div className="option__cell">
                                    <p className="option__cell-title">
                                        Рік видання
                                    </p>
                                    <p className="option__cell-value">
                                        { book.book_info.publishing_year }
                                    </p>
                                </div>      
                            ) }
                            
                            <div className="option__cell">
                                <p className="option__cell-title">
                                    Видавництво
                                </p>
                                <p className="option__cell-value link">
                                    { book.publishing.title }
                                </p>
                            </div>   
                            { book?.book_info.format === "Паперова" && (
                                <div className="option__cell">
                                    <p className="option__cell-title">
                                        Палітурка
                                    </p>
                                    <p className="option__cell-value">
                                        { book.book_info.cover_type }
                                    </p>
                                </div>       
                            ) }
                            
                            { book?.book_info?.pages_count && (
                                <div className="option__cell">
                                    <p className="option__cell-title">
                                        Сторінки
                                    </p>
                                    <p className="option__cell-value">
                                       { book.book_info.pages_count } 
                                    </p>
                                </div>      
                            ) }    
                        </div>
                    </Link>      
                    ))
                ) }
                   
            </div>
            
            <span className="other-options__view-all">
                Показати все
                <Image src="/icons/arrow-left.svg" alt="" width="12" height="12" />
            </span>
        </div>
    )
}