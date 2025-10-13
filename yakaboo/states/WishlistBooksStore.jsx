import { create } from "zustand"
import { LocalStorageWorker } from "../services";

export const useWishlistBooksStore = create((set) => ({
    wishlistBooks: {},

    setWishlistBooks: (book) => set({ wishlistBooks: book }),

    setBooksForWishlist: (wishlistId, books) =>
        set((state) => {
            const updated = {...state.wishlistBooks, [wishlistId]: books};
            LocalStorageWorker.set(`wishlist_${wishlistId}_books`, books);
            return {wishlistBooks: updated}
        }),

    removeBookFromWishlist: (wishlistId, bookId) => 
        set((state) => {
            const updatedBooks = (state.wishlistBooks[wishlistId] || []).filter(
                (book) => book.id !== bookId
            );

            LocalStorageWorker.set(`wishlist_${wishlistId}_books`, updatedBooks);
            return { wishlistBooks: {...state.wishlistBooks, [wishlistId]: updatedBooks} }  
        })
}))