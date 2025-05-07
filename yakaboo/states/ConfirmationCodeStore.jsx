import { create } from "zustand"

export const useConfirmationCodeStore = create((set) => ({
    isConfirmationModalOpen: false,
    setIsConfirmationModalOpen: (value) => set({ isConfirmationModalOpen: value })
}))