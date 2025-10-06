"use client";

import { useEffect, useState } from "react"
import { SearchBar } from "../book_publishers"
import { useSearchPublisherStore } from "../../states";
import { useDebounce } from "../../hooks/useDebounce";
import Endpoints from "../../endpoints";
import { fetchData } from "../../services";
import Link from "next/link";

export const AllSeriesClient = () => {
    const [series, setSeries] = useState([])

    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchSeries = async() => {
            const fetchUrl = debouncedSearchValue?.trim() ? Endpoints.SEARCH_SERIA(debouncedSearchValue) : Endpoints.ALL_SERIES
            try {
                fetchData(fetchUrl, setSeries)
            } catch (err){
                console.error(err)
            }
        }

        fetchSeries()
    }, [debouncedSearchValue])

    return(
        <div className="publishers translators">
            <h2 className="publishers__title translators__title">
                Серії книг
            </h2>
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    { series.length > 0 && (
                        series.map((seria) => (
                            seria.is_active ? (
                                <Link href={`/book/seria/${seria.slug}`}
                                key={seria.id} className="data__container-link">
                                    { seria.title }
                                    <span className="data__container-count">
                                        ({ seria.books_count })
                                    </span>
                                </Link>
                            ) : (<></>)
                        ))
                    ) }
                </div>
            </div>
        </div>
    )
}