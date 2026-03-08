import Image from "next/image";

export const Rate = ({ onClick, reviews }) => {

    const avgRate = reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length;
    const MAX_STARS = 5;
    const activeStars = Math.round(avgRate || 0)

    return(
        <div className="book-container__reviews-block">
            <div className="book-container__grades" onClick={ onClick }>
                {[...Array(MAX_STARS)].map((_, index) => (
                    <Image
                    src={index + 1 <= activeStars ? "/icons/active-star.svg" : "/icons/star-inactive.svg"} 
                    alt="" width="10" key={ index }
                    height="10" />
                ))} 
                <span className="book-container__grade-count">
                    { Math.round(activeStars) }
                </span>
            </div>
            
            { reviews.length && (
                <div className="book-container__comments">
                    <Image src="/icons/comments.svg" alt="Comments count" width="16" height="16" />
                    <span className="book-container__comments-count">
                        { reviews.length }
                    </span>
                </div>    
            ) }
        </div>   
    )
}