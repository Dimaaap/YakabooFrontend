import { Validators } from "./inputDataValidators.service";

export const validationRules = {
  firstName: {
    required: "Ім'я обов'язкове",
    minLength: { value: 1, message: "Мінімум 1 символ" },
    pattern: { value: Validators.FIRST_AND_LAST_NAME, message: "Некоректні символи" },
  },
  lastName: {
    required: "Прізвище обов'язкове",
    minLength: { value: 1, message: "Мінімум 1 символ" },
    pattern: { value: Validators.FIRST_AND_LAST_NAME, message: "Некоректні символи" },
  },
  email: {
    required: "Введіть email",
    pattern: { value: Validators.EMAIL, message: "Некоректний формат email" },
  },
  comment: {
    maxLength: { value: 500, message: "Максимум 500 символів" }
  }
};
