import { create } from "zustand";

export const activeButtonStore = create(() => ({
    buttons: ["Всі", "Паперові", "Електронні", "Аудіо"],
    activeButton: 0
}))

export const setActiveButtonStore = val => {
    const { buttons } = activeButtonStore.getState();
    activeButtonStore.setState({ activeButton: val < buttons.length ? val : 0 })
}