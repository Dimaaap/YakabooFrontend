"use client"

import { useState, useEffect } from "react";
import { SearchBar } from "../../../../../components/book_publishers";
import Endpoints from "../../../../../endpoints";
import Link from "next/link";
import { useSearchPublisherStore } from "../../../../../states";
import { useDebounce } from "../../../../../hooks/useDebounce";

export default function AllChildrenBrandsPage() {
    const [brands, setBrands] = useState([])

    const { searchValue } = useSearchPublisherStore();
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchBrands = async () => {
            const fetchUrl = debouncedSearchValue?.trim() 
            ? `http://localhost:8006/hobby-brands/search/?query=${debouncedSearchValue}`
            : Endpoints.ALL_HOBBY_BRANDS;

            try {
                const res = await fetch(fetchUrl);
                const data = await res.json();
                setBrands(data)
            } catch(err){
                console.error(err);
            }
        }

        fetchBrands();
    }, [debouncedSearchValue])

    return (
        <div className="children-brands authors publishers translators">
            <h3 className="children-brands__title">
                Бренди
            </h3>    
            <SearchBar />
            <div className="data">
                <div className="data__container">
                    { brands.length > 0 && (
                        brands.map((brand) => (
                            brand.visible ? (
                                <Link href={`/children-brand/view/${brand.slug}`}
                                key={ brand.id } className="data__container-link">
                                    { brand.title }
                                    <span className="data__books-count">(15)</span>
                                </Link>
                            ) : <></>
                        ))
                    ) }
                </div>
            </div>
        </div>
       
    )
}