import { create } from "zustand";

export const useSortingOrderStore = create((set) => ({
    isSortingModalOpen: false,
    setIsSortingModalOpen: value => set({ isSortingModalOpen: value })
}))