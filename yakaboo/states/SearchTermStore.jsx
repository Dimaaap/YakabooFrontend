import { create } from "zustand";

export const useSearchTerm = create((set) => ({
    searchTerm: "",
    setSearchTerm: (value) => set({ searchTerm: value })
}))