"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../services";
import { Breadcrumbs, Filters } from "../shared";
import { AuthorBooks, AuthorHeader } from ".";

export const AuthorContainerClient = () => {
    const [author, setAuthor] = useState(null);
    
      const pathname = usePathname();
      const authorSlug = pathname.split('/')[3];

      const breadcrumbsObject = {
        Автори: '/author/view/all',
      };

      useEffect(() => {
        fetchData(`http://localhost:8006/authors/${authorSlug}`, setAuthor)
      }, [])

      return (
          <div className="author">
            <Breadcrumbs linksList={breadcrumbsObject} />
            {author && <AuthorHeader author={author} />}
            <div className="author__flex-container">
              <Filters />
              { author && (<AuthorBooks authorId={author.id} />) }
            </div>
          </div>
        );
}