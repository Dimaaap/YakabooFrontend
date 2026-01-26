import { create } from "zustand";

export const useSearchHistoryOpenStore = create((set) => ({
    isSearchHistoryModalOpen: false,
    setIsSearchHistoryModalOpen: (value) => set({ isSearchHistoryModalOpen: value })
}))