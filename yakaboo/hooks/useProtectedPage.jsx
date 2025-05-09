import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserLoginModalStore } from "../states";
import { useAuth } from ".";

export const useProtectedPage = () => {
    const router = useRouter();
    const isAuthenticated = useAuth();
    
    const { isLoginModalOpen, setIsLoginModalOpen } = useUserLoginModalStore()
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if(isAuthenticated !== undefined){
            setLoading(false);
            if(!isAuthenticated){
                setIsLoginModalOpen(true)
            } else {
                setIsLoginModalOpen(false);
            }
        }
    }, [isAuthenticated, setIsLoginModalOpen])

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
        router.push("/")
    }

    return { isAuthenticated, isLoginModalOpen, loading, handleCloseModal }
}