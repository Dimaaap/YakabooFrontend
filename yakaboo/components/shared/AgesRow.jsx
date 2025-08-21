import Link from "next/link";
import React from "react"
import { HrefsConfig } from "../../site.config";


export const AgesRow = ({ hobby }) => {
    return(
        <div className="book-container__row hobby-page__row">
            <div className="book-container__cell cell-title hobby-page__cell">
                <p>Вік</p>
            </div>
            <div className="book-container__cell flex-cell hobby-page__cell">
                { hobby?.ages.map((age, index) => (
                    <React.Fragment key={ index }>
                        <Link href={HrefsConfig.agePage(age.slug)}
                        className="book-container__link publishing-link hobby-page__link">
                            { age.age }
                        </Link>
                        { index < hobby.ages.length - 1 && ", " }
                    </React.Fragment>
                )) }
            </div>
        </div>    
    )
    
}