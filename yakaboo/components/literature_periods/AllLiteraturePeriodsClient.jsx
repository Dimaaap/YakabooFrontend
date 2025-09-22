"use client"

import { useEffect, useState } from "react";
import { useSearchPublisherStore } from "../../states";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchData, fetchSearchResults } from "../../services/fetch.service";
import Endpoints from "../../endpoints";
import { SearchBar } from "../book_publishers";
import Link from "next/link";

export const AllLiteraturePeriodsClient = () => {
    const [periods, setPeriods] = useState([]);

    const { searchValue } = useSearchPublisherStore();
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if(debouncedSearchValue?.trim()){
            fetchSearchResults(debouncedSearchValue, setPeriods, false, true)
        } else {
            fetchData(Endpoints.ALL_LITERATURE_PERIODS, setPeriods)
        }
    }, [debouncedSearchValue])

    return(
        <div className="authors publishers periods">
            <h2 className="publishers__title periods__title">
                Література по Періодах
            </h2>
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    {periods && (
                        periods.map((period) => (
                            <Link href={`/literature-periods/view/${period.slug}`}
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