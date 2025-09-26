import { BookContainer } from ".";

export const BookComponent = ({ book, breadcrumbs, isGift=false }) => {
    return (
        <div className="book">
            { console.log(book) }
            <BookContainer book={ book } breadcrumbLinks={ breadcrumbs } isGift={ isGift } />
        </div>
    )
}