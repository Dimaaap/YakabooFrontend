"use client"

import { useState, useEffect } from "react"
import { useSearchPublisherStore } from "../../states"
import { useDebounce } from "../../hooks/useDebounce"
import Endpoints from "../../endpoints"
import { fetchData } from "../../services"
import { SearchBar } from "../book_publishers"
import Link from "next/link"

export const GiftAllBrandsClient = () => {
    const [brands, setBrands] = useState([])

    const { searchValue } = useSearchPublisherStore();
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchBrands = async() => {
            const fetchUrl = debouncedSearchValue?.trim() ? Endpoints.SEARCH_GIFT_BRAND(debouncedSearchValue): Endpoints.ALL_GIFT_BRANDS;

             try {
                fetchData(fetchUrl, setBrands)
             } catch(err){
                console.error(err);
             }
        }

        fetchBrands();
    }, [debouncedSearchValue])

    return(
        <div className="children-brands authors publishers translators">
            <h3 className="children-brands__title">
                Бренди
            </h3>
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    { brands.length > 0 && (
                        brands.map((brand, index) => (
                            <Link href={`/gifts/brands/view/${brand.slug}`}
                                key={ index } className="data__container-link">
                                    { brand.title }
                                </Link>
                            ))
                    ) }
                </div>
            </div>
        </div>
    )
}