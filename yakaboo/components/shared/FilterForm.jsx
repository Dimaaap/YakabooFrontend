"use client";

import Image from 'next/image';
import React, { useMemo, useState } from 'react';

export const FilterForm = ({
  fields,
  formTitle,
  isScroll = false,
  withSearch = false,
  searchPlaceholder = null,
  withShowMore = false,
  selected = [],
  objectFields=false,
  onChange = () => {},
}) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(!withShowMore)

  const filterFields = useMemo(() => {
    if(!objectFields){
      return fields.filter(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )  
    } else {
      return fields.filter(field => field.value?.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    
  }, [fields, searchTerm])

  const displayedFields = showAll ? filterFields : filterFields.slice(0, 5);

  const toggleField = field => {
    console.log(field)
    console.log(selected)
    if(selected.includes(field)){
      onChange(selected.filter((f) => f !== field))
    } else {
      onChange([...selected, field]);
    }
  }

  let fieldElements = null;

  if(!objectFields){
    fieldElements = displayedFields.map((field, index) => (
      <div className="filters__form-field" key={ index }>
        <label className="filters__form-label custom-checkbox">
          <input 
            type="checkbox"
            className="filters__form-checkbox"
            value={ field }
            checked={selected.includes(field)}
            onChange={() => toggleField(field)}
          />
          <span className="filters__form-custom-box"></span>
          { field }
        </label>
      </div>
    ))  
  } else {
    fieldElements = displayedFields.map((field) => (
      <div className="filters__form-field" key={ field.value }>
        <label className="filters__form-label custom-checkbox">
          <input type="checkbox" className="filters__form-checkbox"
          value={ field.value }
          checked={ selected.includes(field.value) }
          onChange={() => toggleField(field.value)} />

          <span className="filters__form-custom-box"></span>
          { field.label }
        </label>
      </div>
    ))
  }

  

  return (
    <form className="filters__form" onSubmit={e => e.preventDefault()}>
      <p className="filters__form-title">{formTitle}</p>
      {withSearch && (
        <div className="filters__search-container">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="filters__search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Image src="/icons/search.svg" alt="" width="17" height="17" />
        </div>
      )}
      
      <div className={isScroll ? 'filters__form-scroll' : 'filters__form'}>
        { fieldElements }
      </div>

      {withShowMore && filterFields.length > 5 && (
        <button 
        className="filters__show-all"
        type="button"
        onClick={() => setShowAll(prev => !prev)}
        >
          { showAll ? "Згорнути" : "Показати всі" }
          <Image 
            src="/icons/arrow-left.svg"
            alt=""
            width="15"
            height="15"
            style={{
              transform: showAll ? 'rotate(90deg)': 'rotate(-90deg)',
              transition: 'transform 0.2s ease'
            }}
          
          />
        </button>
      )}
    </form>
  );
};