"use client";

import { usePathname } from "next/navigation";
import { GameContainer } from "../../../../../components";


export default function BoardGamePage() {

    const pathname = usePathname();
    const parts = pathname.split("/");
    const lastPart = parts.pop() || "/";

    return (
        <div>
            <GameContainer />
        </div>
    )
}