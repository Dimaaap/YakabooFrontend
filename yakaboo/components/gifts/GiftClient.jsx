"use client";

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { BookComponent } from "../books";

export const GiftClient = () => {
    const pathname = usePathname()
    const giftSlug = pathname.split("/")[2];

    const [gift, setGift] = useState(null);

    const breadcrumbsObject = {
        Подарунки: "/gifts"
    }
    
    useEffect(() => {
        fetchData(`http://localhost:8006/gifts/by-slug/${giftSlug}`, setGift)
    }, [])

    return (
        gift && (
            <BookComponent book={ gift } breadcrumbs={ breadcrumbsObject } isGift={ true } />
        )
    )
}