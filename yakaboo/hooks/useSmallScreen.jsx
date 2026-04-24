"use client";

import { useEffect, useState } from "react";


export const useSmallScreen = (breakpoint = 1441) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= breakpoint);
        }

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)
    }, [breakpoint])

    return isSmallScreen;
}