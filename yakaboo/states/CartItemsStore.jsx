import { create } from "zustand";
import { persist } from "zustand/middleware";
import Endpoints from "../endpoints";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: { items: [], total_price: 0 },
      prevQuantities: {},

      calcTotal(items) {
        return items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 0),
          0
        );
      },

      setCartItems: (updater) =>
        set((state) => ({
          cartItems:
            typeof updater === "function"
              ? updater(state.cartItems)
              : updater,
      })),

      deleteItemFromCart: async(bookId, userEmail) => {
        const res = await fetch(Endpoints.DELETE_ITEM_FROM_CART(userEmail, bookId), 
        {
          method: "DELETE"
        });

        if(!res.ok) return;

        set((state) => {
          const updatedItems = state.cartItems.items.filter(
            (item) => item.book_id !== bookId
          );

          return {
            cartItems: {
              items: updatedItems,
              total_price: get().calcTotal(updatedItems)
            }
          }
        })
      },

      changeQuantity: async(bookId, type, userEmail) => {
        const { cartItems } = get();
        const currentItem = cartItems.items.find((item) => item.book_id === bookId);
        if(!currentItem) return;

        const newQuantity = type === "add" 
        ? currentItem.quantity + 1 
        : currentItem.quantity - 1;

        const res = await fetch(
          Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity),
          {
            method: "PATCH",
            headers: {"Content-Type": "application/json"}
          }
        );

        if(!res.ok) return;

        get().updateCartItemQuantity(bookId, newQuantity);
      },

      setPrevQuantities: (updater) => set((state) => ({
        prevQuantities: typeof updater === "function" ? updater(state.prevQuantities) : updater,
      })),

      clearCart: () => set({ cartItems: { items: [], total_price: 0 } }),

      updateCartItemQuantity: (bookId, newQuantity) =>
        set((state) => {

          const updatedItems = state.cartItems.items.map((item) =>
            item.book_id === bookId
              ? {
                  ...item,
                  quantity: newQuantity
                }
              : item
          );

          return {
            cartItems: {
              ...state.cartItems,
              items: updatedItems,
              total_price: get().calcTotal(updatedItems)
            },
          };
      }),

      handleQuantityChangeLocal: (bookId, newValue) => {
        const { setCartItems } = get()

        if(newValue === ""){
            setCartItems((prev) => ({
              ...prev,
              items: prev.items.map((item) => 
                item.book_id === bookId 
                ? {...item, quantity: ""}
                :item
              )
            }));

            return;
        }

        const newQuantity = parseInt(newValue);
        if(isNaN(newQuantity) || newQuantity < 1){
            return;
        }

        setCartItems((prev) => ({
          ...prev,
          items: prev.items.map((item) => 
            item.book_id === bookId
            ? { ...item, quantity: newQuantity }
            : item
          )
        }))
      },

      handleQuantityBlur: async(bookId, newValue, userEmail) => {
        const { setCartItems, updateCartItemQuantity } = get();

        const oldQuantity = get().prevQuantities?.[bookId];

        if(newValue === "" || isNaN(parseInt(newValue))){
            setCartItems((prev) => ({
              ...prev,
              items: prev.items.map((item) =>  
                item.book_id === bookId 
                ? { ...item, quantity: oldQuantity }
                : item
              )
            }))

            return
        }

        const newQuantity = parseInt(newValue);

        const res = await fetch(Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(res.ok){
            updateCartItemQuantity(bookId, newQuantity)
        } else {
          console.error("Error updating quantity")
        }
      },

      handleFocus: (bookId) => {
        const { cartItems, setPrevQuantities } = get();
        
        const currentQuantity = cartItems.items.find(
          (item) => item.book_id === bookId
        )?.quantity;

        setPrevQuantities((prev) => ({
          ...prev,
          [bookId]: currentQuantity
        }))
      }
    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage,
    }
  )
);
