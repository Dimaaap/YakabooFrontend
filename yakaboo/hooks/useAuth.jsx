"use client"

import { useEffect, useState } from "react";
import { getCookie, setCookiesWithTimer } from "../utils";
import Endpoints from "../endpoints";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const refreshAccessToken = () => {
        const refreshToken = getCookie("refresh_token")

        if(refreshToken){
            fetch(Endpoints.JWT_REFRESH_TOKEN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh_token: refreshToken })
            })
            .then(res => res.json())
            .then(data => {
                if(data.access_token){
                    setCookiesWithTimer("access_token", data.access_token, 60);
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            })
        }
        return isAuthenticated
    }

    useEffect(() => {
        const accessToken = getCookie("access_token")

        if(accessToken){
            fetch(Endpoints.CHECK_ACCESS_TOKEN, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(response => {
                if(response.ok){
                    setIsAuthenticated(true)
                } else {
                    refreshAccessToken()
                }
            })
            .catch(() => {
                refreshAccessToken()
            })
        } else {
            refreshAccessToken()
        }
    }, [])

    return isAuthenticated
}