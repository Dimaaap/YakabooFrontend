import { create } from "zustand"

export const useUpdateWishlistModalStore = create((set) => ({
    isUpdateWishlistModalOpen: false,
    setIsUpdateWishlistModalOpen: (value) => set({ isUpdateWishlistModalOpen: value })
}))