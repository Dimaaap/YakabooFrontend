'use client';

import Image from 'next/image';
import React from 'react';
import { useSearchPublisherStore } from '../../states';

export const SearchBar = () => {
  const { searchValue, setSearchValue } = useSearchPublisherStore();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };

  return (
    <div className="search">
      <form className="search__form">
        <input
          type="search"
          name="q"
          className="search__field"
          placeholder="Пошук у списку"
          value={searchValue || ''}
          onChange={handleChange}
        />
        <Image
          src="/icons/search.svg"
          alt=""
          width="18"
          height="18"
          className="search__icon"
          value={searchValue}
        />
        <button
          className="search__submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Пошук
        </button>
      </form>
    </div>
  );
};
