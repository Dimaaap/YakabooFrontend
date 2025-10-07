import { create } from "zustand"

export const useWishlistsStore = create((set) => ({
    wishlists: []
}))

export const setWishlists = updater => {
    useWishlistsStore.setState((state) => {
        const nextValue = typeof updater === "function" ? updater(state.wishlists) : updater;
    return { wishlists: nextValue }
    })
}