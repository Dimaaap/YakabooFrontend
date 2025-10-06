'use client';

import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { fetchData } from "../../../../services";
import { BookComponent } from "../../../../components";
import Endpoints from "../../../../endpoints";

export default function BookPage() {
    const [book, setBook] = useState(null);

    const pathname = usePathname();
    const bookSlug = pathname.split('/')[2];

    const breadcrumbsObject = {
        Автор: '/author/view/stiven-king',
    }

    useEffect(() => {
        fetchData(Endpoints.BOOK_BY_SLUG(bookSlug), setBook)    
    }, [])

    return(
        book && (
            <BookComponent book={ book } breadcrumbs={ breadcrumbsObject } />
        )
    )
}