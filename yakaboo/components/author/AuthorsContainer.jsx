'use client';

import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services';
import Link from 'next/link';
import { useLetterStore, useSearchPublisherStore } from '../../states';
import { fetchSearchResults } from '../../services/fetch.service';
import { useDebounce } from '../../hooks/useDebounce';

export const AuthorsContainer = () => {
  const [authors, setAuthors] = useState([]);

  const { activeLetter } = useLetterStore();
  const { searchValue } = useSearchPublisherStore();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue?.trim()) {
      fetchSearchResults(debouncedSearchValue, setAuthors, true);
    } else {
      fetchData(
        `http://localhost:8004/authors/first-letter/${activeLetter || 'А'}`,
        setAuthors
      );
    }
  }, [activeLetter, debouncedSearchValue]);

  return (
    <div className="data">
      <div className="data__container">
        {authors &&
          authors.map((author) => (
            <Link
              href={`/author/view/${author.slug}`}
              key={author.id}
              className="data__container-link"
            >
              {author.first_name} {author.last_name}
              <span className="data__books-count">(477)</span>
            </Link>
          ))}
      </div>
    </div>
  );
};
