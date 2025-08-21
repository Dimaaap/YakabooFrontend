import { create } from "zustand";

export const useAllCharacteristics = create(() => ({
    showAllCharacteristics: false
}))

export const setShowAllCharacteristics = val => {
    useAllCharacteristics.setState({ showAllCharacteristics: val })
}