'use client';

import { usePathname } from "next/navigation";
import { AuthorHeader, Breadcrumbs } from "../../../../../components";

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
        </div>
    )
}