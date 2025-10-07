import { create } from "zustand"

export const useShowFlassMessageStore = create(()  => ({
    showFlashMessage: false,
    serverError: null,
    flashMessage: null
}))

export const setShowFlashMessage = val => {
    useShowFlassMessageStore.setState({ showFlashMessage: val })
}

export const setServerError = val => {
    useShowFlassMessageStore.setState({ serverError: val })
}

export const setFlashMessage = val => {
    useShowFlassMessageStore.setState({ flashMessage: val })
}