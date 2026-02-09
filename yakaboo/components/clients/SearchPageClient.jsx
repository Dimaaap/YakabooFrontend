"use client";

import { notFound, useSearchParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { CardsContainer, Filters } from '../shared';
import { useQuery } from '@tanstack/react-query';
import { CookiesWorker } from '../../services';
import Endpoints from '../../endpoints';
import { STALE_TIME } from '../../site.config';
import { fetcher } from '../../services/fetch.service';
import { CardsContainerWithBooksList } from '../shared/CardsContainerWithBooksList';

export const SearchPageClient = () => {
  
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q');

  const emptyResponse = {
    authors: [],
    books: [],
    publishers: [],
    series: [],
  }
  const USER_EMAIL = CookiesWorker.get("email") || ""

  const { data: searchResponse = emptyResponse} = useQuery({
    queryKey: ["search-response", USER_EMAIL, searchTerm],
    queryFn: () => fetcher(Endpoints.SEARCH(searchTerm, USER_EMAIL)),
    enabled: !!USER_EMAIL && !!searchTerm,
    refetchOnMount: false,
    gcTime: STALE_TIME,
    staleTime: STALE_TIME
  })

  const calculateTotalSearchCount = () => {
    try {
        const { authors, books, publishers, series } = searchResponse;

        return authors?.length + books?.length + publishers?.length + series?.length    
    } catch (e) {
        notFound();
    }
   
  }

  if(!searchResponse){
    notFound()
  }

  return (
    
    <div className="search-container">
        { console.log(searchResponse.books) }
        { searchResponse && (
            <div className="search-container__header">
                <div className="search-container__header-first-row">
                    <h3 className="search-container__title">
                        Результати пошуку «{ searchTerm }»
                    </h3>

                    <span className="search-container__search-count">
                        { calculateTotalSearchCount() } результатів
                    </span>
                </div>
                
                { searchResponse.authors.length > 0 && (
                    <div className="search-container__header-search-res-row authors-container">
                        <div className="authors-container__left search-container__left">
                            <h5 className="authors-container__title search-container__res-title">
                                Автори
                            </h5>
                        </div>

                        <div className="authors-container__right search-container__right">
                            { searchResponse.authors.map((author, index) => (
                                <Link href={`author/view/${author.slug}`} className="authors-container__author search-container__author" key={ index }>
                                    { author?.image && (
                                        <Image src={ author.image } alt="" width="20" height="18" className="authors-container__image search-container__image" />
                                    ) }
                                    
                                    { author.first_name } { author.last_name }
                                </Link>
                            )) }
                        </div>

                    </div>    
                ) }

                { searchResponse.publishers.length > 0 && (
                    <div className="search-container__header-search-res-row authors-container">
                        <div className="authors-container__left search-container__left">
                            <h5 className="authors-container__title search-container__author-title">
                                Видавництва
                            </h5>
                        </div>

                        <div className="authors-container__right search-container__right">
                            { searchResponse.publishers.map((publisher, index) => (
                                <Link href={`book_publishing/view/${publisher.slug}`} className="authors-container__authors search-container__authors" key={ index }>
                                    { publisher?.logo && (
                                        <Image src={ publisher.logo } alt='' width="16" height="16" className="authors-container__image search-container__image" />
                                    ) }

                                    { publisher.title }
                                </Link>
                            )) }
                        </div>
                    </div>
                ) }
                
                { searchResponse.series.length > 0 && (
                    <div className="search-container__header-search-res-row authors-container">
                        <div className="authors-container__left search-container__left">
                            <div className="authors-container__title search-container__res-title">
                                Серії книг
                            </div>
                        </div>

                        <div className="authors-container__right search-container__right">
                            { searchResponse.series.map((seria, index) => (
                                <Link href={`book-series/view/${seria.slug}`} className="authors-container__author search-container__author" key={ index }>
                                    { seria.title }
                                </Link>
                            )) }
                        </div>
                    </div>
                ) }
            </div>    
        ) }

        { searchResponse.books.length > 0 && (
            <div className="search-container__books-content">
                <Filters needFilters={ true } needCategories={ true } needBookTypes={ true } needPublishers={ true } needLanguages={ true }
                needAuthors={ true } needPrice={ true } />

                <CardsContainerWithBooksList booksList={ searchResponse.books } categoryTitle="" />
            </div>
        ) }
        
    </div>
  )
}