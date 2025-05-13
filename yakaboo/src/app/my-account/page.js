"use client";

import Image from "next/image";
import { useProtectedPage } from "../../../hooks";
import { UserLoginModal } from "../../../components/modals/UserLoginModal";
import { Delivery365Container, MainContainer } from "../../../components";
import React from "react";
import { useProfileSettingsModalStore } from "../../../states";
import { ProfileSettingsModal } from "../../../components/modals/ProfileSettingsModal";

export default function MyAccountPage() {
    const { isAuthenticated, loading, handleCloseModal } = useProtectedPage();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore()

    if(loading){
        return <Image src="/icons/spinner.svg" width="20" height="20" alt="" className="animate-spin" />
    }

    if(!isAuthenticated){
        return <UserLoginModal afterClose={ handleCloseModal } />
    }

    return(
        <>
            { isProfileSettingsModalOpen && <ProfileSettingsModal /> }
            <div className="my-account">
                <div className="my-account__main">
                    <h1 className="my-account__page-title">
                        Налаштування
                    </h1>
                    <div className="my-account__flex-container">
                        <MainContainer />
                        <Delivery365Container />
                    </div>
                </div>
            </div>
        </>
    )
}