'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { AuthorFacts } from '../shared';
import { formatLocalDate } from '../../utils';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';

export const AuthorHeader = ({ author }) => {
  const [authorImages, setAuthorImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [authorFact, setAuthorFact] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchData(
      Endpoints.AUTHOR_IMAGES(author.id), setAuthorImages);
  }, []);

  useEffect(() => {
    fetchData(Endpoints.AUTHOR_FACTS(author.id), setAuthorFact);
  }, []);

  const handleChangeShowAll = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

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
          <div className="book-container__images-carousel">
            <div className="book-container__main-image">
              { authorImages.length > 1 && (
                <button className="book-container__slider-btn prev-btn slider-btn"
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
              { authorImages.length > 1 && (
                <button className="book-container__slider-btn next-btn slider-btn author-btn"
                onClick={ showNextImage }>
                  <Image src="/icons/arrow-left.svg" alt="" width="20" height="20" />
                </button>
              ) }
            </div>
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
          </div>
        </div>
      )}
      <div className="author-header__center">
        <h3 className="author-header__title">
          {author.first_name} {author.last_name} - книги і біографія
        </h3>
        {authorImages.length > 0 && (
          <div className="author-header__info-table">
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
        { showAll && author.description && (
          <div className="author-header__desc-block" dangerouslySetInnerHTML={{ __html: author.description }} />
        ) }
        { !showAll && (
          <div className="author-header__desc-block" dangerouslySetInnerHTML={{ __html: author.short_description }} />   
        ) }
        
        {author.description && (
          <button
            className="author-header__more-info"
            onClick={handleChangeShowAll}
          >
            Показати {showAll ? 'менше' : 'повністю'}
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width="16"
              height="16"
              className={`${showAll ? 'rotated' : ''}`}
            />
          </button>
        )}
      </div>
      {authorFact && authorFact.fact_text && (
        <div className="author-header__right">
          <AuthorFacts factText={authorFact.fact_text} />
        </div>
      )}
    </div>
  );
};
