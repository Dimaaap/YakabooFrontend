'use client';

import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services';
import Link from 'next/link';
import { useLetterStore, useSearchPublisherStore } from '../../states';
import { fetchSearchResults } from '../../services/fetch.service';
import { useDebounce } from '../../hooks/useDebounce';

export const BookPublishersContainer = () => {
  const [publishings, setPublishings] = useState([]);

  const { activeLetter } = useLetterStore();
  const { searchValue } = useSearchPublisherStore();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue?.trim()) {
      fetchSearchResults(debouncedSearchValue, setPublishings);
    } else {
      fetchData(
        `http://localhost:8006/publishing/first-letter/${activeLetter || 'А'}`,
        setPublishings
      );
    }
  }, [activeLetter, debouncedSearchValue]);

  return (
    <div className="data">
      <div className="data__container">
        {publishings &&
          publishings.map((pub) => (
            <Link
              href={`/book_publisher/view/${pub.slug}`}
              key={pub.id}
              className="data__container-link"
            >
              {pub.title}
              <span className="data__books-count">(477)</span>
            </Link>
          ))}
      </div>
    </div>
  );
};
