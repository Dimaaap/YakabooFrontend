"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Endpoints from "../../endpoints";
import { STALE_TIME } from "../../site.config";
import { Banner } from "../main";
import { CardsContainer, Filters, Spinner } from "../shared";
import { SeenBooks } from "../shared/SeenBooks";
import { CookiesWorker } from "../../services";
import Link from "next/link";

export const BooksClient = () => {

    const userEmail = CookiesWorker.get("email") || null;

    const { data: banners = [], isLoading: isBannersLoading } = useQuery({
        queryKey: ["books-banners"],
        queryFn: () => fetcher(Endpoints.ALL_BOOKS_BANNERS),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME,
        keepPreviousData: true
    })

    const { data: categories = [], isLoading: isCategoryLoading } = useQuery({
        queryKey: ["book-categories"],
        queryFn: () => fetcher(Endpoints.ALL_BOOK_CATEGORIES),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    const { data: userSeenBooks = [], isLoading: isSeenBooksLoading } = useQuery({
        queryKey: ["user-seen-books", userEmail],
        queryFn: () => fetcher(Endpoints.ALL_USER_SEEN_BOOKS(userEmail)),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    const { data: text = [], isLoading: isTextLoading } = useQuery({
        queryKey: ["text"],
        queryFn: () => fetcher(Endpoints.BOOKS_TEXT),
        staleTime: STALE_TIME,
        gcTime: STALE_TIME
    })

    return (
        <div className="main-container all-books-container">
            
            <div className="all-books-container__banner-wrapper">
                <Banner banners={ banners } bigger={ true } isLoading={ isBannersLoading } />    
            </div>    
            <div className="all-books-container__body">
                <div className="all-books-container__section">
                    <Filters needLanguages={ true } needFilters={ true } needBookTypes={ true } 
                    needAuthors={ true } needPublishers={ true } needCategories={ false } needBookCategories={ true } 
                    bookCategories={ categories } needBookSeria={ true } />

                    <CardsContainer source={{ type: "all" }} categoryTitle="Всі книги" />
                </div>
                { isSeenBooksLoading ? (<Spinner />) : (
                    <SeenBooks books={ userSeenBooks } />    
                ) }
                
                { isTextLoading ? null : <div className="all-books-container__text-content" 
                dangerouslySetInnerHTML={{ __html: text.text }}></div> }
            </div>
        </div>
    )
}
