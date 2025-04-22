import { create } from "zustand"

export const useMenuModalStore = create((set) => ({
    isMenuModalOpen: false,
    setIsMenuModalOpen: (value) => set({ isMenuModalOpen: value })
}))