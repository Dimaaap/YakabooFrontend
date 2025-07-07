import Image from 'next/image';
import React from 'react';

export const FilterForm = ({
  fields,
  formTitle,
  isScroll = false,
  withSearch = false,
  searchPlaceholder = null,
  withShowMore = false,
}) => {
  return (
    <form className="filters__form">
      <p className="filters__form-title">{formTitle}</p>
      {withSearch && (
        <div className="filters__search-container">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="filters__search"
          />
          <Image src="/icons/search.svg" alt="" width="17" height="17" />
        </div>
      )}
      {isScroll ? (
        <div className="filters__form-scroll">
          {fields.map((field, index) => (
            <div className="filters__form-field" key={index}>
              <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                {field}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <>
          {fields.map((field, index) => (
            <div className="filters__form-field" key={index}>
              <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                {field}
              </label>
            </div>
          ))}
        </>
      )}
      {withShowMore && (
        <button className="filters__show-all">
          Показати всі
          <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
        </button>
      )}
    </form>
  );
};
