"use client"

import { useState } from "react";
import { CookiesWorker } from "../services";

export const useUserData = () => {
    const [userData, setUserData] = useState({
        first_name: CookiesWorker.get("first_name"),
        last_name: CookiesWorker.get("last_name"),
        email: CookiesWorker.get("email"),
        phone_number: CookiesWorker.get("phone_number"),
        birth_date: CookiesWorker.get("birth_date") || ""
    })

    const updateFieldValue = (e, fieldTitle) => {
        let newValue = e.target.value;
        
        if(fieldTitle === "phone_number"){
            newValue = newValue.slice(1);
        }

        setUserData(prev => ({ ...prev, [fieldTitle]: newValue }))
    }

    const getDataToUpdate = () => {
        const newData = {};

        Object.keys(userData).forEach(field => {
            const cookieValue = CookiesWorker.get(field) || "";
            if(userData[field] !== cookieValue){
                newData[field] = userData[field]
            }
        })
        
        return newData;
    }

    return { userData, updateFieldValue, getDataToUpdate, setUserData }
}