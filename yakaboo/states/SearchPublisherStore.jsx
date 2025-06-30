import { create } from 'zustand';

export const useSearchPublisherStore = create((set) => ({
  searchValue: '',
  setSearchValue: (value) => set({ searchValue: value }),
}));
