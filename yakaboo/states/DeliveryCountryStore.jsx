import { create } from "zustand"

export const useDeliveryCountryStore = create((set) => ({
    countries: [],
    selectedCity: null,
    selectedDeliveryCountry: null,
    selectedCountry: "UA",

    setCountries: countries => set({ countries }),
    setSelectedCity: city => set(() => ({
        selectedCity: {
            ...city,
            delivery_terms: { ...city.delivery_terms },
            payment_methods: JSON.parse(JSON.stringify(city.payment_methods))
        }
    })),
    setSelectedDeliveryCountry: country => set({ selectedDeliveryCountry: country }),
    setSelectedCountry: countryCode => set({selectedCountry: countryCode})
}))