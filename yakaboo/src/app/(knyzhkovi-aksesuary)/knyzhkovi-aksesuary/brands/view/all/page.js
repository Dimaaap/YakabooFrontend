"use client"

import { useEffect, useState } from "react"
import Link from 'next/link';

import { useSearchPublisherStore } from "../../../../../../../states"
import { useDebounce } from "../../../../../../../hooks/useDebounce"
import Endpoints from "../../../../../../../endpoints"
import { SearchBar } from "../../../../../../../components/book_publishers"

export default function AllAccessoriesBrandsPage() {
    const [accessoriesBrands, setAccessoriesBrands] = useState([])

    const { searchValue } = useSearchPublisherStore()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        const fetchAccessoriesBrands = async() => {
            const fetchUrl = debouncedSearchValue?.trim()
            ? `http://localhost:8006/accessories-brands/search/?query=${debouncedSearchValue}`
            : Endpoints.ALL_ACCESSORIES_BRANDS;
        
            try {
                const res = await fetch(fetchUrl);
                const data = await res.json();
                setAccessoriesBrands(data)
            } catch(err){
                console.error(err)
            }
        };

        fetchAccessoriesBrands();
    }, [debouncedSearchValue])
    
    return(
        <div className="authors publishers translators">
            <h2 className="publishers__title translators__title">
                Бренди Аксесуарів
            </h2>
            <SearchBar />
            <div className="data">
                { console.log(accessoriesBrands) }
                <div className="data__container">
                    { accessoriesBrands.length > 0 && (
                        accessoriesBrands.map((brand) => (
                            <Link href={`/knyzhkovi-aksesuary/brands/view/${brand.brand.slug}`}
                            key={ brand.brand.id } className="data__container-link">
                                { brand.brand.title }
                                { brand.accessory_count > 0 && (
                                    <span className="data__books-count">
                                        ({ brand.accessory_count })
                                    </span>
                                ) }
                                </Link>
                        ))
                    ) }
                </div>
            </div>
        </div>
    )
}