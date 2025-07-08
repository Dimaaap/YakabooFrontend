'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  AuthorBooks,
  AuthorHeader,
  Breadcrumbs,
  Filters,
} from '../../../../../components';
import { fetchData } from '../../../../../services';

export default function AuthorPage() {
  const [author, setAuthor] = useState(null);

  const pathname = usePathname();
  const authorSlug = pathname.split('/')[3];
  const breadcrumbsObject = {
    Автори: '/author/view/all',
  };

  useEffect(() => {
    fetchData(`http://localhost:8004/authors/${authorSlug}`, setAuthor);
  }, []);

  return (
    <div className="author">
      <Breadcrumbs linksList={breadcrumbsObject} />
      {author && <AuthorHeader author={author} />}
      <div className="author__flex-container">
        <Filters />
        <AuthorBooks />
      </div>
    </div>
  );
}
