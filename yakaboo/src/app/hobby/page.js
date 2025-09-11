'use client'

import { Filters, HobbiesContainer, HobbyCategories } from "../../../components";
import { useEffect, useState } from "react";
import { fetchData } from "../../../services";
import Endpoints from "../../../endpoints";

export default function HobbyPage() {
    const [hobbies, setHobbies] = useState([])

    useEffect(() => {
        fetchData(Endpoints.ALL_HOBBIES, setHobbies)
    }, [])

    return (
        <div className="hobby-container">
            <HobbyCategories />

            <div className="hobby-container__main-content">
                <Filters needPublishers={ false } needLanguages={ false } needBookTypes = { false } needAuthors = { false } 
                needCategories = { false } needBrands={ true } />
                { hobbies?.length > 0 && <HobbiesContainer hobbiesList={ hobbies } /> }
            </div>
        </div>
    )
}