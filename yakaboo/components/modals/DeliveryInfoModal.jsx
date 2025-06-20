'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { fetchData, handleBackdropClick } from '../../services';
import {
  useDeliveryCityStore,
  useDeliveryModalStore,
  useSelectedCountryAndCity,
} from '../../states';
import { ModalCloseBtn } from '../shared';
import Endpoints from '../../endpoints';

const DeliveryInfoModal = () => {
  const { setIsDeliveryModalOpen } = useDeliveryModalStore();

  const { deliveryCity, setDeliveryCity } = useDeliveryCityStore();
  const {
    countries,
    setCountries,
    selectedCountry,
    setSelectedCountry,
    citiesList,
    setCitiesList,
    selectedCity,
    setSelectedCity,
  } = useSelectedCountryAndCity();

  const selectFieldsCommonStyles = {
    placeholder: (provided) => ({
      ...provided,
      color: 'black',
    }),
    option: (provided, countries) => ({
      ...provided,
      backgroundColor: countries.isFocused ? '#E6E8EE' : '#F2F3F6',
      border: 'none',
      paddingTop: 0,
      marginTop: '0px',
      fontWeight: 500,
      color: countries.isSelected ? '#ff00c5' : 'black',
      borderBottom: '1px solid #E6E8EE',
      paddingTop: '10px',
      cursor: 'pointer',
    }),
    control: (base) => ({
      ...base,
      width: '100%',
      backgroundColor: '#F2F3F6',
      color: 'red',
      fontWeight: 500,
      height: '45px',
      border: 'none',
      borderRadius: '10px',
      paddingLeft: '5px',
    }),
    groupHeading: (base) => ({
      ...base,
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Montserrat',
    }),
  };

  useEffect(() => {
    fetchData(Endpoints.ALL_COUNTRIES, setCountries, 'countries');
  }, []);

  useEffect(() => {
    if (countries.length) {
      const defaultCountry = countries[0];
      setSelectedCountry({
        value: defaultCountry.title,
        label: defaultCountry.title,
      });

      const defaultCity = defaultCountry.cities[0];

      setCitiesList(defaultCountry.cities);
      setSelectedCity({
        value: defaultCity.title,
        lable: defaultCity.title,
      });
    }
  }, [countries]);

  const handleChangeSelectedCountry = (selected) => {
    setSelectedCountry(selected);
    const matchedCountry = countries.find(
      (country) => country.title === selected.value
    );

    if (matchedCountry) {
      setCitiesList(matchedCountry.cities);
      const firstCity = matchedCountry.cities[0];

      if (firstCity) {
        setSelectedCity({
          value: firstCity.title,
          label: firstCity.title,
        });
      } else {
        setSelectedCity(null);
      }
    }
  };

  const createListCitiesAndRegions = () => {
    const groupedCities = [];

    const regionMap = {};

    citiesList.forEach((city) => {
      const region = city.region || 'Без регіону';

      if (!regionMap[region]) {
        regionMap[region] = [];
      }

      regionMap[region].push({
        value: city.title,
        label: city.title,
      });
    });

    for (const region in regionMap) {
      groupedCities.push({
        label: region,
        options: regionMap[region],
      });
    }

    return groupedCities;
  };

  const handleDeliveryClick = () => {
    if (selectedCity) {
      setDeliveryCity(selectedCity.value);
    } else {
      setDeliveryCity(selectedCountry.value);
    }
    setIsDeliveryModalOpen(false);
  };

  return (
    <div
      className="menu delivery-modal"
      onClick={(e) => handleBackdropClick(e, setIsDeliveryModalOpen)}
    >
      <div className="delivery-modal__content">
        <ModalCloseBtn
          clickHandler={(e) => setIsDeliveryModalOpen(false)}
          extraClasses="delivery-modal__close"
        />
        <div className="delivery-modal__text-content">
          <p className="delivery-modal__header">Оберіть місто доставки</p>
          <form action="" method="post" className="delivery-modal__info">
            <div className="delivery-modal__field-group">
              <label htmlFor="country" className="delivery-modal__label">
                Країна *
              </label>
              {countries.length && (
                <Select
                  id="country"
                  name="country"
                  options={countries.map((country) => ({
                    value: country.title,
                    label: country.title,
                  }))}
                  onChange={(selected) => handleChangeSelectedCountry(selected)}
                  className="delivery-modal__input"
                  placeholder={countries[0]?.title || selectedCountry}
                  styles={selectFieldsCommonStyles}
                />
              )}
            </div>
            <div className="delivery-modal__field-group">
              {}
              <label htmlFor="city" className="delivery-modal__label">
                Місто *
              </label>
              {citiesList && (
                <Select
                  id="city"
                  name="city"
                  options={createListCitiesAndRegions()}
                  defaultValue={selectedCity}
                  onChange={(selected) => setSelectedCity(selected)}
                  className="delivery-modal__input"
                  placeholder={selectedCity?.title || ''}
                  styles={selectFieldsCommonStyles}
                  formatOptionLabel={(data, { context }) =>
                    context === 'menu' ? (
                      <span style={{ paddingLeft: '12px' }}>{data.label}</span>
                    ) : (
                      data.label
                    )
                  }
                />
              )}
            </div>
            <button
              className="delivery-modal__save-btn"
              type="button"
              onClick={handleDeliveryClick}
            >
              Зберегти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
