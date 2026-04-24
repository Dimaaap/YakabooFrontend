import { create } from "zustand";

export const useSimpleFlashMessage = create((set) => ({
    isSimpleFlashMessage: false,
    setIsSimpleFlashMessage: (value) => set({ isSimpleFlashMessage: value })
}))