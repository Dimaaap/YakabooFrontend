"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { fetchData } from "../../services";
import { Breadcrumbs, Filters } from "../shared";
import { PublishingBooks, PublishingHeader } from ".";
import Endpoints from "../../endpoints";

export const BookPublisherClient = () => {
    const [publisher, setPublisher] = useState(null);

    const pathname = usePathname();
    const publisherTitle = pathname.split('/')[3];

    const links = {
        Головна: '/',
        Видавництва: '/book_publisher/view/all',
    };

    useEffect(() => {
        fetchData( Endpoints.PUBLISHING_BY_SLUG(publisherTitle), setPublisher)
    }, [])

    return (
        <div className="publisher">
          <Breadcrumbs linksList={links} />
          {publisher && <PublishingHeader publisher={publisher} />}
    
          <div className="publisher-container">
            <Filters withPublishers={false} />
            { publisher && <PublishingBooks publishingId={ publisher.id } /> }
          </div>
        </div>
      );

}