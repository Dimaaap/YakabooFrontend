import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ContactsModal = () => {
  return (
    <div className="contacts-modal">
        <div className="contacts-modal__left">
            <Image className="contacts-modal__icon" alt="" width="20" height="20"
            src="/icons/mobile-phone.svg" />
        </div>
        <div className="contacts-modal__right">
            <Link href="tel:0800335425" className="contacts-modal__phone-link">
                0-800-335-425
            </Link>
            <div className="contacts-modal__text-container">
                <p className="contacts-modal__text">
                    Безкоштовно по Україні
                </p>
                <p className="contacts-modal__text">
                    Без вихідних, з 9 до 20
                </p>    
            </div>
        </div>
    </div>
  )
}

