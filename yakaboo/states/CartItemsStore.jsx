import { create } from "zustand";
import { persist } from "zustand/middleware"

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: null,

            setCartItems: (updater) => set((state) => ({ cartItems: typeof updater === "function" ? updater(state.cartItems) : updater })),

            clearCart: () => set({ cartItems: {items: [], total_price: 0} }),

            updateCartItemQuantity: (bookId, newQuantity) => set((state) => {
                if(!state.cartItems?.items) return state;

                const updatedItems = state.cartItems.items.map((item) => item.book_id === bookId ? 
                {...item, quantity: newQuantity, total: item.price * newQuantity} : 
                item)

                const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

                return {cartItems: {...state.cartItems, items: updatedItems, total_price: updatedTotal }}
            })
        }),

        {
            name: "cart-storage",
            getStorage: () => localStorage,
            partialize: (state) => ({ cartItems: state.cartItems })
        }
    )
)