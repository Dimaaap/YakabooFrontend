import { create } from 'zustand';

export const useLetterStore = create((set) => ({
  activeLetter: '',
  setActiveLetter: (letter) => set({ activeLetter: letter }),
}));
