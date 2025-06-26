import { create } from 'zustand';

export const useDeliveryCityStore = create((set) => ({
  deliveryLocation: null,
  deliveryLocationType: null,
  setDeliveryLocation: (value) => set({ deliveryLocation: value }),
  setDeliveryLocationType: (value) => set({ deliveryLocationType: value }),
}));
