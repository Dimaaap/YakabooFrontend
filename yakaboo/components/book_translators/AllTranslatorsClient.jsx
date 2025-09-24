"use client"

import { useEffect, useState } from "react"
import { useSearchPublisherStore } from "../../states"
import { useDebounce } from "../../hooks/useDebounce"
import Endpoints from "../../endpoints"
import { fetchData } from "../../services"
import { SearchBar } from "../book_publishers"
import Link from "next/link"

export const AllTranslatorsClient = () => {
    const [translators, setTranslators] = useState([])
    
    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchTranslators = async() => {
            const fetchUrl = debouncedSearchValue?.trim() ? Endpoints.SEARCH_TRANSLATOR(debouncedSearchValue) : Endpoints.ALL_TRANSLATORS;
            try {
                fetchData(fetchUrl, setTranslators)
            } catch (err) {
                console.error(err)
            }
        }

        fetchTranslators()
    }, [debouncedSearchValue])

    return(
        <div className="authors publishers translators">
            <h2 className="publishers__title translators__title">
                Перекладачі
            </h2>
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    { translators.length > 0 && (
                        translators.map((translator) => (
                            translator.is_active ? (
                                <Link href={`/book-translator/view/${translator.slug}`}
                                key={ translator.id } className="data__container-link">
                                    { translator.first_name } { translator.last_name}
                                </Link>    
                            ) : (<></>)
                        ))
                    ) }
                </div>
            </div>
        </div>
    )
}