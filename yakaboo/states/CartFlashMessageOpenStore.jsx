import { create } from "zustand"


export const useCartFlashMessageOpenStore = create((set) => ({
    isAddToCartModalOpen: false,
    setIsAddToCartModalOpen: (value) => set({ isAddToCartModalOpen: value })
}))