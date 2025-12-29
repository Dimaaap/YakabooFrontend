"use client"

import { usePathname } from "next/navigation";
import { Breadcrumbs, Filters } from "../shared";
import { PublishingBooks, PublishingHeader } from ".";
import Endpoints from "../../endpoints";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../services/fetch.service";
import Image from "next/image";

export const BookPublisherClient = () => {

    const pathname = usePathname();
    const publisherTitle = pathname.split('/')[3];

    const STALE_TIME = 1000* 60 * 5;

    const links = {
        Головна: '/',
        Видавництва: '/book_publisher/view/all',
    };

    const { data: publisher, isLoading } = useQuery({
      queryKey: ["publisher", publisherTitle],
      queryFn: () => fetcher(Endpoints.PUBLISHING_BY_SLUG(publisherTitle)),
      enable: !!publisherTitle,
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false
    })

    if(isLoading) return (
      <div className="spinner">
        <Image src="/icons/spinner.svg" alt="" width="20" height="20" />
      </div>
    )

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