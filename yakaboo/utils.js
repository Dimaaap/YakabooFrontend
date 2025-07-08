import { CookiesWorker } from './services';

export const getUserFullName = () => {
  const firstName = CookiesWorker.get('first_name');
  const lastName = CookiesWorker.get('last_name');

  return `${firstName} ${lastName}`;
};

export const getUniqueErrorField = (errorStr) => {
  const errorField = errorStr.msg?.split(':')[1];
  return errorField?.trim();
};

export const formatLocalDate = (dateStr) => {
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const date = new Date(dateStr);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}р.`;
};
