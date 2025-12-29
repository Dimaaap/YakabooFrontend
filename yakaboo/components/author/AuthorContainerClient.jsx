"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import { AuthorHeader } from ".";
import Endpoints from "../../endpoints";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Image from "next/image";

export const AuthorContainerClient = () => {
      const pathname = usePathname();
      const authorSlug = pathname.split('/')[3];

      const STALE_TIME = 1000 * 60 * 5;

      const breadcrumbsObject = {
        Автори: '/author/view/all',
      };

      const {data: author, isLoading: authorLoaing, error: authorError} = useQuery({
        queryKey: ["author", authorSlug],
        queryFn: () => fetcher(Endpoints.AUTHOR(authorSlug)),
        enabled: !!authorSlug,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false
      })

      const { data: authorBooks, isLoading: booksLoading, error: booksError } = useQuery({
        queryKey: ['authorBooks', author?.id],
        queryFn: () => fetcher(Endpoints.AUTHOR_BOOKS(author.id)),
        enabled: !!author?.id,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false
      })

      if(authorLoaing || booksLoading) return (
         <div className="spinner">
          <Image src="/icons/spinner.svg" alt="" width="20" height="20" />
        </div>
      )

      return (
          <div className="author">
            <Breadcrumbs linksList={breadcrumbsObject} />
            {author && <AuthorHeader author={author} />}
            <div className="author__flex-container">
              <Filters />
              { authorBooks && (<CardsContainer booksList={ authorBooks } />) }
            </div>
          </div>
        );
}