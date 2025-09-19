import Image from "next/image";

export const Rate = ({ rate }) => {

    const MAX_STARS = 5;
    const activeStars = Math.round(rate || 0)

    return(
        <div className="book-container__grades">
            {[...Array(MAX_STARS)].map((_, index) => (
                <Image
                src={index + 1 <= activeStars ? "/icons/active-star.svg" : "/icons/star-inactive.svg"} 
                alt="" width="12" key={ index }
                height="12" />
            ))} 
            <span className="book-container__grade-count">
                { Math.round(rate) }
            </span>
        </div>        
    )
   
}