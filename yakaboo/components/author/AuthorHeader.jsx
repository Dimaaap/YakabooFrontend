import React from 'react'
import "../../styles/main.scss";
import Image from 'next/image';
import { AuthorFacts } from '../shared';

export const AuthorHeader = () => {
  return (
    <div className="author-header">
      <div className="author-header__left">
        <div className="author-header__images">
            <div className="author-header__main-image">
                <Image src="/images/authors/1.jpg" alt="" width="200" height="200" />
            </div>
            <div className="author-header__small-images-row">
                <Image src="/images/authors/1.jpg" alt="" width="40" height="40" />
                <Image src="/images/authors/2.jpg" alt="" width="40" height="40" />
                <Image src="/images/authors/3.jpg" alt="" width="40" height="40" />
                <Image src="/images/authors/4.jpg" alt="" width="40" height="40" />
            </div>
        </div>
      </div>
      <div className="author-header__center">
        <h3 className="author-header__title">
            Стівен Кінг - книги і біографія
        </h3>
        <div className="author-header__info-table">
            <div className="author-header__table-row">
                <div className="author-header__table-cell left-cell">
                    <p>Повне ім'я</p>
                </div>
                <div className="author-header__table-cell right-cell">
                    <p>Стівен Кінг</p>
                </div>
            </div>
            <div className="author-header__table-row">
                <div className="author-header__table-cell left-cell">
                    <p>Дата народження</p>
                </div>
                <div className="author-header__table-cell right-cell">
                    <p>21 вересня 1947 р.</p>
                </div>
            </div>
        </div>
        <p className="author-header__short-desc">
            Один з найбільш відомих американських письменників сучасності, що отримав неофіційний титул 
            «Короля жахів». Романи та оповідання Стівена Кінга розійшлися по світу сумарним тиражем
            понад 350 мільйонів примірників, багато творів отримали повнометражні екранізації, 
            телевізійні і навіть театральні постановки. Літературному стилю автора 
            властива гострота, моторошні сюжети, увага до діалогів і пристрасть до 
            викриття людських пороків. Купити книги Стівена Кінга варто всім поціновувачам 
            сучасної прози в цілому і жанру жахів і містики конкретно.
        </p>
        <h3 className="author-header__long-desc-title">
            Література, що льодянить душу: всі книги Стівена Кінга
        </h3>
        <p className="author-header__long-desc">
            Майбутня зірка літе...
        </p>
        <button className="author-header__more-info">
            Показати повністю 
            <Image src="/icons/arrow-left.svg" alt="" width="16" height="16" />
        </button>
      </div>

      <div className="author-header__right">
        <AuthorFacts factText="Кінг встановив для себе певну письменницьку 'квоту' - 2000 слів кожен день." />
      </div>
    </div>
  )
}