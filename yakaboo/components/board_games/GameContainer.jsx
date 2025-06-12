'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
  Breadcrumbs,
  BuyBtn,
  Delivery,
  DeliveryTerms,
  PayByParts,
  TextReviews,
} from '../shared';
import Link from 'next/link';
import { Advertisment, ContainerPhoto } from '.';

export const GameContainer = () => {
  const IMAGES = [
    'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg',
    'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg',
    'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_52333.jpg',
  ];

  const [showAllFeatures, setShowAllFeatures] = useState(false);

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

        <div className="container__format product-format board-format">
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
            <div className="product-main-info__wrapper">
              <dt className="product-main-info__title">Мова книги</dt>
              <dd className="product-main-info__description">Українська</dd>
            </div>
            <div className="product-main-info__wrapper">
              <dt className="product-main-info__title">Видавництво</dt>
              <dd className="product-main-info__description">Зірка</dd>
            </div>
            <div className="product-main-info__wrapper">
              <dt className="product-main-info__title">Рік видання</dt>
              <dd className="product-main-info__description">2020 рік</dd>
            </div>
          </dl>
        </div>

        <div className="product-container__categories">
          <p className="product-container__categories-title">Категорії</p>
          <div className="product-container__categories-list">
            <Link href="#" className="product-container__category">
              Головоломки і кросворди
            </Link>
            <Link href="#" className="product-container__category">
              Ознайомлення зі світом навколо нас
            </Link>
            <Link href="#" className="product-container__category">
              Настільні ігри
            </Link>
          </div>
        </div>

        <p className="product-container__product-description">
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
              <Link className="product-features__value link" href="#">
                Від 6 до 8 років
              </Link>
            </div>

            {!showAllFeatures && (
              <button
                className="product-features__hide-all show"
                onClick={() => setShowAllFeatures(true)}
              >
                Показати всі характеристики
                <Image
                  src="/icons/chevron-down.svg"
                  alt=""
                  width="20"
                  height="20"
                />
              </button>
            )}
            {showAllFeatures && (
              <>
                <div className="product-features__row">
                  <p className="product-features__text">Ілюстрації</p>
                  <p className="product-features__value">Кольорові</p>
                </div>
                <div className="product-features__row">
                  <p className="product-features__text">Видавництво</p>
                  <Link className="product-features__value link" href="#">
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
                <button
                  className="product-features__hide-all"
                  onClick={() => setShowAllFeatures(false)}
                >
                  Приховати всі Характеристики
                  <Image
                    src="/icons/chevron-down.svg"
                    alt=""
                    width="20"
                    height="20"
                  />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="container__text-reviews text-reviews">
          <div className="text-reviews__header">
            <p className="product-format__title">Відгуки</p>

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

          <div className="text-reviews__container">
            <button className="text-reviews__write-review" type="button">
              Залишити відгук
            </button>

            <TextReviews
              grade={4}
              reviewTheme="Странный подбор географических локаций"
              reviewText="В целом игра понравилась, кроме порванной упаковки, впрочем на сам игровой картон 
              это не повлияло. Геймплей хорошо подобран, чтобы играть было интересно. Что меня удивило, 
              это выбор некоторых странных локаций, хотя на полноту никто и не расчитывал. Представлены 
              следующие 'не государства': остров Пасхи (это можно понять), Тасмания (тоже известный остров), 
              Бали (туристический остров), Тенерифе. При этом Эстония, Португалия, Словения место им не нашлось, 
              зато есть Западная Сахара, Палестина? У меня вопрос, к чему они тут?"
            />

            <TextReviews
              reviewDate="20 липня 2021р."
              reviewAuthor="Allavtor"
              reviewTheme="Цікава гра"
              reviewText="Придбала гру 'Подорожуємо світом. Гра-ходилка' для доньки та її друзів. Діти одразу ж 
              полюбили грати у цю гру. Правила гри зрозумілі навіть найменшим: треба кидати кубик та ходити певну 
              кількість ходів фішками. Гра захоплює учасників, інколи доводиться пересунути фішку далеко назад, або 
              перелетіти слідуючи стрілці уперід, все це сповено щирими дитячими емоціями. Гра досить яскрава, гарно 
              оформлена, ігрове поле добре продумане. Діти під час гри вивчають різні країни та їх особливості. Нам 
              усією сім'єю подобається грати у цю корисну гру. Рекомендуємо до придбання!"
            />

            <TextReviews
              reviewDate="10 липня 2021р."
              reviewAuthor="Rina Forsait"
              reviewTheme="Подорожуємо світом. Гра-ходилка"
              reviewText='Мої учні та студенти обожнюють грати у настільні ігри. Тому, я стараюся завжди використовувати для 
              представлення нової теми. "Подорожуємо світом. Гра-ходилка" - стала моїм незамінним помічником для висвітлення 
              тем: "Travelling", "Countries and Nationalities", "Geography", "Landmarks" та багатьох інших. Сама дошка 
              для гри зроблена з цупкого картону, фішки та кубик - були в комплекті. Гра приїхала у картонній коробці, 
              яка була геть подерта. Не знаю, чи то - брак, чи - наша чудо Укрпошта. Але саме ігрове поле, на щастя не 
              постраждало, тому - все о.к. Ігрове поле я заламінувала і тепер йому точно нічого не загрожує. Гарне кольорове 
              оформлення, багато підступних ходів і переходів, діти були в захваті. Усі написи зроблені чітким розбірливим 
              шрифтом українською мовою. Тому я додала ще один варіант використання гри - переклад на англійську. В 
              такій динамічній та цікавій формі студентам набагато легше запам`ятовувати географічні назви. Це - 
              більш ефективно, ніж просто зазубрити назви країн з підручника. Грою я дуже задоволена! Чекаю чогось подібного 
              в англомовному варіанті) Дякую Yakaboo!'
            />
          </div>

          <div className="text-reviews__pagination">
            <button className="text-reviews__pagination-btn prev-btn">
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width="20"
                height="20"
              />
            </button>

            <div className="text-reviews__pages-number">
              <button className="text-reviews__number-count active-page">
                1
              </button>
              <button className="text-reviews__number-count">2</button>
            </div>

            <button className="text-reviews__pagination-btn next-btn active">
              <Image
                src="/icons/chevron-down.svg"
                alt=""
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="product-container__right-part container-info">
        <div className="container-info__price-container">
          <div className="container-info__row">
            <p className="container-info__price-container-title orange-text">
              131 грн
            </p>
            <p className="container-info__old-price cancelled-text">156 грн</p>
            <div className="container-info__bonuses product-bonuses">
              <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
              <p className="product-bonuses__bonuses-count">+66</p>
            </div>
          </div>
          <div className="container-info__row">
            <div className="container-info__status">
              <Image src="/icons/truck.svg" alt="" width="15" height="15" />
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
