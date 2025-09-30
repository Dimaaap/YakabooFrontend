import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ContactsModal = () => {
  return (
    <div className="contacts-modal">
        <div className="contacts-modal__header">
            <Link href="tel:0800335425" className="contacts-modal__phone-link">
                0-800-335-425
            </Link>
            <div className="contacts-modal__text-container">
                <p className="contacts-modal__text bold-text">
                    Безкоштовно по Україні
                </p>
                <p className="contacts-modal__text">
                    Без вихідних, 9:00-20:00
                </p>    
            </div>
        </div>
        <div className="contacts-modal__socials">
            <Link className="contacts-modal__social" href="https://t.me/Yakaboo_ua_bot">
                <Image src="/icons/social/telegram.svg" alt="Yakaboo Telegram" width="30" height="30" />
                <span className="contacts-modal__social-title">
                    Telegram
                </span>
            </Link>
            <Link className="contacts-modal__social" href="viber://pa?chatURI=yakaboo_ua">
                <Image src="/icons/social/viber.svg" alt="Yakaboo Viber" width="30" height="30" />
                <span className="contacts-modal__social-title">
                    Viber
                </span>
            </Link>
            <div className="contacts-modal__social">
                <Image src="/icons/social/phone.svg" alt="Yakaboo Phone" width="30" height="30" />
                <span className="contacts-modal__social-title">
                    Замовити дзвінок
                </span>
            </div>
            <Link className="contacts-modal__social" href="mailto:supoort@yakaboo.ua">
                <Image src="/icons/social/mail.svg" alt="Yakaboo Telegram" width="30" height="30" />
                <span className="contacts-modal__social-title">
                    Написати на пошту
                </span>
            </Link>
        </div>
    </div>
  )
}

