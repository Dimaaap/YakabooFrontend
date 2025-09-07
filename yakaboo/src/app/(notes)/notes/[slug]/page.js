"use client"

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchData } from "../../../../../services";
import { BookComponent, BookContainer } from "../../../../../components";

export default function NotebookPage() {

    const [notebook, setNotebook] = useState(null);
    const pathname = usePathname();
    const notebookSlug = pathname.split("/")[2]

    const breadcrumbsObject = {
        Блокноти: "/notes"
    }

    useEffect(() => {
        fetchData(`http://localhost:8006/books/notebook/${notebookSlug}`, setNotebook)
    }, [])

    return(
        notebook && (
           <BookComponent book={ notebook } breadcrumbs={ breadcrumbsObject } />
        )
    )
}