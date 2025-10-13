import { create } from "zustand";

export const useWishlists = create(() => ({
    selectedWishlistForUpdate: null,
    wishlists: [],
    wishlistToDelete: null,
    deleteMode: null,
    wishlistBooks: {},
    agreedParams: {},
}))

export const setSelectedWishlistForUpdate = wishlist => {
    useWishlists.setState({ selectedWishlistForUpdate: wishlist })
}

export const setWishlistToDelete = wishlist => {
    useWishlists.setState({ wishlistToDelete: wishlist })
}

export const setDeleteMode = mode => {
    useWishlists.setState({ deleteMode: mode })
}


export const setAgreedParams = val => {
    useWishlists.setState((state) => ({
        agreedParams: {...state.agreedParams, ...val}
    }))
}

export const setWishlists = updater => {
    useWishlists.setState((state) => {
        const nextValue = typeof updater === "function" ? updater(state.wishlists) : updater;
    return { wishlists: nextValue }
    })
}