'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { AuthorFacts } from '../shared';
import { formatLocalDate } from '../../utils';
import { fetchData } from '../../services';

export const AuthorHeader = ({ author }) => {
  const [authorImages, setAuthorImages] = useState([]);
  const [authorFact, setAuthorFact] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchData(
      `http://localhost:8004/authors/${author.id}/images`,
      setAuthorImages
    );
  }, []);

  useEffect(() => {
    fetchData(
      `http://localhost:8004/author_facts/author/${author.id}`,
      setAuthorFact
    );
  }, []);

  const handleChangeShowAll = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className="author-header">
      {authorImages.length > 0 && (
        <div className="author-header__left">
          <div className="author-header__images">
            <div className="author-header__main-image">
              <Image
                src={authorImages[0].image_path}
                alt={`${author.slug}_1`}
                width="200"
                height="200"
              />
            </div>
            <div className="author-header__small-images-row">
              {authorImages.map((image, index) => (
                <Image
                  src={image.image_path}
                  key={index}
                  alt={`${author.slug}_${index + 1}`}
                  width="40"
                  height="40"
                />
              ))}
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

        {showAll && author.description ? (
          <p className="author-header__long-desc">{author.description}</p>
        ) : (
          <p className="author-header__short-desc">
            {author.short_description}
          </p>
        )}
        {author.short_description && (
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

      {authorFact && authorFact.length > 0 && (
        <div className="author-header__right">
          <AuthorFacts factText={authorFact.fact_text} />
        </div>
      )}
    </div>
  );
};
