"use client";

import { useState } from "react";
import Image from "next/image";
import { paymentOptions } from "../../services/checkoutOptions.service";
import { useDeliveryCountryStore } from "../../states";

export const PaymentMethodForm = ({ watch, register, setValue }) => {

    const [selectedPaymentOption, setSelectedPaymentOption] = useState("scholarPack")
    const { selectedCity } = useDeliveryCountryStore();

  return (
    <div className="checkout__form">
      <h5 className="checkout__form-title">Спосіб оплати</h5>

      <div className="checkout__form-payment-methods">
        {selectedCity?.payment_methods &&
          Object.entries(selectedCity.payment_methods).map(
            ([key, value], index) => {
              if (
                ['id', 'city_id', 'country_id'].includes(key) ||
                value === null
              )
                return null;

              const option = paymentOptions[key];

              if (!option) return null;

              return (
                <div
                  className={`checkout__form-payment-method 
                                                ${watch('paymentMethod') === option.htmlFieldName ? 'active' : ''} `}
                  key={index}
                  onClick={() => {
                    setValue('paymentMethod', option.htmlFieldName);
                    setSelectedPaymentOption(index, value);
                  }}
                >
                  <label
                    htmlFor={option.htmlFieldName}
                    className="checkout__form-label payment-label"
                  >
                    <div className="checkout__form-default-radio">
                      <input
                        type="radio"
                        name="paymentMethodOption"
                        {...register('paymentMethod')}
                        id={option.htmlFieldName}
                        value={option.htmlFieldName}
                        className="checkout__form-default-radio-input"
                      />
                    </div>
                    <div className="checkout__payment-container">
                      <Image src={option.icon} alt="" width="18" height="18" />
                      <span className="checkout__payment-text">
                        {option.label}
                      </span>
                    </div>
                  </label>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};
