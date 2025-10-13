import { create } from "zustand"

export const useActiveBtnStore = create(() => ({
    activeBtn: false
}))

export const setActiveBtn = val => {
    useActiveBtnStore.setState({ activeBtn: val })
}