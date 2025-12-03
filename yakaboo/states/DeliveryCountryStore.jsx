import { create } from "zustand"

export const useDeliveryCountryStore = create((set) => ({
    countries: [],
    selectedCity: null,
    selectedDeliveryCountry: null,
    selectedCountry: "UA",

    setCountries: countries => set({ countries }),
    setSelectedCity: city => set({ selectedCity: city }),
    setSelectedDeliveryCountry: country => set({ selectedDeliveryCountry: country }),
    setSelectedCountry: countryCode => set({selectedCountry: countryCode})
}))