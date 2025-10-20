"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { fetchData } from "../../services";
import Endpoints from "../../endpoints";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";

export const BookIllustratorClient = () => {
    const [illustrator, setIllustrator] = useState(null);
    const [illustratorBooks, setIllustratorBooks] = useState([])

    const pathname = usePathname();
    const illustratorSlug = pathname.split("/")[3];
    const illustratorId = illustrator?.id || null; 

    const breadcrumbsObject ={ 
        "Ілюстратори": "/book-illustrators/view/all"
    }

    useEffect(() => {
        fetchData(Endpoints.ILLUSTRATOR(illustratorSlug), setIllustrator)
    }, [])

    useEffect(() => {
        if(illustratorId){
            fetchData(Endpoints.ILLUSTRATOR_BOOK(illustratorId), setIllustratorBooks)
        }
    }, [illustratorId])

    return (
        <div className="translator author">
            <Breadcrumbs linksList={ breadcrumbsObject } />

            { illustrator && (
                <h2 className="seria__title author__title">
                    { illustrator.first_name } { illustrator.last_name }
                </h2>
            ) }

            <div className="translator__flex-container author__flex-container">
                <Filters />
                { illustratorBooks.length > 0 && (<CardsContainer booksList={ illustratorBooks } />) }
            </div>
        </div>
    )

}