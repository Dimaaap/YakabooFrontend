import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
  activeLang: 'uk',
  setActiveLang: (value) => set({ activeLang: value }),
}));
