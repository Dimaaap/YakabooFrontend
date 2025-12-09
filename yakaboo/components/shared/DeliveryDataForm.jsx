"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { useDeliveryCountryStore, useDeliveryOptionsStore } from "../../states";
import { deliveryOptions } from "../../services/checkoutOptions.service";
import { SelectField } from ".";

export const DeliveryDataForm = ({ setValue, register, watch, control, errors }) => {
  const { 
    countries, selectedCity, selectedDeliveryCountry,
    setCountries, setSelectedCity, setSelectedDeliveryCountry,
   } = useDeliveryCountryStore();

  const { ukrpostOffices, newPostPostomats, 
    meestPostOffices, newPostOffices, filteredOffice, setSelectedDeliveryOption, 
    setDeliveryPrice, setUkrpostOffices, setNewPostomats, setMeestPostOffices,
    setNewPostOffices, setFilteredOffice
  } = useDeliveryOptionsStore();

  useEffect(() => {
    fetchData(Endpoints.ALL_COUNTRIES, setCountries, "countries")
  }, [])

  useEffect(() => {
    if(countries.length > 0 && !selectedDeliveryCountry){
      const defaultCountry = countries[0];
      setSelectedDeliveryCountry(defaultCountry);

      if(defaultCountry?.cities?.length){
        setSelectedCity(defaultCountry.cities[0]);
      }
    }
  }, [countries])


  useEffect(() => {
    if (selectedDeliveryCountry) {
      setValue("country", selectedDeliveryCountry.title);
    }
  }, [selectedDeliveryCountry]);

  useEffect(() => {
    if (selectedCity) {
      setValue("city", selectedCity.title);
    }
  }, [selectedCity]);

  useEffect(() => {
      fetchData(Endpoints.ALL_OFFICES, setUkrpostOffices, "ukrpost_offices");
      fetchData(Endpoints.MEEST_ALL_OFFICES, setMeestPostOffices, "meest_offices");
      fetchData(Endpoints.NEW_POST_ALL_POSTOMATS, setNewPostomats, "new_post_postomats");
      fetchData(Endpoints.NEW_POST_ALL_OFFICES, setNewPostOffices, "new_post_offices")
    }, [])

    useEffect(() => {
      if(!selectedCity){
        return
      }

      if(meestPostOffices.length > 1){
        setFilteredOffice(meestPostOffices.filter((office) => office.city_id === selectedCity.id))
      } else if(newPostOffices.length > 1){
        setFilteredOffice(newPostOffices.filter((office) => office.city_id === selectedCity.id))
      } else if(ukrpostOffices.length > 1){
        setFilteredOffice(ukrpostOffices.filter((office) => office.city_id === selectedCity.id))
      } else if(newPostPostomats.length > 1){
        setFilteredOffice(newPostPostomats.filter((postomat) => postomat.city_id === selectedCity.id))
      }
    }, [selectedCity, meestPostOffices, newPostOffices, ukrpostOffices, newPostPostomats])

  const handleChangeSelectedCountry = selectedCountry => {
    const matchedCountry = countries.find((country) => country.title === selectedCountry.value);

    setSelectedDeliveryCountry(matchedCountry);

    if(matchedCountry?.cities?.length){
      setSelectedCity(matchedCountry.cities[0]);
    } else {
      setSelectedCity(null);
    }
  }

  const handleChangeSelectedCity = selectedCity => {
    const matchedCity = selectedDeliveryCountry?.cities?.find((city) => city.title === selectedCity.value);
    setSelectedCity(matchedCity);
  }

  const getCountryCities = () => {
    return(
      selectedDeliveryCountry?.cities?.map((city) => ({
        value: city.title,
        label: city.title
      }))
    )
  }

  let countriesOptions = useMemo(() => {
        return countries.map((country) => ({
            value: country.title,
            label: country.title
        }))
    }, [countries])

  const selectedCountryOption = useMemo(() => {
    return selectedDeliveryCountry ? {
      value: selectedDeliveryCountry.title,
      label: selectedDeliveryCountry.title,
    }: null
  }, [selectedDeliveryCountry])


  const handleSelectNewLabel = (index, price) => {
      setSelectedDeliveryOption(index);
      setDeliveryPrice(price);
  }

  const handleFilteredOfficesList = (fieldName) => {
      if(!selectedCity) {
          return;
      }

      if(fieldName === "meestPost"){
          setFilteredOffice(meestPostOffices.filter((office) => office.city_id === selectedCity.id))
      } else if(fieldName === "ukrpostOffice"){
          setFilteredOffice(ukrpostOffices.filter((office) => office.city_id === selectedCity.id))
      } else if(fieldName ==="newPostToMailbox") {
          setFilteredOffice(newPostPostomats.filter((postomat) => postomat.city_id == selectedCity.id))
      } else if(fieldName === "newPostToOffice") {
          setFilteredOffice(newPostOffices.filter((office) => office.city_id === selectedCity.id));
      }
  }

  return (
    <div className="checkout__form">
      <h5 className="checkout__form-title">Доставка</h5>

      <div className="checkout__form-input-row">
        { countries.length && (
          <SelectField
          id="country"
          options={ countriesOptions }
          value={ selectedCountryOption }
          onChange={( option ) => {
            setValue("country", option.value);
            handleChangeSelectedCountry(option);
          }}
          placeholder={selectedDeliveryCountry?.title}
          label="Країна *"
          />
        ) }

        { selectedDeliveryCountry?.cities?.length && (
          <SelectField 
          id="city"
          options={ getCountryCities() }
          value={ selectedCity ? {value: selectedCity.title, label: selectedCity.title} : ""}
          onChange={(option) => {
            setValue("city", option.value);
            handleChangeSelectedCity(option)
          }}
          placeholder={selectedCity?.title}
          label="Місто *"
          />
        ) }
      </div>

      <div className="checkout__form-options-container">
        <label htmlFor="delivery-method" className="checkout__form-label">
          Спосіб доставки *
        </label>

        <div className="checkout__form-delivery-methods">
          {selectedCity?.delivery_terms &&
            Object.entries(selectedCity.delivery_terms).map(
              ([key, value], index) => {
                if (
                  ['id', 'city_id', 'country_id'].includes(key) ||
                  value === null
                )
                  return null;

                const option = deliveryOptions[key];

                if (!option) return null;

                return (
                  <div
                    className={`checkout__form-delivery-method`}
                    key={index}
                    onClick={() => {
                      setValue('deliveryMethod', option.htmlFieldName);
                      handleSelectNewLabel(index, value);
                      handleFilteredOfficesList(option.htmlFieldName);
                    }}
                  >
                    <label
                      htmlFor={option.htmlFieldName}
                      className={`checkout__form-label delivery-label ${watch('deliveryMethod') === option.htmlFieldName ? 'active' : ''}`}
                    >
                      <div className="checkout__form-label-main-container">
                        <div className="checkout__form-default-radio">
                          <input
                            type="radio"
                            name="deliveryMethoOption"
                            {...register('deliveryMethod')}
                            id={option.htmlFieldName}
                            value={option.htmlFieldName}
                            className="checkout__form-default-radio-input"
                          />
                        </div>

                        <div className="checkout__form-delivery-info">
                          <div className="checkout__form-delivery-info-logo">
                            <span className="checkout__form-delivery-info-logo-icon">
                              <Image
                                src={option.icon}
                                alt=""
                                width="18"
                                height="18"
                              />
                            </span>
                            <span className="checkout__form-delivery-info-logo-title">
                              {option.label}
                            </span>
                          </div>
                          <div className="checkout__form-delivery-description">
                            <span className="checkout__form-delivery-description-part">
                              {value === 0 ? 'безкоштовно' : `${value} грн`}
                            </span>
                            <div className="separator-dot"></div>
                            <span className="checkout__form-delivery-description-part">
                              {`термін доставки ${option.deliveryTime}`}
                            </span>
                            {option?.hasFree && (
                              <div className="separator-dot"></div>
                            )}
                            {option?.hasFree && (
                              <span className="checkout__form-delivery-description-part">
                                {option.hasFree}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>

                    {watch('deliveryMethod') === option.htmlFieldName &&
                      option.formContent(
                        register,
                        watch,
                        control,
                        errors,
                        filteredOffice
                      )}
                  </div>
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};
