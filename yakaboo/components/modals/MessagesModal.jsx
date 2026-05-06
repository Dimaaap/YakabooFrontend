"use client"

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { fetcher } from '../../services/fetch.service';
import Endpoints from '../../endpoints';
import { STALE_TIME } from '../../site.config';
import { useUnreadNotificationsStore } from '../../states';


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

export const MessagesModal = ({ messages }) => {

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
                                { formatMessageDate(message.created_at) }
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
