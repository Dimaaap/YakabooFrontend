import Link from "next/link";

export default function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-page__top-section">
                <h1 className="not-found-page__title">
                    Сторінку не знайдено
                </h1>
                <p className="not-found-page__text">
                    Помилка 404
                </p>
            </div>
            <div className="not-found-page__bottom-section">
                <p className="not-found-page__paragraph">
                    На жаль, сторінки, яку ви шукаєте, не існує
                </p>
                <div className="not-found-page__text-container">
                    <p className="not-found-page__paragrapg">
                        Це могло статись з наступних причин
                    </p>
                    <ul className="not-found-page__list">
                        <li className="not-found-page__point">
                            Неправильно набрана адреса
                        </li>
                        <li className="not-found-page__point">
                            Такої сторінки ніколи не було на цьому сайті
                        </li>
                        <li className="not-found-page__point">
                            Така сторінка була, але за цією адресою її більше немає
                        </li>
                    </ul>    
                </div>
                <div className="not-found-page__text-container">
                    <p className="not-found-page__paragraph">
                        Ви можете
                    </p>
                    <ul className="not-found-page__list">
                        <li className="not-found-page__point">
                            Повернутись на <Link href="/" className="not-found-page__link">головну сторінку сайту</Link> і 
                            там вибрати потрібну категорію товарів
                        </li>
                        <li className="not-found-page__point">
                            Спробувати знайти те, що вам потрібно за допомогою пошуку на нашому сайті
                        </li>
                    </ul>
                </div>
                <div className="not-found-page__text-container">
                    <p className="not-foung-page__paragraph">
                        Якщо ви впевнені, що не помилились набираючи адресу сторінки, і сторінка повинна бути, 
                        <Link className="not-found-page__link" href="mailto:support@yakaboo.com">повідомте про помилку </Link> {" "}
                        адміністартора сайту, за що ми будемо дуже вдячні.
                    </p>
                </div>
            </div>
        </div>
    )
}