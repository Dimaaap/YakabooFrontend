"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { fetchData } from "../../services";
import { BookComponent } from "../books";

export const NoteContainerClient = () => {
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