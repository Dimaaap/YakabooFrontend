import { create } from "zustand"

export const useProfileSettingsModalStore = create((set) => ({
    isProfileSettingsModalOpen: false,
    setIsProfileSettingsModalOpen: (value) => set({ isProfileSettingsModalOpen: value })
}))