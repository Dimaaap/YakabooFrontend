"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Endpoints from "../../endpoints";
import { STALE_TIME } from "../../site.config";
import { Banner } from "../main";
import { CardsContainer, Filters, Spinner } from "../shared";

export const BooksClient = () => {

    const { data: banners = [], isBannersLoading } = useQuery({
        queryKey: ["books-banners"],
        queryFn: () => fetcher(Endpoints.ALL_BOOKS_BANNERS),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    const { data: categories = [], isLoading: isCategoryLoading } = useQuery({
        queryKey: ["book-categories"],
        queryFn: () => fetcher(Endpoints.ALL_BOOK_CATEGORIES),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    if(isBannersLoading || isCategoryLoading) return <Spinner />

    return (
        <div className="main-container all-books-container">
            <div className="all-books-container__banner-wrapper">
                <Banner banners={ banners } bigger={ true } />    
            </div>
            <div className="all-books-container__body">
                <div className="all-books-container__section">
                    <Filters needLanguages={ true } needFilters={ true } needBookTypes={ true } 
                    needAuthors={ true } needPublishers={ true } needCategories={ false } needBookCategories={ true } 
                    bookCategories={ categories } needBookSeria={ true } />

                     <CardsContainer source={{ type: "all" }} categoryTitle="Всі книги" />
                </div>
            </div>
        </div>
    )
}
