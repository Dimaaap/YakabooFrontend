import { create } from "zustand"

export const useRedirectAfterLogoutStore = create((set) => ({
    isRedirectAfterLogout: false,
    setIsRedirectAfterLogout: (value) => set({ isRedirectAfterLogout: value })
}))