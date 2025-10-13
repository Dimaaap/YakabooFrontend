import { create } from "zustand"

export const useShowFlashMessageStore = create(()  => ({
    showFlashMessage: false,
    serverError: null,
    flashMessage: null
}))

export const setShowFlashMessage = val => {
    useShowFlashMessageStore.setState({ showFlashMessage: val })
}

export const setServerError = val => {
    useShowFlashMessageStore.setState({ serverError: val })
}

export const setFlashMessage = val => {
    useShowFlashMessageStore.setState({ flashMessage: val })
}