import Link from "next/link"

export const CharacteristicsRow = ({ title, value, link=null }) => {
    return(
        <div className="book-container__row hobby-page__row">
            <div className="book-container__cell hobby-page__cell cell-title">
                <p>{ title }</p>
            </div>
            <div className="book-container__cell hobby-page__cell">
                { link ? (
                    <Link className="book-container__link hobby-page__link publishing-link" href={ link }>
                        { value }
                    </Link>
                ) : (
                    value  
                ) }
            </div>
        </div>
    )
}