"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation";

import Image from "next/image";

import { useProtectedPage } from "../../../../hooks"
import { useRedirectAfterLogoutStore } from "../../../../states";
import { deleteCookie, getCookie } from "../../../../utils";
import Endpoints from "../../../../endpoints";
import { UserLoginModal } from "../../../../components/modals/UserLoginModal";

export default function MyAccountLogout() {

    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
    const { setIsRedirectAfterLogout } = useRedirectAfterLogoutStore();
    
    const router = useRouter()

    const logoutUser = async() => {
        const refreshToken = getCookie("refresh_token");

        if(refreshToken){
            try {
                const response = await fetch(Endpoints.USER_LOGOUT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${refreshToken}`
                    }
                })

                if(response.ok){
                    const cookiesForDelete = [
                        "access_token", "refresh_token", "token_type", 
                        "email", "phone_number", "first_name", "last_name",
                        "birth_date"
                    ]

                    cookiesForDelete.forEach((cookie) => {
                        deleteCookie(cookie)
                    })
                    setIsRedirectAfterLogout(true)
                    router.push('/')
                }
            } catch(err){
                console.error(err)
            }
        }
    }

    useEffect(() => {
        if(isAuthenticated){
            logoutUser();
        }
    }, [isAuthenticated])

    if (loading) {
        return <Image src="/icons/spinner.svg" width="20" height="20" alt="" className="animate-spin" />
    }

    return(
        <>
             {!isAuthenticated ? (
                <UserLoginModal afterClose={handleCloseModal} />
            ) : (
                <></>
            )}
        </>
    )
}