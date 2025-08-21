import { create } from "zustand"

export const useProductInfoState = create(() => ({
    showProductInfoModal: false,
}))

export const setShowProductInfoModal = val => {
    useProductInfoState.setState({ showProductInfoModal: val })
}

export const handleScrollForProductInfoModal = (scrollOffset = 90) => {
    const scrollY = window.scrollY;
    setShowProductInfoModal(scrollY > scrollOffset)
}