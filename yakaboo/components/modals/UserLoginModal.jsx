'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useUserLoginModalStore } from '../../states';

import { useForm } from 'react-hook-form';
import Endpoints from '../../endpoints';
import {
  CookiesWorker,
  FormValidator,
  handleBackdropClick,
} from '../../services';
import { useBlockBodyScroll } from '../../hooks';

const UserLoginModal = ({ afterClose = null }) => {
  const TWO_MINUTES = 2 * 60 * 1000;
  const ONE_WEEK = 60 * 24 * 7;
  const ONE_MONTH = 43_200;

  const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen } =
    useUserLoginModalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [sendgingLoading, setSendingLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const formValidator = new FormValidator();
  useBlockBodyScroll(isLoginModalOpen);

  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
    } catch (error) {
      setServerError(error);
    }
  };

  const changeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    if (afterClose) {
      afterClose();
    }
  };

  const handleUserForgotPassword = async (event) => {
    event.preventDefault();
    setServerError(null);

    const email = getValues('email');
    console.log(email);

    if (!email) {
      setEmailError("Це поле обов'язкове");
    } else if (!formValidator.validateEmailRegex(email)) {
      setEmailError('Неправильний формат email');
    } else {
      try {
        setSendingLoading(true);
        setEmailError(null);
        const response = await fetch(Endpoints.CHANGE_PASSWORD_WITH_EMAIL, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: email,
          }),
        });

        if (response.ok) {
          setInfoMessage(`Відправили вам оновлений пароль на email: ${email}`);

          setTimeout(() => {
            setInfoMessage(null);
          }, 10000);

          setIsButtonDisabled(true);
          setTimeout(() => setIsButtonDisabled(false), TWO_MINUTES);
        } else {
          const error = await response.json();
          console.error(error);
          setServerError('Користувач з таким email не зареєстрований');
        }
      } catch (error) {
        setServerError('Користувач з таким email не зареєстрований');
      } finally {
        setSendingLoading(false);
      }
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await fetch(Endpoints.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setError('password', {
            type: 'manual',
            message: 'Неправильний пароль',
          });
          setServerError(null);
        } else {
          setServerError(errorData.detail || 'Невідома помилка');
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
      } else {
        const result = await response.json();
        const access_token = result.access_token;
        const refresh_token = result.refresh_token;
        const dataForCookies = [
          {
            title: 'access_token',
            value: access_token,
            time: 30,
          },
          {
            title: 'refresh_token',
            value: refresh_token,
            time: ONE_WEEK,
          },
          {
            title: 'token_type',
            value: result.token_type,
            time: ONE_WEEK,
          },
          {
            title: 'email',
            value: result.user.email,
            time: ONE_MONTH,
          },
          {
            title: 'first_name',
            value: result.user.first_name,
            time: ONE_MONTH,
          },
          {
            title: 'last_name',
            value: result.user.last_name,
            time: ONE_MONTH,
          },
          {
            title: 'phone_number',
            value: result.user.phone_number,
            time: ONE_MONTH,
          },
        ];
        dataForCookies.map((data) =>
          CookiesWorker.setWithTimer(data.title, data.value, data.time)
        );
        setServerError(null);
        setIsLoginModalOpen(false);
        window.location.reload();
        
      }
    } catch (error) {
      console.error(error);
      setServerError('Помилка сервера');
    }
  };

  return (
    <div
      className="menu login-modal"
      onClick={(e) => handleBackdropClick(e, setIsLoginModalOpen)}
    >
      <div className="login-modal__content">
        <button
          className="menu__close login-modal__close"
          type="button"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <Image
            src="/icons/close-smaller.svg"
            alt=""
            width="22"
            height="22"
            onClick={handleCloseModal}
          />
        </button>
        <div className="login-modal__header">
          <div className="login-modal__user-icon-container">
            <Image src="/icons/user-white.svg" alt="" width="18" height="18" />
          </div>
          <div className="login-modal__text-container">
            <p className="login-modal__welcome">Вхід до акаунту</p>
            <p>
              Щоб слідкувати за статусом замовлення та отримувати індивідуальні
              рекомендації
            </p>
          </div>
        </div>
        <button className="login-modal__login-with" type="button">
          <Image src="/icons/social/google.svg" alt="" width="16" height="16" />
          Продовжити через Google
        </button>
        <div className="login-modal__separator separator">
          <span className="separator-line" />
          <span className="separator-text">або</span>
          <span className="separator-line" />
        </div>
        <form
          className="login-modal__form login-form form"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form__field-group">
            <label htmlFor="email" className="form__label">
              Email *
            </label>
            <input
              name="email"
              id="email"
              className={`form__input ${errors.email || serverError || emailError ? 'failed-input' : ''}`}
              placeholder="Введіть email"
              type="email"
              {...register('email', {
                required: "Це поле обов'язкове",
                pattern: {
                  value: formValidator.EMAIL_REGEX,
                  message: formValidator.REG_EMAIL_FAILED_MESSAGE,
                },
              })}
            />
            {errors.email && (
              <span className="form__message-text">{errors.email.message}</span>
            )}

            {emailError && (
              <span className="form__message-text">{emailError}</span>
            )}

            {serverError && (
              <span className="form__message-text">{serverError}</span>
            )}
          </div>
          <div className="form__field-group">
            <div className="form__field-row">
              <label htmlFor="password" className="form__label">
                Пароль *
              </label>
              <button
                className={`form__forgot-password ${isButtonDisabled ? 'disabled' : ''}`}
                type="button"
                disabled={isButtonDisabled}
                onClick={handleUserForgotPassword}
              >
                Забули пароль?
              </button>
            </div>
            <div className="form__input-wrapper">
              <input
                name="password"
                id="password"
                className={`form__input password-input ${errors.password ? 'failed-input' : ''}`}
                placeholder="Введіть пароль"
                type={`${showPassword ? 'text' : 'password'}`}
                {...register('password', {
                  required: "Це поле обов'язкове",
                  minLength: {
                    value: 8,
                    message: 'Пароль повинен містити не менше 8 символів',
                  },
                  pattern: {
                    value: formValidator.REG_PASSWORD_VALIDATOR,
                    message: formValidator.REG_PASSWORD_FAILED_MESSAGE,
                  },
                })}
              />

              <Image
                src={`${!showPassword ? '/icons/eye-close.svg' : '/icons/eye.svg'}`}
                alt=""
                width="16"
                height="16"
                className={`form__eye login-eye ${showPassword ? 'open-eye' : ''}`}
                onClick={toggleShowPassword}
              />
            </div>
            {errors.password && (
              <span className="form__message-text">
                {errors.password.message}
              </span>
            )}
            {infoMessage && (
              <span className="form__info-message-container">
                {infoMessage}
              </span>
            )}

            {sendgingLoading && (
              <Image
                src="/icons/spinner.svg"
                width="20"
                height="20"
                alt=""
                className="animate-spin"
              />
            )}
          </div>
          <button className="form__submit-btn" type="submit">
            Увійти
          </button>
        </form>
        <p className="login-modal__additional-info">
          Немає акаунту?{' '}
          <span className="login-modal__link-span" onClick={changeModal}>
            Зареєструватись
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLoginModal;
