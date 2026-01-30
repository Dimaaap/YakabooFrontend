import { create } from "zustand"

export const useHistoryStore = create((set) => ({
    history: [],

    setHistory: (value) => set({ history: value })
}))