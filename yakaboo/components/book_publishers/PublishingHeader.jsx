'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { setDescription, setShowAll, useHobbyDescriptionStore } from '../../states/hobbies/HobbyDescriptionStore';

export const PublishingHeader = ({ publisher }) => {
  const [showFull, setShowFull] = useState(false);

  const { firstParagraph, showAll, isSingle } = useHobbyDescriptionStore()

  useEffect(() => {
    setDescription(publisher.description)
  }, [publisher.description])

  const changeShowFull = () => {
    if (showFull) {
      setShowFull(false);
    } else {
      setShowFull(true);
    }
  };

  const handleChangeShowAll = () => {
      if (showAll) {
        setShowAll(false);
      } else {
        setShowAll(true);
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
              

            {/* { publisher.long_description !== publisher.short_description && !showFull && (
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
              
            ) } */}

            <div className="author-header__desc-block" dangerouslySetInnerHTML={{__html: showAll ? publisher.description : firstParagraph}} />
            
            { !isSingle && (
              !showAll ? (
                <button
                onClick={() => setShowAll(true)} className="hobby-page__show-more">
                  Показати все
                   <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" />
                </button>
              ) : (
                <button 
                onClick={() => setShowAll(false)} className="hobby-page__show-more">
                  Показати менше
                  <Image src="/icons/chevron-down.svg" alt="" width="18" height="18" className="rotated" />
                </button>
              )
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
