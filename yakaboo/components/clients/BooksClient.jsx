"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Endpoints from "../../endpoints";
import { STALE_TIME } from "../../site.config";
import { Banner } from "../main";
import { CardsContainer, Filters, Spinner } from "../shared";
import { SeenBooks } from "../shared/SeenBooks";
import { CookiesWorker } from "../../services";
import Link from "next/link";

export const BooksClient = () => {

    const userEmail = CookiesWorker.get("email") || null;

    const { data: banners = [], isBannersLoading } = useQuery({
        queryKey: ["books-banners"],
        queryFn: () => fetcher(Endpoints.ALL_BOOKS_BANNERS),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    const { data: categories = [], isLoading: isCategoryLoading } = useQuery({
        queryKey: ["book-categories"],
        queryFn: () => fetcher(Endpoints.ALL_BOOK_CATEGORIES),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    const { data: userSeenBooks = [], isLoading: isSeenBooksLoading } = useQuery({
        queryKey: ["user-seen-books", userEmail],
        queryFn: () => fetcher(Endpoints.ALL_USER_SEEN_BOOKS(userEmail)),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    if(isBannersLoading || isCategoryLoading) return <Spinner />

    return (
        <div className="main-container all-books-container">
            <div className="all-books-container__banner-wrapper">
                <Banner banners={ banners } bigger={ true } />    
            </div>
            <div className="all-books-container__body">
                <div className="all-books-container__section">
                    <Filters needLanguages={ true } needFilters={ true } needBookTypes={ true } 
                    needAuthors={ true } needPublishers={ true } needCategories={ false } needBookCategories={ true } 
                    bookCategories={ categories } needBookSeria={ true } />

                    <CardsContainer source={{ type: "all" }} categoryTitle="Всі книги" />
                </div>
                { isSeenBooksLoading ? (<Spinner />) : (
                    <SeenBooks books={ userSeenBooks } />    
                ) }

                <div className="all-books-container__text-content">
                    <p className="all-books-container__text-block">
                        Національна книжкова платформа України Yakaboo – це інтернет-магазин, який протягом двох десятиліть допомагає читачам 
                        знаходити книги для натхнення, навчання та розваг. Ми пропонуємо не лише величезний вибір паперових книг, а й інші формат, 
                        щоб кожен міг у зручній для себе формі долучитися до літератури. Тут кожен знайде те, що шукає, будь то захоплюючий роман, 
                        наукове дослідження чи дитячий буклет. 
                    </p>

                    <h2 className="all-books-container__text-header">
                        Сучасні формати книг для будь-якого способу життя
                    </h2>

                    <p className="all-books-container__text-block">
                        Ми розуміємо, що ритм життя у кожного різний, тож пропонуємо купити книгу в Україні у різних форматах:
                    </p>

                    <ul className="all-books-container__text-list">
                        <li className="all-books-container__text-list-point">
                            Паперові видання. Класика, яка завжди залишається у тренді. Жодні гаджети не замінять задоволення від перегортання сторінок.
                        </li>
                        <li className="all-books-container__text-list-point">
                            <span className="all-books-container__black-text">
                                Електронні книги.
                            </span>
                            Зручний варіант для тих, хто вважає за краще читати літературу в електронному форматі на смартфоні, планшеті або рідері. 
                            Це завжди зручний доступ до улюбленої книги на будь-якому пристрої в будь-якій точці світу.
                        </li>

                        <li className="all-books-container__text-list-point">
                            <span className="all-books-container__black-text">
                                Аудіокнига.
                            </span>
                            Немає часу на читання? Той, хто дійсно хоче читати, завжди знайде для цього можливість і аудіокниги - чудовий варіант. 
                            Слухайте улюблені твори в дороі, під час тренування чи вдома та насолоджуйтесь професійним акторським озвученням
                        </li>
                    </ul>

                    <p className="all-books-container__text-block">
                        При купівлі в електронному вигляді ви отримуєте до неї миттєвий доступ, що дозволить насолодитись бажаними книгами 
                        онлайн або отримати необхідну для навчання інформацію негайно. Доставка паперових книжок по Києву та Україні не змусить 
                        на себе довго чекати - ми надсилаємо всі замовлення максимально оперативно.
                    </p>

                    <h2 className="all-books-container__text-header">
                        Величезний вибір жанрів книг онлайн: від відчної класики до гарячих новинок
                    </h2>

                    <p className="all-books-container__text-block">
                        Ми хочемо, щоб ви читали більше. Тому підготували широкий асортимент літератури найрізноманітніших жанрів та напрямків:
                    </p>

                     <ul className="all-books-container__text-list">
                        <li className="all-books-container__text-list-point">
                            Класика, перевірена часом.
                        </li>
                        <li className="all-books-container__text-list-point">
                           Сучасна проза та поезія, яка відображає актуальні теми.
                        </li>

                        <li className="all-books-container__text-list-point">
                            Детективи, які тримають у напрузі до останньої сторінки.
                        </li>

                        <li className="all-books-container__text-list-point">
                            Наукова література, що дає змогу відкрити нові горизонти знань.
                        </li>

                        <li className="all-books-container__text-list-point">
                            Фантастика та фентезі для занурення в інші світи.
                        </li>

                        <li className="all-books-container__text-list-point">
                            Дитяча література та посібники для малюків.
                        </li>
                    </ul>

                    <p className="all-books-container__text-block">
                        Ми співпрацюємо з видавництвами з різних країн, пропонуючи читачам недорого замовити книги, які надихають, навчають та дивують.
                    </p>

                    <h2 className="all-books-container__text-header">
                       Книги від всесвітньо відомих та українських авторів
                    </h2>

                    <p className="all-books-container__text-block">
                       В Yakaboo можливо купити книжки як всесвітньо відомих авторів, так і талановитих українських письменників Шанувальники 
                       зарубіжної літератури знайдуть у нас твори таких майстрів, як Джоан Роулінг, Джордж Мартін, Стівен Кінг та Харукі Муракамі. 
                       Любителі української літератури можуть відкрити для себе твори Сергія Жадана, Ліни Костенко, Оксани Забужко та Ірен Роздобудько. 
                       Наш асортимент поєднує класиків, сучасних письменників та дебютантів, чиї книги вже підкорюють читачів, тому ви завжди зможете 
                       долучитися до тренду чи знайти перлину серед сучасних авторів.
                    </p>

                    <h2 className="all-books-container__text-header">
                       Індивідуальні добірки та тематичні колекції книг
                    </h2>

                    <p className="all-books-container__text-block">
                        Якщо ви не знаєте, з чого почати, завітайте до нашого розділу 
                        <Link href="/book-categories/dobirky-yakaboo" className="all-books-container__black-text">тематичних добірок</Link>. 
                        Тут ви знайдете та зможете замовити ретельно 
                        відібрані книги за жанрами, темами чи настроєм. Це чудовий спосіб швидко знайти книжку улюбленого вами жанру, відкрити для себе 
                        нове або вибрати подарунок для близької людини.
                    </p>

                    <h2 className="all-books-container__text-header">
                       Чому паперові книги завжди залишаються актуальними
                    </h2>

                    <p className="all-books-container__text-block">
                        Безумовно, книги в електронному форматі - це зручно та практично. Однак складно також оскаржити ту неповторну естетику, 
                        яку дарує паперова книга. Вона дає почуття спокою, умиротворення, дозволяє окреслити невидимі кордони, зовні яких 
                        залишиться повсякденність, а всередині тільки ви й історія, викладена автором на сторінках. А ще це чудовий подарунок, 
                        який радуватиме у колекції на полиці довгі роки та нагадувати про увагу того, хто його подарував.
                    </p>

                    <h2 className="all-books-container__text-header">
                       Чому купити книгу в інтернет-магазині Yakaboo - це зручно і недорого?
                    </h2>

                    <p className="all-books-container__text-block">
                        Чому варто купити книги саме у нас:
                    </p>

                    <ul className="all-books-container__text-list">
                        <li className="all-books-container__text-list-point">
                            Широкий асортимент. У нашому каталозі можна замовити книги найрізноманітніших жанрів та напрямків.
                        </li>
                        <li className="all-books-container__text-list-point">
                            Вигідні ціни. Ми безпосередньо співпрацюємо з видавництвами, пропонуючи літературу для будь-якого бюджету.
                        </li>
                        <li className="all-books-container__text-list-point">
                            Доставка по Києву і всієї України. Незалежно від вашого місця розташування, ми доставимо замовлення в найкоротші терміни.
                        </li>
                        <li className="all-books-container__text-list-point">
                            Акції та знижки. На нашому сайті ви знайдете приємні знижки та спеціальні пропозиції, з якими купити цікаву літературу 
                            можна за ще вигіднішою ціною.
                        </li>
                        <li className="all-books-container__text-list-point">
                            Зручний інтерфейс. Завдяки нашому інтуїтивному інтерфейсу та зручній навігації ви зможете швидко знайти і замовити те, що вам
                             потрібно, а оформлення замовлення займе не більше кількох хвилин.
                        </li>
                    </ul>

                     <p className="all-books-container__text-block">
                        Крім того, на нашому сайті можна купити книжкові аксесуари, які зроблять читання ще комфортніши<br/>
                        Yakaboo допоможе наповнити життя натхненням та занурити вас у захоплюючі історії, які залишаться у серці назавжди!
                    </p>

                    <h2 className="all-books-container__text-header">
                       Книжки: питання, що часто ставляться
                    </h2>

                    <h5 className="all-books-container__text-subheader">
                        1️⃣ Книжки - де купити вигідно?
                    </h5>

                    <p className="all-books-container__text-block">
                        У категорії «Книжки» на сайті YAKABOO є більше 1214305 книг. У нас регулярно діють різноманітні акції та 
                        спеціальні пропозиції на купівлю книг. Ми співпрацюємо з більш ніж 500 українськими та зарубіжними видавництвами, в 
                        YAKABOO ви завжди зможете знайти потрібну книгу за вигідною ціною.
                    </p>

                    <h5 className="all-books-container__text-subheader">
                        2️⃣ На яких мовах є книг у розділі?
                    </h5>

                    <p className="all-books-container__text-block">
                        Книжки, представлена на сайті, є 60 мовами. Найбільше книг українською мовою.
                    </p>

                    <h5 className="all-books-container__text-subheader">
                       3️⃣ Які ціни на книг в розділі «Книжки»?
                    </h5>

                    <p className="all-books-container__text-block">
                        У розділі «Книжки» діапазон цін на книг від 0 до 869400 грн. На сайті YAKABOO завжди актуальні ціни на книг та регулярно оновлюється каталог товарів.
                    </p>
                </div>
            </div>
        </div>
    )
}
