import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ChatOptions = () => {

  const chatOptions = [
    {
      imageSrc: "/icons/social/telegram.svg",
      wrapper: ""
    },
    {
      imageSrc: "/icons/social/viber.svg",
      wrapper: "purple"
    },
    {
      imageSrc: "/icons/social/mail.svg",
      wrapper: ""
    },
    {
      imageSrc: "/icons/social/phone.svg",
      wrapper: "green"
    }
  ]

  return (
    <div className="chat-options">
      <div className="chat-options__wrapper">
        { chatOptions.map((option, index) => (
          <Link href="#" className="chat-options__link" key={ index }>
            <span className={`chat-options__icon-wrapper ${option.wrapper ? option.wrapper + "-wrapper": ""}`}>
              <Image src={ option.imageSrc } alt="" width="50" height="50" />
            </span>
          </Link>
        )) }
      </div>
    </div>
  )
}

export default ChatOptions