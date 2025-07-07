import React from 'react';
import { Badge, ProductCard, Stars } from '../shared';
import Image from 'next/image';

const colorsWithCodes = {
  pink: '#ff00c5',
  purple: 'rgb(175, 57, 231)',
  darkBlue: 'rgb(51, 51, 119)',
};

export const GamesContainer = ({ productCards = [] }) => {
  return (
    <div className="games-container">
      <div className="games-container__header">
        <h3 className="games-container__count">4161 товар</h3>
        <div className="games-container__sorted-by">
          <span>За популярністю</span>
          <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
        </div>
      </div>
      <div className="games-container__body">
        <ProductCard
          brand=""
          bonusesCount={66}
          oldPrice={156}
          newPrice={131}
          badges={[
            <Stars count={4} isSmaller={true} />,
            <span
              className="product-badge-span"
              style={{ backgroundColor: colorsWithCodes.pink }}
            >
              -17%
            </span>,
            <span
              className="product-badge-span"
              style={{ background: colorsWithCodes.purple }}
            >
              Хіт
            </span>,
          ]}
        />

        {productCards.map((card, index) => (
          <ProductCard
            key={index}
            title={card.title}
            imageSrc={card.image}
            brand={card.brand || ''}
            inStock={card.inStock || true}
            bonusesCount={card.bonuses || 0}
            oldPrice={card.oldPrice || null}
            newPrice={card.newPrice || null}
            badges={card.badges || []}
            productCode={card.code || null}
          />
        ))}
      </div>
      <div className="games-container__pagination">
        <button className="games-container__show-more">
          Показати більше товарів
        </button>
        <div className="games-container__pagination-btns">
          <button className="games-container__pagination-btn arrow-pagination disabled">
            <Image src="/icons/left.svg" alt="" width="18" height="18" />
          </button>

          <div className="games-container__pagination-nums">
            <button className="games-container__pagination-btn numeric-pagination is-active">
              1
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              2
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              3
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              4
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              5
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              6
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              7
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              ...
            </button>
            <button className="games-container__pagination-btn numeric-pagination">
              84
            </button>
          </div>

          <button className="games-container__pagination-btn arrow-pagination">
            <Image src="/icons/right.svg" alt="" width="18" height="18" />
          </button>
        </div>
      </div>
    </div>
  );
};
