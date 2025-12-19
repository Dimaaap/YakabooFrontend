import { Review } from "."

export const ReviewsList = ({ reviews }) => {
    return(
        <div className="book-container__reviews-list">
            { reviews.map((review, index) => (
                <Review review={ review } key={ index } />
            )) }
        </div>
    )
}