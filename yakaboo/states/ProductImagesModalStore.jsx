import { create } from 'zustand';

export const useProductImagesStore = create((set) => ({
  isProductImagesOpen: false,
  isReadPart: false,
  setIsProductImagesOpen: (value) => set({ isProductImagesOpen: value }),
  setIsReadPart: (value) => set({ isReadPart: value })
}));
