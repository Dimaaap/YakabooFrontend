"use client";

import { notFound, useSearchParams } from 'next/navigation'
import React from 'react'
import { useSearchTerm } from '../../states';
import Link from 'next/link';
import Image from 'next/image';

export const SearchPageClient = () => {
  
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q');

  const { searchResponse } = useSearchTerm();

  const calculateTotalSearchCount = () => {
    const { authors, books, publishers, series } = searchResponse;

    return authors.length + books.length + publishers.length + series.length
  }

  if (!searchTerm || calculateTotalSearchCount() === 0){
    notFound();
  }

  return (
    
    <div className="search-container">
        { console.log(searchResponse) }
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
                        <div className="authors-container__left">
                            <h5 className="authors-container__title">
                                Автори
                            </h5>
                        </div>

                        <div className="authors-container__right">
                            { searchResponse.authors.map((author, index) => (
                                <Link href={`author/view/${author.slug}`} className="authors-container__author" key={ index }>
                                    { author?.image && (
                                        <Image src={ author.image } alt="" width="20" height="18" className="authors-container__image" />
                                    ) }
                                    
                                    { author.first_name } { author.last_name }
                                </Link>
                            )) }
                        </div>

                    </div>    
                ) }

                { searchResponse.publishers.length > 0 && (
                    <div className="search-container__header-search-res-row authors-container">
                        <div className="authors-container__left">
                            <h5 className="authors-container__title">
                                Видавництва
                            </h5>
                        </div>

                        <div className="authors-container__right">
                            { searchResponse.publishers.map((publisher, index) => (
                                <Link href={`book_publishing/view/${publisher.slug}`} className="authors-container__authors" key={ index }>
                                    { publisher?.logo && (
                                        <Image src={ publisher.logo } alt='' width="16" height="16" className="authors-container__image" />
                                    ) }

                                    { publisher.title }
                                </Link>
                            )) }
                        </div>
                    </div>
                ) }
                
            </div>    
        ) }
        
    </div>
  )
}