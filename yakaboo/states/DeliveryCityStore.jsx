import { create } from 'zustand';

export const useDeliveryCityStore = create((set) => ({
  deliveryCity: null,
  setDeliveryCity: (value) => set({ deliveryCity: value }),
}));
