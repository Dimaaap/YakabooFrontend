import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const messages = [
    {
        title: "🔥😍📖Е-видавництво тижня! До -20% на книжки від Stretovych",
        link: "promotion/e-vydavnytstvo-tyzhnia-do-20-na-knyzhky-vid-stretovych",
        image_src: "https://picscdn.io/repository/home/3673/pull/images/1777372452315.png",
        description: "Книжки, що запускають процес мислення та наповнюють ідеями! Шукаєте такі? Тоді вам до нашої добірки електронних видань від Stretovych - тут усе надихає та дає поштовх до творчості",
        datetime: "2026-04-28 14:01:00"
    },
    {
        title: "💕📕📘-50% на другу книжку «Віхоли» з добірки",
        link: "promotion/-50-na-druhu-knyzhku-viholy-z-dobirky",
        image_src: "https://picscdn.io/repository/home/3673/pull/images/1776937954093.png",
        description: "Обирайте 2 книжки 'Віхоли' з добірки і та, що вартує менше, буде за пів ціни! Замовляйте і нехай у вашій бібліотеці зазвучать українські голоси!",
        datetime: "2026-04-24 13:04:00"
    }
]

const formatMessageDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.getDate() === now.getDate() 
    && date.getMonth() == now.getMonth()
    && date.getFullYear() === now.getFullYear()

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if(isToday){
        return `Сьогодні, ${hours}:${minutes}`
    }

    const months = [
         "січня", "лютого", "березня", "квітня",
        "травня", "червня", "липня", "серпня",
        "вересня", "жовтня", "листопада", "грудня"
    ]

    return `${date.getDate()} ${months[date.getMonth()]}, ${hours}:${minutes}`;
}

export const MessagesModal = () => {
  return (
    <div className="contacts-modal messages-modal">
        <div className="messages-modal__body">
            { messages.map((message, index) => (
                <div className="messages-modal__message" key={ index }
                href={ message.link }>
                    <div className="messages-modal__message-image-container">
                        <Image src={ message.image_src } alt={ message.title } width={ 80 } height={ 80 } />
                    </div>
                    <div className="messages-modal__message-text">
                        <h5 className="messages-modal__message-header">
                            { message.title }
                        </h5>
                        <p className="messages-modal__message-description">
                            { message.description }
                        </p>

                        <div className="messages-modal__message-footer">
                            <span className="messages-modal__message-datetime">
                                { formatMessageDate(message.datetime) }
                            </span>
                            
                            <Link className="messages-modal__message-btn" href={ message.link }>
                                Детальніше
                            </Link>
                        </div>
                    </div>
                </div>
            )) }
        </div>
    </div>
  )
}
