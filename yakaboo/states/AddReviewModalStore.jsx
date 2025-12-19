import { create } from "zustand"

export const useAddReviewModalStore = create((set) => ({
    isAddReviewModalOpen: false,
    setIsAddReviewModalOpen: (value) => set({ isAddReviewModalOpen: value })
}))