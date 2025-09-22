"use client"

import { useEffect, useState } from "react"
import Endpoints from "../../endpoints"
import { HobbyCategories } from "../hobbies"
import { CardsContainer, Filters } from "../shared"
import { fetchData } from "../../services"

export const NotesClient = () => {
    const [notebooks, setNotebooks] = useState([])
    const [notebookCategories, setNotebookCategories] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_NOTEBOOK_CATEGORIES, setNotebookCategories, "notebook_categories")
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_NOTEBOOKS, setNotebooks)
    }, [])

    return(
        <div className="hobby-container accessories">
            <h2 className="hobby-container__title accessories__title">
                Блокноти
            </h2>
            { notebookCategories && <HobbyCategories fetchCategories={ notebookCategories } isNotebooks={ true } /> }
    
            <div className="hobby-container__main-content">
                <Filters needPublishers={ true } needLanguages={ false } needBookTypes={ false } needAuthors={ false }
                needAge={ false } needCategories={ false } needBrands={ false } needAccessoriesBrands={ false } />
    
                { notebooks.length > 0 && <CardsContainer booksList={ notebooks } isNotebooks={ true } /> }
            </div>
        </div>
        )
}