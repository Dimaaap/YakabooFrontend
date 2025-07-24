"use client"

import {useState, useEffect} from "react"
import { useSearchPublisherStore } from "../../../../../states"
import { fetchData, fetchSearchResults } from "../../../../../services/fetch.service"
import { useDebounce } from "../../../../../hooks/useDebounce"
import { DataContainer, SearchBar } from "../../../../../components/book_publishers"
import Endpoints from "../../../../../endpoints"

import Link from "next/link"

export default function AllLiteraturePeriodsPage() {

    const [periods, setPeriods] = useState([]);

    const { searchValue } = useSearchPublisherStore();
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        console.log(debouncedSearchValue);
        if(debouncedSearchValue?.trim()){
            fetchSearchResults(debouncedSearchValue, setPeriods, literaturePeriods=true)
        } else {
            fetchData(Endpoints.ALL_LITERATURE_PERIODS, setPeriods)
        }
    }, [debouncedSearchValue])

    return (
        <div className="authors publishers periods">
            <h2 className="publishers__title periods__title">
                Література по Періодах
            </h2>
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    {periods && (
                        periods.map((period) => (
                            <Link href={`/literature_period/view/${period.slug}`}
                            key={ period.id } className="data__container-link period-link">
                                { period.title }
                                <span className="data__books-count">
                                    
                                </span>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}