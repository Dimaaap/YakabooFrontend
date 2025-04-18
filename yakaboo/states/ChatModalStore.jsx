import { create } from "zustand"

export const useChatModalStore = create((set) => ({
    isChatModalOpen: false,
    setIsChatModalOpen: (value) => set({ isChatModalOpen: value })
}))