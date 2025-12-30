"use client"

import Link from "next/link"
import { useSearchPublisherStore } from "../../states"
import { SearchBar } from "../book_publishers"
import { useQuery } from "@tanstack/react-query"
import { getIllustrators } from "../../services/getIllustrators.service"
import { STALE_TIME } from "../../site.config"
import { Spinner } from "../shared"
import { useDebounce } from "../../hooks/useDebounce"

export const AllIllustratorsClient = () => {

    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    const { data: illustrators = [], isLoading, error } = useQuery({
        queryKey: ["illustrators", debouncedSearchValue],
        queryFn: () => getIllustrators(debouncedSearchValue),
        keepPreviousData: true,
        staleTime: STALE_TIME
    })

    if(isLoading || error) return <Spinner />

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