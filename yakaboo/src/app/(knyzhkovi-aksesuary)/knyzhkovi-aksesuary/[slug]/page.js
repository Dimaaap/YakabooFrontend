"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react'
import { HobbyContainer } from "../../../../../components/shared/HobbyContainer";
import { fetchData } from "../../../../../services";

export default function AccessoryPage() {
    
    const pathname = usePathname();
    const accessorySlug = pathname.split("/")[2];

    const [accessory, setAccessory] = useState(null);

    const breadcrumbsObject = {
        "Книжкові аксесуари": "/knyzhkovi-aksesuary"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/accessories/by-slug/${ accessorySlug }`, setAccessory)
    }, [])

    return(
        <div className="book hobby">
            { accessory && <HobbyContainer hobby={ accessory } breadcrubmbLink={ breadcrumbsObject } isAccessory={ true } /> }
        </div>
    )
}