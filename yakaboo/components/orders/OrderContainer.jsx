import Link from "next/link"

const { default: Image } = require("next/image")

const OrderContainer = () => {
    return(
        <div className="order-container">
            <h4 className="order-container__title">
                Замовлення
            </h4>
            <ul className="order-container__options-list">
                <li className={`order-container__point active`}>
                    Всі
                </li>
                <li className="order-container__point">
                    Скасовані
                </li>
                <li className="order-container__point">
                    Поточні
                </li>
                <li className="order-container__point">
                    Невиконані
                </li>
                <li className="order-container__point">
                    Виконані
                </li>
            </ul>
            <div className="order-container__order">
                <div className="order-container__header">
                    <p className="order-container__order-number">
                        №6005280792
                    </p>
                    <small className="order-container__date">
                        2 червня 2025 р
                    </small>
                    <small className="order-container__status">
                        Доставлено
                    </small>
                </div>
                <div className="order-container__items">
                    <Link className="order-container__item" href="#">
                        <div className="order-container__item-info">
                            <Image src="https://static.yakaboo.ua/media/catalog/product/c/o/cover_1_1_135.jpg" 
                            alt="" width="80" height="80" className="order-container__item-img" />
                            <div className="order-container__item-text">
                                <p className="order-container__item-title">
                                    Пісня льоду і полум'я. Книга 2. Битва королів
                                </p>
                                <p className="order-container__item-author">
                                    Джордж Р.Р. Мартін
                                </p>
                                <div className="order-container__item-types-row">
                                    <span className="order-container__item-price">
                                        1000 грн
                                    </span>
                                    <div className="separator" />
                                    <span className="order-container__additional-info">
                                        Паперові
                                    </span>
                                    <div className="separator" />
                                    <span className="order-container__additional-info">
                                        Код 965636
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="order-container__item-quantity">
                            1 шт
                        </p>
                    </Link>

                    <div className="order-container__items-footer">
                            <button className="order-container__btn repeat-btn">
                                Повторити замовлення
                            </button>
                            <div className="order-container__order-info">
                                <p className="order-container__total-price">
                                    Разом <span className="order-container__total">1 000 грн</span>
                                </p>
                                <span className="order-container__show-more">
                                    Детальніше
                                </span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default OrderContainer