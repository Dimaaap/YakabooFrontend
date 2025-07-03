'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../../../../../components';
import { PublishingHeader } from '../../../../../../components/book_publishers';
import { fetchData } from '../../../../../../services';

export default function BookPublisherPage() {
  const links = {
    Головна: '/',
    Видавництва: '/book_publisher/view/all',
  };

  const pathname = usePathname();
  const publisherTitle = pathname.split('/')[3];

  const [publisher, setPublisher] = useState(null);

  useEffect(() => {
    fetchData(
      `http://127.0.0.1:8004/publishing/${publisherTitle}`,
      setPublisher
    );
  }, []);

  return (
    <div className="publisher">
      <Breadcrumbs linksList={links} />
      {publisher && <PublishingHeader publisher={publisher} />}
    </div>
  );
}
