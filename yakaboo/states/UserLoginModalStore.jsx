import { create } from "zustand";

export const useUserLoginModalStore = create((set) => ({
    isLoginModalOpen: false,
    setIsLoginModalOpen: (value) => set({ isLoginModalOpen: value })
}))