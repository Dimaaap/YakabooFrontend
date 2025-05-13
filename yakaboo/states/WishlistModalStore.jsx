import { create } from "zustand"


export const useWishListModalStore = create((set) => ({
    isWishlistModalOpen: false,
    setIsWishlistModalOpen: (value) => set({ isWishlistModalOpen: value })
}))