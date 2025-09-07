'use client';

import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { fetchData } from "../../../../services";
import { BookComponent } from "../../../../components";

export default function BookPage() {
    const [book, setBook] = useState(null);

    const pathname = usePathname();
    const bookSlug = pathname.split('/')[2];

    const breadcrumbsObject = {
        Автор: '/author/view/stiven-king',
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/books/${bookSlug}`, setBook)    
    }, [])

    return(
        book && (
            <BookComponent book={ book } breadcrumbs={ breadcrumbsObject } />
        )
    )
}