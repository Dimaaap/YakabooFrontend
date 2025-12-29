"use client"

import Link from "next/link"
import Endpoints from "../../endpoints"
import { useDebounce } from "../../hooks/useDebounce"
import { fetchData } from "../../services"
import { useSearchPublisherStore } from "../../states"
import { SearchBar } from "../book_publishers"
import { useEffect, useState } from "react"

export const AllIllustratorsClient = () => {
    const [illustrators, setIllustrators] = useState([])

    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchIllustrators = async() => {
            const fetchUrl = debouncedSearchValue?.trim() ? Endpoints.SEARCH_ILLUSTRATOR(debouncedSearchValue) : Endpoints.ALL_ILLUSTRATORS;

            try {
                fetchData(fetchUrl, setIllustrators)
            } catch(err){
                console.error(err)
            }
        }

        fetchIllustrators()
    }, [debouncedSearchValue])

    return(
        <div className="authors publishers translators">
            <div className="publishers__title translator__title">
                Ілюстратори
            </div>
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    { illustrators.length > 0 && (
                        illustrators.map((illustrator) => (
                            illustrator.is_active ? (
                                <Link href={`/book-illustrators/view/${illustrator.slug}`}
                                key={ illustrator.id } className="data__container-link">
                                    { console.log(illustrator.last_name == '""') }
                                    { illustrator.first_name } { illustrator.last_name == '""' ? null : illustrator.last_name }
                                </Link>
                            ) : (<></>)
                        ))
                    ) }
                </div>
            </div>
        </div>
    )
}