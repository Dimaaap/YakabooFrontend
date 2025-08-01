"use client"

import { useState, useEffect } from "react"

import { useDebounce } from "../../../../../hooks/useDebounce";
import { useSearchPublisherStore } from "../../../../../states";
import { SearchBar } from "../../../../../components/book_publishers";
import Link from "next/link";
import Endpoints from "../../../../../endpoints";

export default function AllTranslatorsPage() {
    const [translators, setTranslators] = useState([])

    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

   useEffect(() => {
    const fetchTranslators = async () => {
        const fetchUrl = debouncedSearchValue?.trim()
            ? `http://localhost:8006/translators/search/?query=${debouncedSearchValue}`
            : Endpoints.ALL_TRANSLATORS;

        try {
            const res = await fetch(fetchUrl);
            const data = await res.json();
            setTranslators(data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchTranslators();
    }, [debouncedSearchValue]);


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