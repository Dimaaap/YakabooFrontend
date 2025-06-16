import { create } from 'zustand';

export const useDeliveryModalStore = create((set) => ({
  isDeliveryModalOpen: false,
  setIsDeliveryModalOpen: (value) => set({ isDeliveryModalOpen: value }),
}));
