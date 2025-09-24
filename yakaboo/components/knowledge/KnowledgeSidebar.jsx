"use client"

import { useEffect, useState } from "react"
import { fetchData } from "../../services"
import Endpoints from "../../endpoints"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const KnowledgeSidebar = () => {
    const [knowledge, setKnowledge] = useState([])

    const pathname = usePathname();
    const slug = pathname.split("/")[2];

    useEffect(() => {
        fetchData(Endpoints.SIDEBAR_KNOWLEDGE, setKnowledge, "sidebar_knowledge")
    }, [])

    return(
        <div className="knowledge-sidebar">
            { knowledge.length > 0 && (
                <ul className="knowledge-sidebar__items">
                    { knowledge.map((kn, index) => (
                        <li className={`knowledge-sidebar__point ${slug === kn.slug ? "active-link": ""}`} key={ index }>
                            <Link href={ `/base/${kn.slug}` } className="knowledge-sidebar__link">
                                { kn.title }
                            </Link>
                        </li>
                    )) }
                </ul>
            ) }
        </div>
    )
}