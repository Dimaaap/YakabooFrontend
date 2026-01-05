"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Endpoints from "../../endpoints";
import { STALE_TIME } from "../../site.config";
import { Banner } from "../main";

export const BooksClient = () => {

    const { data: banners = [] } = useQuery({
        queryKey: ["books-banners"],
        queryFn: () => fetcher(Endpoints.ALL_BOOKS_BANNERS),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    return (
        <div className="main-container all-books-container">
            <div className="all-books-container__banner-wrapper">
                <Banner banners={ banners } bigger={ true } />    
            </div>
        </div>
    )
}
