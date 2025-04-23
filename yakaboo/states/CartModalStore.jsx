import { create } from "zustand"

export const useCartModalStore = create((set) => ({
    isCartModalOpen: false,
    setIsCartModalOpen: (value) => set({ isCartModalOpen: value })
}))