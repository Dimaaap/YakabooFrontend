"use client";

import { SearchBar } from "../book_publishers"
import { useSearchPublisherStore } from "../../states";
import { useDebounce } from "../../hooks/useDebounce";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../../services/getSeries.service";
import { STALE_TIME } from "../../site.config";
import { Spinner } from "../shared";

export const AllSeriesClient = () => {

    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    const { data: series = [], isLoading, error } = useQuery({
        queryKey: ["series", debouncedSearchValue],
        queryFn: () => getSeries(debouncedSearchValue),
        keepPreviousData: true,
        staleTime: STALE_TIME
    })

    if(isLoading || error) return <Spinner />

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