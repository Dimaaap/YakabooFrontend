"use client"

import React from 'react'
import Image from "next/image";

import { useProtectedPage } from '../../hooks'; 
import { BookCategoriesWithSubcategoriesModal, MenuModal, ProfileSettingsModal, UserLoginModal } from '../dynamic';
import { useBookCategoriesModalStore, useMenuModalStore, useProfileSettingsModalStore } from '../../states';
import { getUserFullName } from '../../utils';
import { CookiesWorker } from '../../services';
import Link from 'next/link';
import { StatusBadge } from '../shared';
import { linksContainer } from '../../links_container';


export const BonusesClient = () => {

  const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
  const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();
  const { isMenuModalOpen } = useMenuModalStore();
  const { isCategoriesModalOpen } = useBookCategoriesModalStore();

  const userDiscount = Math.round(CookiesWorker.get("bonuses") / 10) || 0

  if(loading){
    return(
        <Image src="/icons/spinner.svg" 
        width="20" height="20" alt=""
        className="animate-spin"
        />
    )
  }

  if(!isAuthenticated){
    return <UserLoginModal afterClose={ handleCloseModal } />
  }
    
  return (
    <div className="bonuses">
      { isMenuModalOpen && <MenuModal /> }
      { isCategoriesModalOpen && <BookCategoriesWithSubcategoriesModal /> }
      { isProfileSettingsModalOpen && <ProfileSettingsModal /> }  
      
      <div className="bonuses__section left-section">
        <div className="settings-header__profile-info">
          <div className="settings-header__profile-left">
            <button className="settings-header__user-btn">
              <Image  src="/icons/user-white.svg" className="settings-header__user-icon" alt="" 
              width="18" height="18" />
            </button>
            <div className="settings-header__profile-main-info">
              <div className="settings-header__profile-user">
              </div>
              <p className="settings-header__username">
                { getUserFullName() }
              </p>
              <span className="settings-header__user_phone">
                +{ CookiesWorker.get("phone_number") }
              </span>
            </div>
          </div>
          <Link href="/my-account" className="settings-header__edit-icon">
            <Image src="/icons/edit.svg" alt="" width="15" height="15" />
          </Link>
        </div>
        <div className="settings-header__tiles-block">
          <Link className="settings-header__tile bonuses-tile" href="my-account/bonuses">
            <div className="settings-header__tile-header">
              <Image src="/icons/bonus.svg" alt="Bonuses" width="18" height="18" 
              className="settings-header__image" />
              <h5 className="settings-header__tile-title">{ CookiesWorker.get("bonuses") || 0 }</h5>
            </div>
            <p className="settings-header__tile-info">
                Баланс бонусів
            </p>
          </Link>
          <Link className="settings-header__tile bonuses-tile" href="my-account/bonuses">
              <div className="settings-header__tile-header">
                <StatusBadge status={ CookiesWorker.get("level") } />
              </div>
              <p className="settings-header__tile-info">
                Ваш рівень
              </p>
          </Link>
        </div>
        <div className="menu__body settings-body">
          <ul className="settings-menu">
            <li className="settings-point">
              <Link href={ linksContainer.account.orders } className="settings-link" onClick={ () => handleLinkClick() }>
                <span className="settings__icon-wrapper">
                  <Image src="/icons/truck-pink.svg" alt="" width="18" height="18" />
                </span>
                <span className="settings__text">
                  Замовлення
                </span>
              </Link>
            </li>
            <li className="settings-point">
              <Link href={ linksContainer.account.library } className="settings-link" onClick={ () => handleLinkClick() }>
                <span className="settings__icon-wrapper">
                  <Image src="/icons/done.svg" alt="" width="18" height="18" />
                </span>
                <span className="settings__text">
                  Моя бібліотека
                </span>
              </Link>
            </li>
            <li className="settings-point">
              <Link href={ linksContainer.account.wishlist } className="settings-link" onClick={ () => handleLinkClick() }>
                <span className="settings__icon-wrapper">
                  <Image src="/icons/heart-pink.svg" alt="" width="18" height="18" />
                </span>
                <span className="settings__text">
                  Бажані книги
                </span>
              </Link>
            </li>
            <li className="settings-point">
              <Link href={ linksContainer.account.waitingList } className="settings-link" onClick={ () => handleLinkClick() }>
                <span className="settings__icon-wrapper">
                  <Image src="/icons/waiting.svg" alt="" width="18" height="18" />
                </span>
                <span className="settings__text">
                    Товари в очікуванні
                </span>
              </Link>
            </li>
            <li className="settings-point">
              <Link href={ linksContainer.account.bonuses } className="settings-link" onClick={ () => handleLinkClick() }>
                <span className="settings__icon-wrapper">
                  <Image src="/icons/bonuses.svg" alt="" width="18" height="18" />
                </span>
                <span className="settings__text">
                    Бонуси
                </span>
              </Link>
            </li>
            <li className="settings-point">
              <Link href={ linksContainer.account.settings } className="settings-link" onClick={ () => handleLinkClick() }>
                  <span className="settings__icon-wrapper">
                    <Image src="/icons/user-pink.svg" alt="" width="18" height="18" />
                  </span>
                  <span className="settings__text">
                    Налаштування
                  </span>
               </Link>
            </li>
            <li className="settings-point">
                <Link href={ linksContainer.account.logout } className="settings-link" onClick={ () => handleLinkClick() }>
                  <span className="settings__icon-wrapper">
                    <Image src="/icons/logout.svg" alt="" width="18" height="18" /> 
                  </span>
                  <span className="settings__text">
                      Вихід
                    </span>
                  </Link>
              </li>
            </ul>
          </div>
      </div>

      <div className="bonuses__section right-section">
        <div className="bonuses__section__info-header">
          <h1 className="bonuses__section__user-name">
            Вітаємо, { CookiesWorker.get("first_name") }!
          </h1>
          <div className="bonuses__section__bonuses-container">
            <div className="bonuses__section__bonuses-count">
              <div className="bonuses__section-section-row">
                <Image src="/icons/bonus.svg" alt="" width="22" height="22" className="bonuses__section-image" />
                <h3 className="bonuses__section-title">{ CookiesWorker.get("bonuses") || 0 }</h3>
              </div>
              <div className="bonuses__section-section-row">
                <p>Баланс бонусів</p>
              </div>
            </div>
            <div className="bonuses__section__bonuses-label">
              <div className="bonuses__section__count-bonuses">
                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />  
                <h4 className="bonuses__section-count">
                  { CookiesWorker.get("bonuses") || 0 }
                </h4>
              </div>
              <h6 className="bonuses__section-count-text">
                {` = ${userDiscount} грн`}
              </h6>
            </div>
          </div>
        </div>
        <div className="bonuses__section__user-status">
          <div className="bonuses__section__user-status_header">
            <p className="bonuses__section-text">
              Здійснено покупок на суму: <b>0 грн</b>
            </p>
            <div className="bonuses__section-flex-text">
              <p className="bonuses__section-text">
                До наступного рівня: <b>1000 грн</b>
              </p>   
              <Image src="/icons/info.svg" alt="" width="15" height="15" className="bonuses__section-icon" />
            </div>
          </div>
          <div className="bonuses__section__user-status_body">
            <div className="bonuses__section-progress-container">
              <div className="bonuses__section-progress">
                <div className="bonuses__section-progress-marker active-marker"></div>
                <p className="bonuses__section-progress-title">
                  ЧИТАЧ
                </p>
                <p className="bonuses__section-bonus-count">
                  0
                </p>
              </div>
              <div className="bonuses__section-progress">
                <div className="bonuses__section-progress-marker"></div>
                <p className="bonuses__section-progress-title">
                  ЗНАВЕЦЬ
                </p>
                <p className="bonuses__section-bonus-count">
                  1000
                </p>
              </div>
              <div className="bonuses__section-progress">
                <div className="bonuses__section-progress-marker"></div>
                <p className="bonuses__section-progress-title">
                  ЕРУДИТ
                </p>
                <p className="bonuses__section-bonus-count">
                  2000
                </p>
              </div>
              <div className="bonuses__section-progress">
                <div className="bonuses__section-progress-marker"></div>
                <p className="bonuses__section-progress-title">
                  ГЕНІЙ
                </p>
                <p className="bonuses__section-bonus-count">
                  4000
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bonuses__section__status-features">
          <div className="bonuses__section__status-left">
            <div className="bonuses__section__status-left-header">
              <div className="bonuses__section-slide">
                <div className="bonuses__section-slide-image-container">
                  <Image src="https://static.yakaboo.ua/media/loyalty/image/reader.png" width="80" height="100" alt="" />
                </div>
                <p className="bonuses__section-slide-title">
                  ЧИТАЧ
                </p>
              </div>

              <div className="bonuses__section-slide">
                <div className="bonuses__section-slide-image-container">
                  <Image src="https://static.yakaboo.ua/media/loyalty/image/expert.png" width="80" height="100" alt="" />
                </div>
                <p className="bonuses__section-slide-title">
                  ЗНАВЕЦЬ
                </p>
              </div>

              <div className="bonuses__section-slide">
                <div className="bonuses__section-slide-image-container">
                  <Image src="https://static.yakaboo.ua/media/loyalty/image/erudite.png" width="80" height="100" alt="" />
                </div>
                <p className="bonuses__section-slide-title">
                  ЕРУДИТ
                </p>
              </div>

              <div className="bonuses__section-slide">
                <div className="bonuses__section-slide-image-container">
                  <Image src="https://static.yakaboo.ua/media/loyalty/image/genius.png" width="80" height="100" alt="" />
                </div>
                <p className="bonuses__section-slide-title">
                  ГЕНІЙ
                </p>
              </div>
            </div>
            <div className="bonuses__section__status-left-body">
              <p className="bonuses__section-small-text">
                На цьому рівні вам доступні:
              </p>
              <ul className="bonuses__section-list">
                <li className="bonuses__section-point">
                  Бонуси на день народження
                </li>
                <li className="bonuses__section-point">
                  Бонуси за відгуки та рецензії
                </li>
                <li className="bonuses__section-point">
                  Нарахування Х2 бонусів на обрану категорію
                </li>
                <li className="bonuses__section-point">
                  Персональні пропозиції від обраної категорії та видавництва
                </li>
                <li className="bonuses__section-point">
                  Спеціальні дні з нарахуванням Х2 бонусів
                </li>
              </ul>
            </div>
          </div>
          <div className="bonuses__section-category-overlay">
            <p className="bonuses__section-category-overlay-title">
              Ви зможете додавати категорію та видавництво місяця, коли досягнете рівня "Знавець".
            </p>
          </div>
          <div className="bonuses__section__status-right">
            <div className="bonuses__section-category-section">
              <div className="bonuses__section-category-header">
                <h4 className="bonuses__section-category-title">
                  Обирайте категорію та видавництво на цей місяць для подвійної кількості бонусів
                </h4>
                <div className="bonuses__section-category-content">
                  <Image src="/icons/info.svg" alt="" width="15" height="15" />
                  <p>Зверніть увагу, ви можете обрати категорію та видавництво один раз на місяць.</p>
                </div>
              </div>
              <form className="bonuses__section-category-form">
                <div className="bonuses__section-category-form__field-block">
                  <label htmlFor="category" className="bonuses__section-category-form__label">
                    Категорія
                  </label>
                  <input type="text" name="category" id="category" className="bonuses__section-category-form__input" 
                  placeholder="Додати категорію"/>
                </div>
                <div className="bonuses__section-category-form__field-block">
                  <label htmlFor="publishing" className="bonuses__section-category-form__label">
                    Видавництво
                  </label>
                  <input type="text" name="pubslishing" id="publishing" 
                  className="bonuses__section-category-form__input" placeholder="Додати видавництво" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        
  )
}

