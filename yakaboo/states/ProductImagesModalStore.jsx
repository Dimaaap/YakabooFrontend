import { create } from 'zustand';

export const useProductImagesStore = create((set) => ({
  isProductImagesOpen: false,
  setIsProductImagesOpen: (value) => set({ isProductImagesOpen: value }),
}));
