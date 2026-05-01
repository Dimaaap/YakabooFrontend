'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { AuthorFacts } from '../shared';
import { formatLocalDate } from '../../utils';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';
import { setDescription, setShowAll, useHobbyDescriptionStore } from '../../states/hobbies/HobbyDescriptionStore';
import { useSmallScreen } from '../../hooks';

export const AuthorHeader = ({ author }) => {
  const [authorImages, setAuthorImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [authorFact, setAuthorFact] = useState(null);
  const { firstParagraph, showAll, isSingle } = useHobbyDescriptionStore()

  const isSmallScreen = useSmallScreen();

  useEffect(() => {
    fetchData(
      Endpoints.AUTHOR_IMAGES(author.id), setAuthorImages);
  }, []);

  useEffect(() => {
    fetchData(Endpoints.AUTHOR_FACTS(author.id), setAuthorFact);
  }, []);

  useEffect(() => {
        setDescription(author.description)
  }, [author.description])

  const showNextImage = () => {
    if(activeImage < authorImages.length - 1){
      setActiveImage(activeImage + 1)
    } else {
      setActiveImage(0)
    }
  }

  const showPrevImage = () => {
    if(activeImage > 0) {
      setActiveImage(activeImage - 1)
    } else {
      setActiveImage(authorImages.length - 1)
    }
  }

  return (
    <div className="author-header">
      {authorImages.length > 0 && (
        <div className="author-header__left">
          { isSmallScreen && (
            <h3 className="author-header__title centered">
              {author.first_name} {author.last_name} - книги і біографія
            </h3>
          ) }
          <div className="book-container__images-carousel">
            <div className="book-container__main-image">
              { authorImages.length > 1 && !isSmallScreen && (
                <button className="book-container__slider-btn prev-btn slider-btn header-btn"
                onClick={ showPrevImage }>
                  <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                </button>
              ) }
              <div className="author__big-image-wrapper">
                <Image
                  src={authorImages[activeImage].image_path}
                  alt={`${author.slug}_1`}
                  width="250"
                  height="350"
                  className="author__big-image"
                />  
              </div>
              { authorImages.length > 1 && !isSmallScreen && (
                <button className="book-container__slider-btn next-btn slider-btn header-btn"
                onClick={ showNextImage }>
                  <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                </button>
              ) }
            </div>
            { !isSmallScreen ? (
              <div className="author-header__small-images-row book-container__rest-images">
                { authorImages.length > 0 && (
                  authorImages 
                    .map((image, index) => ({ image, index }))
                    .filter(({ index }) => index >= activeImage - 1 && index <= activeImage + 3)
                    .map(({ image, index }) => (
                      <Image key={ index } src={ image.image_path } 
                      alt={`${author.slug}_${index + 1}`}
                      width="50" height="50" className={ activeImage === index ? "cur-img": "" }
                      onClick={ () => setActiveImage(index) } />
                    ))
                ) }
              </div>  
            ) : (
              <div className="author-header__image-dots">
                { authorImages.map((_, index) => (
                  <span className={`author-header__dot ${activeImage === index ? "active-dot": ""}`}
                  key={ index }
                  onClick={ () => setActiveImage(index) }
                  />
                )) }
              </div>
            )}
            
          </div>
        </div>
      )}
      <div className="author-header__center">
        {!isSmallScreen && (
          <h3 className="author-header__title">
            {author.first_name} {author.last_name} - книги і біографія
          </h3>  
        )}
        {authorImages.length > 0 && (
          <div className="author-header__info-table">
            { author.first_name && author.last_name && author.date_of_birth && (
              <div className="author-header__table-row">
                <div className="author-header__table-cell left-cell">
                  <p>Повне ім'я</p>
                </div>
                <div className="author-header__table-cell right-cell">
                  <p>
                    {author.first_name} {author.last_name}
                  </p>
                </div>
              </div>  
            ) }
            {author.date_of_birth && (
              <div className="author-header__table-row">
                <div className="author-header__table-cell left-cell">
                  <p>Дата народження</p>
                </div>
                <div className="author-header__table-cell right-cell">
                  <p>{formatLocalDate(author.date_of_birth)}</p>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="author-header__desc-block" dangerouslySetInnerHTML={{ __html: showAll ? author.description : firstParagraph }}/>
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
      {authorFact && authorFact.fact_text && (
        <div className="author-header__right">
          <AuthorFacts factText={authorFact.fact_text} />
        </div>
      )}
    </div>
  );
};
