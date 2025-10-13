import { create } from "zustand"

export const useShowBookStore = create((set) => ({
    showBooks: [],
    setShowBooks: (books) => set({ showBooks: books }),
    addBookContainer: (id) => set((state) => ({ showBooks: [...state.showBooks, id] })),
    removeBookContainer: (id) => set((state) => ({ showBooks: state.showBooks.filter((x) => x !== id) }))
}))