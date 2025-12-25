import { create } from "zustand";
import { SORTING_ORDERS } from "../utils";

export const useCurrentSortingOrderStore = create((set) => ({
    currentSortingOrder: SORTING_ORDERS[0].label,
    setCurrentSortingOrder: (value) => set({ currentSortingOrder: value })
}))