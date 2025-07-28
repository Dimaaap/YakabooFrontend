"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { fetchData } from '../../../../../services'
import { Breadcrumbs, CardsContainer, Filters } from '../../../../../components';

export default function TranslatorPage() {
    const pathname = usePathname();

    const [translator, setTranslator] = useState(null);
    const [translatorBooks, setTranslatorBooks] = useState([]);

    const translatorSlug = pathname.split("/")[3];
    const translatorId = translator?.id || null;
    
    const breadcrumbsObject = {
        "Перекладачі": "/books-translator/view/all"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/translators/${translatorSlug}`, setTranslator)
    }, [])

    useEffect(() => {
        if(translatorId){
            fetchData(`http://localhost:8006/translators/translator/${translatorId}/books`, setTranslatorBooks)
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