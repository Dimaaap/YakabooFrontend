import { create } from 'zustand';

export const useDeliveryCityStore = create((set) => ({
  deliveryCity: null,
  deliveryCountry: null,
  setDeliveryCountry: (value) => set({ deliveryCountry: value }),
  setDeliveryCity: (value) => set({ deliveryCity: value }),
}));
