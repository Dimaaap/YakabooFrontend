import Image from 'next/image';
import React from 'react';

export const PublishingHeader = ({ publisher }) => {
  return (
    <div className="publishing-header">
      <h3 className="publishing-header__title">
        Видавництво книг {publisher.title}
      </h3>
      <div className="publishing-header__container">
        {publisher.logo && (
          <div className="publishing-header__section left-section">
            <Image
              src={publisher.logo}
              alt={`${publisher.title} logo`}
              width="300"
              height="200"
            />
          </div>
        )}

        <div className="publishing-header__section right-section">
          <p className="publishing-header__description">
            {publisher.short_description}...
          </p>
          <button className="publishing-header__view-more" type="button">
            Показати повністю
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width="17"
              height="17"
            />
          </button>
          <p className="publishin-header__description visually-hidden">
            {publisher.long_description}
          </p>
        </div>
      </div>
    </div>
  );
};
