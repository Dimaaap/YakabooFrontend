import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserLoginModalStore } from "../states";
import { useAuth } from ".";

export const useProtectedPage = () => {
    const router = useRouter();
    const isAuthenticated = useAuth();
    
    const { isLoginModalOpen, setIsLoginModalOpen } = useUserLoginModalStore()
    const [authChecked , setAuthChecked] = useState(false);

    useEffect(() => {
        if(isAuthenticated !== undefined){
            if(!isAuthenticated){
                setIsLoginModalOpen(true)
            } else {
                setIsLoginModalOpen(false);
            }
            setAuthChecked(true)
        }
    }, [isAuthenticated, setIsLoginModalOpen])

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
        router.push("/")
    }

    return { isAuthenticated, isLoginModalOpen, loading: !authChecked, handleCloseModal }
}