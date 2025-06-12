'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const TextReviews = ({
  reviewTheme,
  reviewText,
  reviewAuthor = 'Igor Golodnitskiy',
  reviewDate = '20 лютого 2022р.',
  grade = 5,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 224;

  const getTrueWordForm = (grade) => {
    if (grade === 1) {
      return 'Бал';
    } else if (grade >= 2 && grade <= 4) {
      return 'Бали';
    } else {
      return 'Балів';
    }
  };

  const handleToggleText = () => setIsExpanded(!isExpanded);

  const getDisplayText = () => {
    if (isExpanded || reviewText.length <= MAX_LENGTH) return reviewText;
    return reviewText.slice(0, MAX_LENGTH) + '...';
  };

  return (
    <div className="text-reviews__review text-review">
      <div className="text-review__header">
        <div className="text-review__author">
          <p className="text-review__author-name">{reviewAuthor}</p>
          <p className="text-review__date">{reviewDate}</p>
        </div>
        <div className="text-review__stars-container">
          <div className="text-review__stars">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Image
                  src="/icons/star.svg"
                  alt=""
                  width="15"
                  height="15"
                  className={`text-review__star ${index + 1 <= grade ? 'active-star' : ''}`}
                  key={index}
                />
              ))}
          </div>
          <p className="text-review__grade">
            {grade} {getTrueWordForm(grade)}
          </p>
        </div>
      </div>

      <div className="text-review__body">
        <p className="text-review__main-theme">{reviewTheme}</p>
        <p className="text-review__text">{getDisplayText()}</p>
      </div>

      <div className="text-review__footer">
        <button
          className="text-review__read-full"
          type="button"
          onClick={handleToggleText}
        >
          {isExpanded ? 'Згорнути' : 'Читати повністю'}
        </button>

        <div className="text-review__grades-btns">
          <button className="text-review__grade-btn like">
            <Image src="/icons/like.svg" alt="" width={15} height={15} />
          </button>
          <button className="text-review__grade-btn dislike">
            <Image src="/icons/dislike.svg" alt="" width={15} height={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
