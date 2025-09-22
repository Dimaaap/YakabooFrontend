"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { fetchData } from "../../services";
import { Breadcrumbs, Filters } from "../shared";
import { PublishingHeader } from ".";
import { GamesContainer } from "../board_games";

export const BookPublisherClient = () => {
    const [publisher, setPublisher] = useState(null);

    const pathname = usePathname();
    const publisherTitle = pathname.split('/')[3];

    const links = {
        Головна: '/',
        Видавництва: '/book_publisher/view/all',
    };

    const colorsWithCodes = {
        pink: '#ff00c5',
        purple: 'rgb(175, 57, 231)',
        darkBlue: 'rgb(51, 51, 119)',
        darkGreen: 'rgb(0, 148, 95)',
    };

    const books = [
        {
          title: 'Триста поезій',
          image: '/images/Kostenko-300-poeziy.jpg',
          brand: 'Ліна Костенко',
          bonuses: 200,
          oldPrice: 400,
          code: '123898',
          badges: [
            <Stars count={60} isSmaller={true} />,
            <span
              className="product-badge-span"
              style={{ background: colorsWithCodes.pink }}
            >
              Акція
            </span>,
            <span
              className="product-badge-span"
              style={{ background: colorsWithCodes.purple }}
            >
              Хіт
            </span>,
            ,
          ],
        },
        {
          title: 'Чарлі і шоколадна фабрика',
          image: '/images/Dahl-Charlie-i-shokoladna-fabryka.jpg',
          brand: 'Роальд Дал',
          bonuses: 170,
          oldPrice: 340,
          code: '896876',
          badges: [
            <Stars count={100} isSmaller={true} />,
            <span
              className="product-badge-span"
              style={{ background: colorsWithCodes.darkGreen }}
            >
              Добірка
            </span>,
            <span
              className="product-badge-span"
              style={{ background: colorsWithCodes.purple }}
            >
              Хіт
            </span>,
          ],
        },
      ];

    useEffect(() => {
        fetchData( `http://127.0.0.1:8006/publishing/${publisherTitle}`, setPublisher)
    }, [])

    return (
        <div className="publisher">
          <Breadcrumbs linksList={links} />
          {publisher && <PublishingHeader publisher={publisher} />}
    
          <div className="publisher-container">
            <Filters withPublishers={false} />
            <GamesContainer productCards={books} />
          </div>
        </div>
      );

}