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

            <div className="publishing-header__section right-section"
            dangerouslySetInnerHTML={{__html:publisher.long_description}} />
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
