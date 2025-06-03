"use client";

import { useEffect, useState } from "react";
import { CookiesWorker } from "../services";

export const useSubscriptionChecked = () => {
    const [userSubscribed, setUserSubscribed] = useState(false);

    useEffect(() => {
        const check = async() => {
            try {
                const email = CookiesWorker.get("email");
                const res = await fetch(`http://127.0.0.1:8003/subs/check/${email}`);

                if(res.ok){
                    const data = await res.json();
                    setUserSubscribed(data.exists);
                }
            } catch(error){
                setUserSubscribed(false);
            }
        }

        check();
    }, [])

    return userSubscribed;
}