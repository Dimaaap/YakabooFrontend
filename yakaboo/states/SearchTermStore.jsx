import { create } from "zustand";

export const useSearchTerm = create((set) => ({
    searchTerm: "",
    searchResponse: null,
    finalSearchTerm: "",
    setSearchResponse: (value) => set({ searchResponse: value }),
    setSearchTerm: (value) => set({ searchTerm: value }),
    setFinalSearchTerm: (value) => set({ finalSearchTerm: value })
}))