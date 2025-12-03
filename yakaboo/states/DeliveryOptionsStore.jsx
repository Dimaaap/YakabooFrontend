import { create } from "zustand"

export const useDeliveryOptionsStore = create((set) => ({
    selectedDeliveryOption: "ukrpostCourier",
    deliveryPrice: 0,
    ukrpostOffices: [],
    newPostPostomats: [],
    meestPostOffices: [],
    newPostOffices: [],
    filteredOffice: [],

    setSelectedDeliveryOption: option => set({ selectedDeliveryOption: option }),
    setDeliveryPrice: price => set({ deliveryPrice: price }),
    setUkrpostOffices: ukrpostOffices => set({ ukrpostOffices }),
    setNewPostomats: newPostPostomats => set({ newPostPostomats }),
    setMeestPostOffices: meestPostOffices => set({ meestPostOffices }),
    setNewPostOffices: newPostOffices => set({ newPostOffices }),
    setFilteredOffice: filteredOffice => set({ filteredOffice })
}))