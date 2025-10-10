"use client";

import Image from "next/image"
import { CookiesWorker } from "../../services"
import { getUserFullName } from "../../utils"
import Link from "next/link"
import { linksContainer } from "../../links_container"
import { StatusBadge } from "../shared/StatusBadge"
import { usePathname } from "next/navigation"

const BonusesLeftSection = () => {

    const sidebarLinks = [
      {
        link: linksContainer.account.orders,
        text: "Замовлення",
        icon: "/icons/truck-pink.svg",
      },
      {
        link: linksContainer.account.library,
        text: "Моя бібліотека",
        icon: "/icons/done.svg",
      },
      {
        link: linksContainer.account.wishlist,
        text: "Бажані книги",
        icon: "/icons/heart-pink.svg",
      },
      {
        link: linksContainer.account.waitingList,
        text: "Товари в очікуванні",
        icon: "/icons/waiting.svg",
      },
      {
        link: linksContainer.account.bonuses,
        text: "Бонуси",
        icon: "/icons/bonuses.svg",
      },
      {
        link: linksContainer.account.settings,
        text: "Налаштування",
        icon: "/icons/user-pink.svg",
      },
      {
        link: linksContainer.account.logout,
        text: "Вихід",
        icon: "/icons/logout.svg",
      }
    ]

    const pathname = usePathname();
    const accountSection = pathname.split("/")[2];

    const getCurrentLink = (link) => {
      return link.split("/")[2];
    }

    return(
        <div className="bonuses__section left-section">
          { console.log(accountSection) }
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
            { sidebarLinks.map((item, index) => (
              <li className={`settings-point ${getCurrentLink(item.link) === accountSection ? "active-point" : ""}`} key={ index }>
                <Link href={ item.link } className={`settings-link`} onClick={() => handleLinkClick()}>
                  <span className="settins__icon-wrapper">
                    <Image src={ item.icon } alt="" width="18" height="18" />
                  </span>
                  <span className="settings__text">
                    { item.text }
                  </span>
                </Link>
              </li>
            )) }
            </ul>
        </div>
        <div className="menu__body settings-footer-second">
          <div className="settings-footer__text">
            <p className="settings-footer__title">
              Виникли запитання?
            </p>
            <Link className="settings-footer__link" href="tel:0800335425">
              0-800-335-425
            </Link>
          </div>
          <div className="settings-footer__btn-container">
            <Link href="tel:0800335425" className="settings-footer__btn-link">
              Зв'язатися
            </Link>
          </div>
        </div>
      </div>
    )
}

export default BonusesLeftSection