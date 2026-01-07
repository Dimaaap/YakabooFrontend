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
              { !showFull ? (
                <div className="publishing-header__text" dangerouslySetInnerHTML={{__html:publisher.short_description}} />  
              ) : (
                <div className="publishing-header__text" dangerouslySetInnerHTML={{__html: publisher.long_description}} />
              ) }
              

            { publisher.long_description !== publisher.short_description && !showFull && (
              <button className="publishing-header__show-more" type="buttson" onClick={() => changeShowFull()}>
                Показати повністю
                <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
              </button>
            ) }

            { publisher.long_description && showFull && (
              <div className="publishing-header__show-full">
                <button className="publishing-header__show-more" type="button" onClick={() => changeShowFull()}>
                  Показати менше
                  <Image src="/icons/chevron-down.svg" alt="" width="18" height="18"/>
                </button>  
              </div>
              
            ) }
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
