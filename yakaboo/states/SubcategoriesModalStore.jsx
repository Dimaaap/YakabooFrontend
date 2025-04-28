import { create } from "zustand"

export const useSubcategoriesModalStore = create((set) => ({
    isSubcategoriesModalOpen: false,
    setIsSubcategoriesModalOpen: (value) => set({isSubcategoriesModalOpen: value}),
    currentCategoryId: null,
    setCurrentCategoryId: (value) => set({currentCategoryId: value}),
    currentCategorySlug: null,
    setCurrentCategorySlug: (value) => set({currentCategorySlug: value}),
    isHoveringCategory: false,
    setIsHoveringCategory: (state) => set({isHoveringCategory: state}),
    isHoveringSubcategoryModal: false,
    setIsHoveringSubcategoryModal: (state) => set({isHoveringSubcategoryModal: state})
}))