import { create } from "zustand"

export const useAddToWishlistModalStore = create(() => ({
    isAddToWishlistModalOpen: false
}))

export const setIsAddToWishlistModalOpen = value => {
    useAddToWishlistModalStore.setState({ isAddToWishlistModalOpen: value })
}