"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useConfirmationCodeStore, useProfileSettingsModalStore, useUserLoginModalStore } from "../../../../../states"
import Endpoints from "../../../../../endpoints";
import Link from "next/link";
import { fetchData } from "../../../../../services";
import { HobbyCategoryContainer } from "../../../../../components";


export default function AllCategoryHobbies() {
    const { isLoginModalOpen, isRegisterModalOpen } = useUserLoginModalStore();
    const { isConfirmationModalOpen } = useConfirmationCodeStore();
    const { isProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const [category, setCategory] = useState([])

    const pathname = usePathname();
    const categorySlug = pathname.split("/")[3];

    useEffect(() => {
        fetchData(`http://localhost:8006/hobby-categories/hobbies/${categorySlug}`, setCategory)
    }, [])

    return (
        <div className="book hobby">
            <div className="hobby__header">
                <Link href="/hobby" className="hobby__link">
                    Творчість, хобі
                </Link>
                { category && (
                    <h2 className="hobby__title">
                        { category?.title }
                    </h2>    
                ) }
            </div>
            { category && (
                <HobbyCategoryContainer categories={ category.hobbies } />    
            ) }
            
        </div>
    )

}