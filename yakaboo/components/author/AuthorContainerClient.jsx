"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import { AuthorHeader } from ".";
import Endpoints from "../../endpoints";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Image from "next/image";
import { useSmallScreen } from "../../hooks";

export const AuthorContainerClient = () => {
      const pathname = usePathname();
      const authorSlug = pathname.split('/')[3];
      const isSmallScreen = useSmallScreen();

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

      if(authorLoaing || authorError) return (
         <div className="spinner">
          <Image src="/icons/spinner.svg" alt="" width="20" height="20" />
        </div>
      )

      return (
          <div className="author">
            <Breadcrumbs linksList={breadcrumbsObject} isSmaller={ true } />
            {author && <AuthorHeader author={author} />}
            <div className="author__flex-container">
              {!isSmallScreen && (
                <Filters needAuthors={ false } />  
              )}
              { author && (
                <CardsContainer source={{ type: "author", id: author?.id}} />  
              ) }
            </div>
          </div>
        );
}