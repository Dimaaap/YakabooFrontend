'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { fetchData, handleBackdropClick } from '../../services';

import { ModalCloseBtn } from '../shared';
import Endpoints from '../../endpoints';
import { useDeliveryModalStore } from '../../states';

const DeliveryInfoModal = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { setIsDeliveryModalOpen } = useDeliveryModalStore();

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
    if (countries.length > 0 && !selectedCountry) {
      const defaultCountry = countries[0];
      setSelectedCountry(defaultCountry);

      if (defaultCountry?.cities?.length) {
        setSelectedCity(defaultCountry.cities[0]);
      }
    }
  }, [countries]);

  const handleChangeSelectedCountry = (selectedCountry) => {
    const matchedCountry = countries.find(
      (country) => country.title === selectedCountry.value
    );

    setSelectedCountry(matchedCountry);

    if (matchedCountry?.cities?.length) {
      setSelectedCity(matchedCountry.cities[0]);
    } else {
      setSelectedCity(null);
    }
  };

  const handleChangeSelectedCity = (selectedCity) => {
    const matchedCity = selectedCountry?.cities?.find(
      (city) => city.title === selectedCity.value
    );
    setSelectedCity(matchedCity);
  };

  const getCountryCities = () => {
    return (
      selectedCountry?.cities?.map((city) => ({
        value: city.title,
        label: city.title,
      })) || []
    );
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
                  value={
                    selectedCountry
                      ? {
                          value: selectedCountry.title,
                          label: selectedCountry.title,
                        }
                      : null
                  }
                  onChange={handleChangeSelectedCountry}
                  placeholder={selectedCountry?.title}
                  className="delivery-modal__input"
                  styles={selectFieldsCommonStyles}
                />
              )}
            </div>
            <div className="delivery-modal__field-group">
              {console.log(selectedCity)}
              <label htmlFor="city" className="delivery-modal__label">
                Місто *
              </label>
              <Select
                id="city"
                name="city"
                options={getCountryCities()}
                value={
                  selectedCity
                    ? { value: selectedCity.title, label: selectedCity.title }
                    : ''
                }
                styles={selectFieldsCommonStyles}
                onChange={handleChangeSelectedCity}
                placeholder={selectedCity?.title}
                className="delivery-modal__input"
              />
            </div>
            <button className="delivery-modal__save-btn" type="button">
              Зберегти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoModal;
