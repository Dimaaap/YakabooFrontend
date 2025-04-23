import { create } from "zustand"

export const useBookCategoriesModalStore = create((set) => ({
    isCategoriesModalOpen: false,
    setIsCategoriesModalOpen: (value) => set({ isCategoriesModalOpen: value })
}))