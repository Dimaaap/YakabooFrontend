import { create } from "zustand";
import { CookiesWorker } from "../services";

export const usePromoCodeStore = create((set, get) => ({
    usedPromoCode: {},  
    priceWithPromoCode: 0,

    initPromoCode: () => {
        const cookies = CookiesWorker.get("promo_code");

        if(cookies){
            set({ usedPromoCode: JSON.parse(cookies) });
        }
    },

    setUsedPromoCode: (promoData) => {
        set(() => ({
            usedPromoCode: promoData
        }))
    },

    clearPromoCode: () => {
        CookiesWorker.delete("promo_code");
        set({
            usedPromoCode: {},
            priceWithPromoCode: 0
        })
    },

    calculateDiscountPrice: (total) => {
        const { usedPromoCode } = get();

        if(!usedPromoCode?.discount){
            set({ priceWithPromoCode: total })
            return total;
        }

        let finalPrice = total;

        if(usedPromoCode.discount_type === "percent"){
            finalPrice = total - total * (usedPromoCode.discount / 100);
        } else {
            finalPrice = total - usedPromoCode.discount;
        }

        if (finalPrice < 0) {
            finalPrice = 0;
        }

        set({ priceWithPromoCode: finalPrice });
        return finalPrice;
    }
}))