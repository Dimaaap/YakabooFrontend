import { create } from "zustand";
import { persist } from "zustand/middleware";
import Endpoints from "../endpoints";

const emptyCart = {
  items: [],
  total_price: 0,
  discount: 0,
  final_price: 0,
  promo: null
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: emptyCart,
      setCart: (cart) => set({ cart }),

      clearCart: () => set({ cart: emptyCart }),

      addToCart: async (book, userEmail) => {
        try {
          const res = await fetch(
            Endpoints.ADD_ITEM_TO_CART(book.id, userEmail),
            { method: "POST" }
          )

          if(!res.ok){
            return;
          }

          const updatedCart = await res.json();
          set({ cart: updatedCart });
        } catch (err) {
          console.error("Adding to cart failed", err);
        }
      },

      deleteItemFromCart: async(bookId, userEmail) => {
        try {
          const res = await fetch(
            Endpoints.DELETE_ITEM_FROM_CART(userEmail, bookId),
            { method: "DELETE" }
          )

          if(!res.ok) return;

          const updatedCart = await res.json();

          set({ cart: updatedCart });
        } catch (err) {
          console.error(err)
        }
      },

      changeQuantity: async (bookId, type, userEmail) => {
        const item = get().cart.items.find(
          i => i.book_id === bookId
        )

        if(!item) return;

        const newQuantity = type === "add" ? item.quantity + 1 : item.quantity - 1;

        if(newQuantity < 1) return;

        try {
          const res = await fetch(
            Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity), 
            { method: "PATCH" }
          )

          if(!res.ok) return;

          const updatedCart = await res.json();

          set({ cart: updatedCart });
        } catch(err) {
          console.error(err)
        }
      },

    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage,
    }
  )
);
