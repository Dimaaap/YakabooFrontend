import { create } from "zustand";

export const useSearchTerm = create((set) => ({
    searchTerm: "",
    searchResponse: null,
    setSearchResponse: (value) => set({ searchResponse: value }),
    setSearchTerm: (value) => set({ searchTerm: value })
}))