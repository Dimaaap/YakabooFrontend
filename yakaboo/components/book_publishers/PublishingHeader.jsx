'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export const PublishingHeader = ({ publisher }) => {
  const [showFull, setShowFull] = useState(false);

  const changeShowFull = () => {
    if (showFull) {
      setShowFull(false);
    } else {
      setShowFull(true);
    }
  };

  return (
    <>
      {publisher.logo ? (
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
              <p
                className={`publishing-header__description ${showFull ? 'visually-hidden' : ''}`}
              >
                {publisher.short_description}...
              </p>
              <button
                className={`publishing-header__view-more ${showFull ? 'visually-hidden' : ''}`}
                type="button"
                onClick={changeShowFull}
              >
                Показати повністю
                <Image
                  src="/icons/chevron-down.svg"
                  alt=""
                  width="17"
                  height="17"
                />
              </button>
              <p
                className={`publishing-header__description ${showFull ? '' : 'visually-hidden'}`}
              >
                {publisher.long_description}
              </p>

              <button
                className={`publishing-header__view-more ${showFull ? '' : 'visually-hidden'}`}
                type="button"
                onClick={changeShowFull}
              >
                Показати менше
                <Image
                  src="/icons/chevron-down.svg"
                  alt=""
                  width="17"
                  height="17"
                  className="publishing-header__rotated-img"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="publishing-header__title">
          Видавництво книг {publisher.title}
        </h3>
      )}
    </>
  );
};
