'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Breadcrumbs,
  Filters,
  GamesContainer,
  Stars,
} from '../../../../../../components';
import { PublishingHeader } from '../../../../../../components/book_publishers';
import { fetchData } from '../../../../../../services';

export default function BookPublisherPage() {
  const links = {
    Головна: '/',
    Видавництва: '/book_publisher/view/all',
  };

  const pathname = usePathname();
  const publisherTitle = pathname.split('/')[3];

  const [publisher, setPublisher] = useState(null);

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
    fetchData(
      `http://127.0.0.1:8006/publishing/${publisherTitle}`,
      setPublisher
    );
  }, []);

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
