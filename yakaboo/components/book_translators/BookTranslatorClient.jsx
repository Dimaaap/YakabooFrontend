"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import Endpoints from "../../endpoints";

export const BookTranslatorClient = () => {
    const [translator, setTranslator] = useState(null);
    const [translatorBooks, setTranslatorBooks] = useState([]);
    
    const pathname = usePathname();
    const translatorSlug = pathname.split("/")[3];
    const translatorId = translator?.id || null;

    const breadcrumbsObject = {
        "Перекладачі": "/books-translator/view/all"
    }

    useEffect(() => {
            fetchData(Endpoints.TRANSLATOR(translatorSlug), setTranslator)
        }, [])
    
    useEffect(() => {
        if(translatorId){
            fetchData(Endpoints.TRANSLATOR_BOOKS(translatorId), setTranslatorBooks)
        }
    }, [translatorId])

    return (
        <div className="translator author">
            <Breadcrumbs linksList={breadcrumbsObject} />
    
            { translator && (
                <h2 className="translator__title author__title">
                    { translator.first_name } { translator.last_name }
                </h2>
                )
            }
    
            <div className="translator__flex-container author__flex-container">
                <Filters />
                { translatorBooks.length > 0 && (<CardsContainer booksList={ translatorBooks } />) }
            </div>
        </div>
        )
    
}