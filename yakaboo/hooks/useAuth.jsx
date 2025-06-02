"use client"

import { useEffect, useState } from "react";
import { getCookie, setCookiesWithTimer } from "../utils";
import Endpoints from "../endpoints";

const AUTH_TIMEOUT_MINUTES = 60

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const refreshAccessToken = async () => {
        const refreshToken = getCookie("refresh_token");
        console.log(refreshToken)

        if(!refreshToken){
            localStorage.setItem("is_auth", "false")
            setIsAuthenticated(false);
            return;
        }

        try {
            const res = await fetch(Endpoints.JWT_REFRESH_TOKEN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh_token: refreshToken })
            });

            const data = await res.json();

            if(data.access_token){
                setCookiesWithTimer("access_token", data.access_token, 60);
                localStorage.setItem("is_auth", "true");
                localStorage.setItem("auth_expires", (Date.now() + AUTH_TIMEOUT_MINUTES * 60 * 1000).toString());
                setIsAuthenticated(true);
            } else {
                localStorage.setItem("is_auth", "false");
                setIsAuthenticated(false);
            }
        } catch(error){
            localStorage.setItem("is_auth", "false")
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        const isAuth = localStorage.getItem("is_auth");
        const expires = localStorage.getItem("auth_expires");

        if(isAuth === "true" && expires && Date.now() < parseInt(expires)){
            setIsAuthenticated(true);
            return;
        }

        const accessToken = getCookie("access_token");
        const isLogin = getCookie("is_login") || "false";

        if(accessToken && isLogin === "false"){
            fetch(Endpoints.CHECK_ACCESS_TOKEN, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${ accessToken }`
                }
            }).then(res => {
                if(res.ok){
                    localStorage.setItem("is_auth", "true");
                    localStorage.setItem("auth_expires", (Date.now() + AUTH_TIMEOUT_MINUTES * 60 * 1000).toString())
                    setIsAuthenticated(true)
                } else {
                    refreshAccessToken()
                }
            }).catch(() => {
                refreshAccessToken();
            })
        } else {
            refreshAccessToken();
        }
    }, [])

    return isAuthenticated
}