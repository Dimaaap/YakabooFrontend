import { create } from 'zustand';

export const useSelectedCountryAndCity = create((set) => ({
  countries: [],
  setCountries: (value) => set({ countries: value }),
  selectedCountry: [],
  setSelectedCountry: (value) => set({ selectedCountry: value }),
  citiesList: [],
  setCitiesList: (value) => set({ citiesList: value }),
  selectedCity: [],
  setSelectedCity: (value) => set({ selectedCity: value }),
}));
