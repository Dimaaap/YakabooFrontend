import Image from 'next/image';
import React from 'react';
import {
  Breadcrumbs,
  BuyBtn,
  Delivery,
  DeliveryTerms,
  PayByParts,
} from '../shared';
import Link from 'next/link';
import { Advertisment, ContainerPhoto } from '.';

export const GameContainer = () => {
  const IMAGES = [
    'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg',
    'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg',
    'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg',
  ];

  return (
    <div className="container game-container product-container">
      <ContainerPhoto images={IMAGES} />

      <div className="product-container__center-part container-main">
        <Breadcrumbs
          linksList={{
            'Настільні ігри': '/board-games',
            'Головоломки і Кросворди': 'holovolomky-i-krosvordy',
          }}
        />
        <div className="product-container__block">
          <h3 className="container__product-title">
            Книга подорожуємо світом. Гра-ходилка
          </h3>
          <div className="container__reviews review">
            <div className="review__stars">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Image
                    src="/icons/star.svg"
                    alt=""
                    width="15"
                    height="15"
                    key={index}
                  />
                ))}
            </div>
            <p className="review__count">4 відгуки</p>
          </div>
        </div>

        <div className="container__format product-format">
          <p className="product-format__title">Формат</p>
          <div className="product-format__tail">
            <div className="product-format__row">
              <Image src="/icons/book-pink.svg" alt="" width="20" height="20" />
              <p className="product-format__format-name">Паперова</p>
            </div>
            <div className="product-format__row">
              <h5 className="product-format__price orange-text">131 грн</h5>
            </div>
          </div>
        </div>

        <div className="container__product-main-info product-main-info">
          <dl className="product-main-info__section">
            <dt className="product-main-info__title">Мова книги</dt>
            <dd className="product-main-info__description">Українська</dd>

            <dt className="product-main-info__title">Видавництво</dt>
            <dd className="product-main-info__description">Зірка</dd>

            <dt className="product-main-info__title">Рік видання</dt>
            <dd className="product-main-info__description">2020 рік</dd>
          </dl>
        </div>

        <div className="container__categories">
          <p className="container__categories-title">Категорії</p>
          <div className="container__categories-list">
            <Link href="#" className="container__category">
              Головоломки і кросворди
            </Link>
            <Link href="#" className="container__category">
              Ознайомлення зі світом навколо нас
            </Link>
            <Link href="#" className="container__category">
              Настільні ігри
            </Link>
          </div>
        </div>

        <p className="container__product-description">
          Ігровий процес простий і зрозумілий навіть найменшим гравцям: потрібно
          кинути кубик і зробити відповідну кількість "кроків" по карті.
          Перемагає той гравець, який першим дійде до фінішу. Дитина в процесі
          гри навчиться рахувати, логічно мислити, розвине уяву і посидючість, а
          також зможе ознайомитись із країнами світу та тим, де вони
          знаходяться. У наборі: ігрове поле 42х29 см, 3 фішки, гральний кубик.
        </p>

        <div className="container__product-features product-features">
          <h6 className="product-features__title">Характеристики</h6>
          <div className="product-features__table">
            <div className="product-features__row">
              <p className="product-features__text">Формат</p>
              <p className="product-features__value">290x420 мм</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Тип</p>
              <p className="product-features__value">Паперова</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Вік</p>
              <Link className="product-featrues__value link" href="#">
                Від 6 до 8 років
              </Link>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Ілюстрації</p>
              <p className="product-features__value">Кольорові</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Видавництво</p>
              <Link className="product-featrues__value link" href="#">
                Зірка
              </Link>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">ISBN</p>
              <p className="product-features__value">9786176341383</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Формат боксу</p>
              <p className="product-features__value">305x205x25 мм</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Мова</p>
              <p className="product-features__value">Українська</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Тип обкладинки</p>
              <p className="product-features__value">Коробка</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Рік видання</p>
              <p className="product-features__value">2020</p>
            </div>
            <div className="product-features__row">
              <p className="product-features__text">Папір</p>
              <p className="product-features__value">Картон</p>
            </div>
          </div>

          <button className="product-features__hide-all">
            Приховати всі Характеристики
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width="15"
              height="15"
            />
          </button>
        </div>
      </div>

      <div className="product-container__right-part container-info">
        <div className="container-info__price-container">
          <div className="container-info__row">
            <p className="container-info__price-container orange-text">
              131 грн
            </p>
            <p className="container-info__old-price cancelled-text">156 грн</p>
            <div className="container-info__bonuses product-bonuses">
              <Image src="/icons/bonuses.svg" alt="" width="15" height="15" />
              <p className="container-info__bonuses-count">+66</p>
            </div>
          </div>
          <div className="container-info__row">
            <div className="container-info__status">
              <Image
                src="/icons/green-truck.svg"
                alt=""
                width="13"
                height="13"
              />
              <p className="container-info__status-text green-text">
                В наявності
              </p>
            </div>
            <div className="dot"></div>
            <p className="container-info__type">Настільна гра</p>
          </div>

          <Advertisment />

          <BuyBtn />

          <PayByParts />

          <Delivery city="Київ" />

          <DeliveryTerms />
        </div>
      </div>
    </div>
  );
};
