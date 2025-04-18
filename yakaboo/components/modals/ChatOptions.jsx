import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ChatOptions = () => {
  return (
    <div className="chat-options">
      <div className="chat-options__wrapper">
        <Link href="#" className="chat-options__link">
            <span className="chat-options__icon-wrapper">
                <Image src="/icons/social/telegram.svg" alt="" width="50" height="50" />
            </span>
        </Link>
        <Link href="#" className="chat-options__link">
            <span className="chat-options__icon-wrapper purple-wrapper">
                <Image src="/icons/social/viber.svg" alt="" width="50" height="50" />
            </span>
        </Link>
        <Link href="#" className="chat-options__link">
            <span className="chat-options__icon-wrapper">
                <Image src="/icons/social/mail.svg" alt="" width="50" height="50" />
            </span>
        </Link>
        <Link href="#" className="chat-options__link">
            <span className="chat-options__icon-wrapper green-wrapper">
                <Image src="/icons/social/phone.svg" alt="" width="50" height="50" />
            </span>
        </Link>
      </div>
    </div>
  )
}

