"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { KnowledgeSidebar } from ".";

export const KnowledgeContainer = () => {
    const [knowledge, setKnowledge] = useState(null)

    const pathname = usePathname();
    const knowledgeSlug = pathname.split("/")[1];

    useEffect(() => {
        fetchData(`http://localhost:8006/knowledge/slug?slug=${knowledgeSlug}`, setKnowledge)
    }, [])

    return (
        <div className="knowledge">
            { console.log(knowledge) }

            { knowledge && knowledge?.container_title && (
                    <h2 className="knowledge__page-title">
                    { knowledge.container_title }
                </h2>    
            ) }
           
           <div className="knowledge__container">
                <div className="knowledge__section left-section">
                    <KnowledgeSidebar />
                </div>
                <div className="knowledge__section right-section">
                    { knowledge?.content && (
                        <div className="knowledge__content"
                        dangerouslySetInnerHTML={{ __html:knowledge.content }} /> 
                    ) }
                </div>
           </div>
        </div>
    )
}