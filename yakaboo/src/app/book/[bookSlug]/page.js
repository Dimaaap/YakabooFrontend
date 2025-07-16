'use client';

import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { fetchData } from "../../../../services";
import { BookContainer, Breadcrumbs } from "../../../../components";


export default function BookPage() {
    const [book, setBook] = useState(null);

    const pathname = usePathname();
    const bookSlug = pathname.split('/')[2];

    const breadcrumbsObject = {
        Автор: '/author/view/stiven-king',
    }

    useEffect(() => {
        fetchData(`http://localhost:8004/books/${bookSlug}`, setBook)
    }, [])

    return(
        <div className="book">
            { book && <BookContainer book={ book } breadcrumbLinks={breadcrumbsObject} /> }
        </div>
    )
}