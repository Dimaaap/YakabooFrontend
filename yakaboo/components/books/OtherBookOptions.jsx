import Image from "next/image"
import Link from "next/link"

export const OtherBookOptions = ({ book }) => {
    return(
        <div className="other-options">
            <h4 className="other-options__title">
                Варіанти інших видань
            </h4>
            <div className="other-options__options-container">
                <Link className="other-options__option option" href="#">
                    <div className="option__header">
                        <div className="option__image-container">
                            <Image src="https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/7/5/757936_1_original.jpg"
                            alt="" width="30" height="30" />
                        </div>
                        <div className="option__description-container">
                            <p className="option__book-title">
                                Пісня льоду і полум'я. Книга п'ята. Танок драк...
                            </p>
                            <p className="option__book-price blue-text">
                                1300 грн
                            </p>
                            <p className="option__book-status">
                                <Image src="/icons/green-truck.svg" alt="" width="15" height="15" />
                                В наявності
                            </p>
                        </div>
                    </div>
                    <div className="option__characteristics">
                        <div className="option__cell">
                            <p className="option__cell-title">
                                Мова книги
                            </p>
                            <p className="option__cell-value">
                                Українська
                            </p>
                        </div>
                        <div className="option__cell">
                            <p className="option__cell-title">
                                Формат
                            </p>
                            <p className="option__cell-value">
                                Паперова
                            </p>
                        </div>
                        <div className="option__cell">
                            <p className="option__cell-title">
                                Рік видання
                            </p>
                            <p className="option__cell-value">
                                2022
                            </p>
                        </div>  
                        <div className="option__cell">
                            <p className="option__cell-title">
                                Видавництво
                            </p>
                            <p className="option__cell-value link">
                                Stone Publishing
                            </p>
                        </div>   
                        <div className="option__cell">
                            <p className="option__cell-title">
                                Палітурка
                            </p>
                            <p className="option__cell-value">
                                Тверда
                            </p>
                        </div>   
                        <div className="option__cell">
                            <p className="option__cell-title">
                                Сторінки
                            </p>
                            <p className="option__cell-value">
                                1120
                            </p>
                        </div>       
                    </div>
                </Link>    
            </div>
            
            <span className="other-options__view-all">
                Показати все
                <Image src="/icons/arrow-left.svg" alt="" width="12" height="12" />
            </span>
        </div>
    )
}