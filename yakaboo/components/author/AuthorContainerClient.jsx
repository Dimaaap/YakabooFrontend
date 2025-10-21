"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { Breadcrumbs, CardsContainer, Filters } from "../shared";
import { AuthorBooks, AuthorHeader } from ".";
import Endpoints from "../../endpoints";

export const AuthorContainerClient = () => {
    const [author, setAuthor] = useState(null);
    const [authorBooks, setAuthorBooks] = useState(null);
    
      const pathname = usePathname();
      const authorSlug = pathname.split('/')[3];

      const breadcrumbsObject = {
        Автори: '/author/view/all',
      };

      useEffect(() => {
        fetchData(Endpoints.AUTHOR(authorSlug), setAuthor)
      }, [])

       useEffect(() => {
          if (author && author.id) {
            fetchData(Endpoints.AUTHOR_BOOKS(author.id), setAuthorBooks);
          }
        }, [author]);

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