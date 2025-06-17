'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { fetchData, handleBackdropClick } from '../../services';
import { useDeliveryModalStore } from '../../states';
import { ModalCloseBtn } from '../shared';
import Endpoints from '../../endpoints';

export const DeliveryInfoModal = () => {
  const { setIsDeliveryModalOpen } = useDeliveryModalStore();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchData(Endpoints.ALL_COUNTRIES, setCountries, 'countries');
    const ukraine = countries.find((c) => c.value === 'Україна');
    setSelectedCountry(ukraine || countries[0]);
  }, []);

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
                  options={countries.map((country) => ({
                    value: country.title,
                    label: country.title,
                  }))}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  className="delivery-modal__input"
                  defaultValue={selectedCountry}
                  placeholder={selectedCountry}
                  styles={{
                    placeholder: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: '#F2F3F6',
                      border: 'none',
                      paddingTop: 0,
                      marginTop: '0px',
                      fontWeight: 500,
                      color: state.isSelected ? '#ff00c5' : 'black',
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
                  }}
                />
              )}
              {(selectedCountry && console.log(selectedCountry)) ||
                console.log('null')}
            </div>
            <div className="delivery-modal__field-group">
              <label htmlFor="city" className="delivery-modal__label">
                Місто *
              </label>
              <input
                type="select"
                defaultValue="Київ"
                className="delivery-modal__input"
                name="city"
                id="city"
              />
            </div>
            <button className="delivery-modal__save-btn" type="submit">
              Зберегти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
