'use client';

import { usePathname } from "next/navigation";
import { AuthorBooks, AuthorHeader, Breadcrumbs, Filters } from "../../../../../components";

export default function AuthorPage() {

    const pathname = usePathname();
    const authorSlug = pathname.split("/")[3];
    const breadcrumbsObject = {
        Автори: pathname
    }

    return (
        <div className="author">
            <Breadcrumbs linksList={ breadcrumbsObject } />
            <AuthorHeader />
            <div className="author__flex-container">
                <Filters />
                <AuthorBooks />
            </div>
        </div>
    )
}