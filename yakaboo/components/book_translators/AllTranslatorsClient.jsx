"use client"

import { useSearchPublisherStore } from "../../states"
import { useDebounce } from "../../hooks/useDebounce"
import { SearchBar } from "../book_publishers"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getTranslators } from "../../services/getTranslators.service"
import { Spinner } from "../shared"
import { STALE_TIME } from "../../site.config"

export const AllTranslatorsClient = () => {
    
    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    const { data: translators = [], isLoading, error } = useQuery({
        queryKey: ["translators", debouncedSearchValue],
        queryFn: () => getTranslators(debouncedSearchValue),
        keepPreviousData: true,
        staleTime: STALE_TIME
    })

    if(isLoading || error) return <Spinner />

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