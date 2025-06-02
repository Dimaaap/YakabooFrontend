"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteCookie, getCookie } from "../../../../utils"
import Endpoints from "../../../../endpoints"
import { useRedirectAfterLogoutStore } from "../../../../states"


export default function MyAccountLogout() {
    const router = useRouter()

    const { setIsRedirectAfterLogout } = useRedirectAfterLogoutStore();

    useEffect(() => {
        const logoutUser = async() => {
            const refreshToken = getCookie("refresh_token")

            if(refreshToken){
                try {
                    await fetch(Endpoints.USER_LOGOUT, {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json",
                            Authorization: `Bearer ${refreshToken}`
                        }
                    })
                } catch (error){
                    console.warn("Logout request failed. Proceeding anyway.")
                }
            }

            [
                "access_token", "refresh_token", "token_type",
                "email", "phone_number", "first_name", "last_name",
                "birth_date", "is_login"
            ].forEach(deleteCookie);

            localStorage.setItem("is_auth", "false");
            localStorage.removeItem("auth_expires");

            setIsRedirectAfterLogout(true);
            router.push("/")
        }

        logoutUser()
    }, [router, setIsRedirectAfterLogout])

    return null;
}