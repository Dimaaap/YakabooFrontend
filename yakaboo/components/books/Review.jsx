'use client';
import { useState } from "react";
import Image from "next/image";

export const Review = ({ review }) => {
    const MAX_RATE = 5;
    const MAX_COMMENT_LENGTH = 225;
    const isLongText = review.comment.length > MAX_COMMENT_LENGTH;

    const [isExpanded, setIsExpanded] = useState(false);

    const displayedText = isExpanded || !isLongText ? review.comment : review.comment.slice(0, MAX_COMMENT_LENGTH - 1) + "...";

    const date = new Date(review.created_date);

    const formattedDate = new Intl.DateTimeFormat("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date)

    return(
        <div className="book-container__review review">
            <div className="review__header">
                <div className="review__info-date">
                    <p className="review__author">
                        { review.user_name }
                    </p>
                    <span className="review__date">
                        { formattedDate }
                    </span>
                </div>
                <div className="review__rate">
                    {[...Array(MAX_RATE)].map((_, index) => (
                        <Image key={ index } src={index < review.rate ? "/icons/star.svg" : "/icons/star-inactive.svg"}
                         alt="" width="12" height="12" />
                    ))}
                </div>
            </div>
            <div className="review__text-container">
                <p className="review__title">
                    { review.title }
                </p>
                <p className="review__text">
                    { displayedText }
                </p>
            </div>
                
            <div className="review__footer">
                { isLongText && (
                    <button className="review__read-more-btn"
                    onClick={() => setIsExpanded(prev => !prev)}
                    type="button">
                        { isExpanded ? "Сховати": "Читати повністю" }
                    </button>
                ) }
                <div className="review__like-buttons">
                    <button className="review__like review__likes">
                        <Image src="/icons/like.svg" alt="" width="12" height="12" />
                        1
                    </button>
                    <button className="review__like review__dislikes">
                        <Image src="/icons/dislike.svg" alt="" width="12" height="12" />
                        0
                    </button>
                </div>
            </div>
        </div>
    )
}