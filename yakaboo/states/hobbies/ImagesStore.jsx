import { create } from "zustand";

export const useImageStore = create(() => ({
    activeImage: 0,
}))

export const setActiveImage = (index) => {
    useImageStore.setState({ activeImage: index })
}

export const showNextImage = (length) => {
    useImageStore.setState((state) => ({
        activeImage: state.activeImage < length - 1 ? state.activeImage + 1 : 0
    }))
}

export const showPrevImage = (length) => {
    useImageStore.setState((state) => ({
        activeImage: state.activeImage > 0 ? state.activeImage - 1 : length - 1
    }))
}