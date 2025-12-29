'use client';

import { usePathname } from "next/navigation";
import { BookComponent } from "../../../../components";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../../services/fetch.service";
import Endpoints from "../../../../endpoints";
import Image from "next/image";

export default function BookPage() {
    const pathname = usePathname();
    const bookSlug = pathname.split('/')[2];

    const STALE_TIME = 1000 * 60 * 5;

    const {
        data: book,
        isLoading,
        error
    } = useQuery({
        queryKey: ["book", bookSlug],
        queryFn: () => fetcher(Endpoints.BOOK_BY_SLUG(bookSlug)),
        enabled: !!bookSlug,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
    })

    if(isLoading) return (
        <div className="spinner">
            <Image src="/icons/spinner.svg" alt="" width="20" height="20" />
        </div>
    )
    if(error) return <p>adasd</p>

    const breadcrumbsObject = {
        Автор: `/author/view/${book.authors[0].slug}`,
    }

    return(
        book && (
            <BookComponent book={ book } breadcrumbs={ breadcrumbsObject } />
        )
    )
}